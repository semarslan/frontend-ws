import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import ProfilePicture from "./ProfilePicture";
import {useTranslation} from "react-i18next";
import {postHoax, postHoaxAttachment} from "../api/apiCalls";
import {useApiProgress} from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";
import Input from "./Input";

const HoaxSubmit = () => {
    const {image} = useSelector((store) => ({image: store.image}))
    const [focused, setFocused] = useState(false);
    const [hoax, setHoax] = useState('');
    const [newImage, setNewImage] = useState();
    const [errors, setErrors] = useState({});
    const pendingApiCall = useApiProgress('post', '/api/1.0/hoaxes');
    const buttonEnabled = hoax;
    const {t} = useTranslation();

    useEffect(() => {
        if (!focused) {
            setHoax('');
            setErrors({});
            setNewImage();
        }
    }, [focused]);

    useEffect(() => {
        setErrors({})
    }, [hoax]);

    const onClickHoaxify = async event => {
        event.preventDefault();
        const body = {
            content: hoax
        }
        try {
            await postHoax(body)
            setFocused(false);
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors)
            }
        }
    };
    const onChangeFile = (event) => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
            uploadFile(file);
        }
        fileReader.readAsDataURL(file);
    };

    const uploadFile = async (file) => {
        const attachment = new FormData();
        attachment.append('file', file);
        await postHoaxAttachment(attachment);
    };

    let textAreaClass = 'form-control';
    if (errors.content) {
        textAreaClass += ' is-invalid';
    }
    return (
        <div className="card p-1 flex-row">
            <ProfilePicture image={image} width={30} height={30} className="rounded-circle m-2"/>
            <div className="flex-fill">
                <textarea
                    className={textAreaClass}
                    rows={focused ? '3' : '1'}
                    onFocus={() => setFocused(true)}
                    onChange={(event) => {
                        setHoax(event.target.value)
                    }}
                    value={hoax}
                />
                <div className="invalid-feedback">
                    {errors.content}
                </div>
                {focused && (
                    <>
                        <Input type="file" onChange={onChangeFile}/>
                        {newImage && <img src={newImage} alt="hoax-attachment" className="img-thumbnail"/>}
                        <div className="text-right m-2">
                            <div className="d-inline-flex">
                                <ButtonWithProgress
                                    onClick={onClickHoaxify}
                                    disabled={!buttonEnabled || pendingApiCall}
                                    pendingApiCall={pendingApiCall}
                                    text={t('Hoaxify')}
                                />
                            </div>
                            <button
                                className="btn btn-light d-inline-flex m-2"
                                onClick={() => setFocused(false)}
                                disabled={!buttonEnabled || pendingApiCall}
                            >
                                <i className="material-icons">close</i>
                                {t("Cancel")}
                            </button>
                        </div>
                    </>
                )}
            </div>

        </div>
    );
};

export default HoaxSubmit;