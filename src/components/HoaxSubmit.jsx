import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import ProfilePicture from "./ProfilePicture";
import {useTranslation} from "react-i18next";
import {postHoax} from "../api/apiCalls";
import {useApiProgress} from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";

const HoaxSubmit = () => {
    const {image} = useSelector((store) => ({image: store.image}))
    const [focused, setFocused] = useState(false);
    const [hoax, setHoax] = useState('')
    const [errors, setErrors] = useState({});
    const pendingApiCall = useApiProgress('post', '/api/1.0/hoaxes');
    const buttonEnabled = hoax;
    const {t} = useTranslation();

    useEffect(() => {
        if (!focused) {
            setHoax('');
            setErrors({});
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
    }
    let textAreaClass = 'form-control';
    if(errors.content) {
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
                {focused &&
                <div className="text-right m-2">
                    {/*<button className="btn btn-primary" onClick={onClickHoaxify}>Hoaxify</button>*/}
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
                        <span className="material-icons">close</span>
                        {t("Cancel")}
                    </button>
                </div>
                }
            </div>

        </div>
    );
};

export default HoaxSubmit;