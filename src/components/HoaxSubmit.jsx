import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import ProfilePicture from "./ProfilePicture";
import {useTranslation} from "react-i18next";
import {postHoax, postHoaxAttachment} from "../api/apiCalls";
import {useApiProgress} from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";
import Input from "./Input";
import AutoUploadImage from "./AutoUploadImage";

const HoaxSubmit = () => {
    const {image} = useSelector((store) => ({image: store.image}))
    const [focused, setFocused] = useState(false);
    const [hoax, setHoax] = useState('');
    const [newImage, setNewImage] = useState();
    const [errors, setErrors] = useState({});
    const [attachmentId, setAttachmentId] = useState();
    const {t} = useTranslation();

    useEffect(() => {
        if (!focused) {
            setHoax('');
            setErrors({});
            setNewImage();
            setAttachmentId();
        }
    }, [focused]);

    useEffect(() => {
        setErrors({})
    }, [hoax]);

    const pendingApiCall = useApiProgress('post', '/api/1.0/hoaxes', true);
    const pendingFileUpload = useApiProgress('post', '/api/1.0/hoax-attachments', true);

    const onClickHoaxify = async event => {
        event.preventDefault();
        const body = {
            content: hoax,
            attachmentId: attachmentId
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
        const response = await postHoaxAttachment(attachment);
        setAttachmentId(response.data.id);
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
                        {!newImage && <Input type="file" onChange={onChangeFile}/>}
                        {newImage &&
                            <AutoUploadImage image={newImage} uploading={pendingFileUpload}/>
                        }
                        <div className="text-right m-2">
                            <div className="d-inline-flex">
                                <ButtonWithProgress
                                    onClick={onClickHoaxify}
                                    disabled={pendingApiCall}
                                    pendingApiCall={pendingApiCall || pendingFileUpload}
                                    text={t('Hoaxify')}
                                />
                            </div>
                            <button
                                className="btn btn-light d-inline-flex m-2"
                                onClick={() => setFocused(false)}
                                disabled={pendingApiCall|| pendingFileUpload}
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