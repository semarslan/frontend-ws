import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import ProfilePicture from "./ProfilePicture";
import {useTranslation} from "react-i18next";
import Input from "./Input";

const ProfileCard = props => {
    const [inEditMode, setInEditMode] = useState(false);
    const {username: loggedInUsername} = useSelector((store) => ({username: store.username}));
    const routeParams = useParams();

    const {user} = props;
    const {username, displayName, image} = user;

    const pathUsername = routeParams.username;

    const {t} = useTranslation();

    return (
        <div className="card text-center">
            <div className="card-header">
                <ProfilePicture
                    className="rounded-circle shadow"
                    image={image}
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
                        <button className="btn btn-success d-inline-flex" onClick={() => setInEditMode(true)}>
                            <span className="material-icons">edit</span>
                            {t('Edit')}
                        </button>
                    </>
                )}
                {inEditMode && (
                    <div>
                        <Input label={t("Change Display Name")} />
                        <div>
                            <button className="btn btn-outline-info d-inline-flex m-2">
                                <span className="material-icons">save</span>
                                {t("Save")}
                            </button>
                            <button className="btn btn-light d-inline-flex m-2" onClick={() => setInEditMode(false)}>
                                <span className="material-icons">close</span>
                                {t("Cancel")}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ProfileCard;

