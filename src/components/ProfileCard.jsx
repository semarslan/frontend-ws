import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import ProfilePicture from "./ProfilePicture";
import {useTranslation} from "react-i18next";
import Input from "./Input";
import {deleteUser, updateUser} from "../api/apiCalls";
import {useApiProgress} from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";
import {logoutSuccess, updateSuccess} from "../redux/authActions";
import Modal from "./Modal";

const ProfileCard = props => {
    const [inEditMode, setInEditMode] = useState(false);
    const [updatedDisplayName, setUpdatedDisplayName] = useState();
    const {username: loggedInUsername} = useSelector((store) => ({username: store.username}));
    const routeParams = useParams();
    const pathUsername = routeParams.username;
    const [user, setUser] = useState({});
    const [newImage, setNewImage] = useState();
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    //ana sayfaya yönlendirmek içinn useHistory hooksunu kullandık.
    const history = useHistory();

    const {userDelete, onDeleteUser} = props;

    const [editable, setEditable] = useState(false);
    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    useEffect(() => {
        setEditable(pathUsername === loggedInUsername);
    }, [pathUsername, loggedInUsername])

    const {username, displayName, image} = user;


    useEffect(() => {
        if (!inEditMode) {
            setUpdatedDisplayName(undefined);
            setNewImage(undefined);
        } else {
            setUpdatedDisplayName(displayName)
        }
    }, [inEditMode, displayName]);

    useEffect(() => {
        setValidationErrors(previousValidationErrors => ({
            ...previousValidationErrors,
            displayName: undefined
        }));
    }, [updatedDisplayName])
    useEffect(() => {
        setValidationErrors(previousValidationErrors => ({
            ...previousValidationErrors,
            image: undefined
        }));
    }, [newImage])
    const onClickSave = async () => {
        let image;
        if (newImage) {
            image = newImage.split(',')[1];
        }
        const body = {
            displayName: updatedDisplayName,
            image: image
        };
        try {
            const response = await updateUser(username, body);
            setInEditMode(false);
            setUser(response.data);
            dispatch(updateSuccess((response.data)));
        } catch (error) {
            if (error.response.data.validationErrors) {
                setValidationErrors(error.response.data.validationErrors);
            }
        }
    }

    const onChangeFile = (event) => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    const onClickDelete = async () => {
        await deleteUser(username);
        // onDeleteUser(username);
        setModalVisible(false);
        //kullanıcı silindikten sonra logout olacak.
        dispatch(logoutSuccess());
        history.push('/');

    };

    const onClickCancel = () => {
        setModalVisible(false);
    }

    const pendingApiCallForUpdate = useApiProgress('put', `/api/1.0/users/${username}`, true);
    const pendingApiCallForDelete = useApiProgress('delete', `/api/1.0/users/${username}`, true);
    const {displayName: displayNameError, image: imageError} = validationErrors;
    const {t} = useTranslation();

    const ownedByLoggedInUser = loggedInUsername === username;
    return (
        <div className="card text-center">
            <div className="card-header">
                <ProfilePicture
                    className="rounded-circle shadow"
                    image={image}
                    tempimage={newImage}
                    height={200} width={200}
                    alt={`${username} profile`}
                />
            </div>
            <div className="card-body ">
                {!inEditMode && (
                    <>
                        <h3>
                            {displayName}@{username}
                        </h3>
                        {editable && (
                            <>
                                <button className="btn btn-success d-inline-flex" onClick={() => setInEditMode(true)}>
                                    <span className="material-icons">edit</span>
                                    {t('Edit')}
                                </button>
                                <div className="pt-2">
                                    {ownedByLoggedInUser && (
                                        <button className="btn btn-danger d-inline-flex"
                                                onClick={() => setModalVisible(true)}>
                                            <span
                                                className="material-icons">directions_run</span> {t('Delete my account')}
                                        </button>)}
                                </div>
                            </>
                        )}
                    </>
                )}
                {inEditMode && (
                    <div>
                        <Input label={t("Change Display Name")}
                               defaultValue={displayName}
                               error={t(displayNameError)}
                               onChange={(event) => {
                                   setUpdatedDisplayName(event.target.value)
                               }}
                        />
                        <Input type="file" onChange={onChangeFile} error={imageError}/>
                        <div>
                            <ButtonWithProgress
                                className="btn btn-outline-info d-inline-flex m-2"
                                onClick={onClickSave}
                                disabled={pendingApiCallForUpdate}
                                pendingApiCall={pendingApiCallForUpdate}
                                text={
                                    <>
                                        <span className="material-icons">save</span>
                                        {t("Save")}
                                    </>
                                }
                            />
                            <button
                                className="btn btn-light d-inline-flex m-2"
                                onClick={() => setInEditMode(false)}
                                disabled={pendingApiCallForUpdate}
                            >
                                <span className="material-icons">close</span>
                                {t("Cancel")}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Modal
                title={t('Delete my account')}
                visible={modalVisible}
                onClickCancel={onClickCancel}
                onClickOk={onClickDelete}
                buttonMessage={t('Delete my account')}
                message={
                    <div>
                        <div><strong>{t('Are you sure to delete your account?')}</strong></div>
                    </div>
                }
                pendingApiCall={pendingApiCallForDelete}
            />
        </div>
    );
};
export default ProfileCard;

