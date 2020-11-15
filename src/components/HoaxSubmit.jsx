import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import ProfilePicture from "./ProfilePicture";
import {useTranslation} from "react-i18next";
import {postHoax} from "../api/apiCalls";

const HoaxSubmit = () => {
    const {image} = useSelector((store) => ({image: store.image}))
    const [focused, setFocused] = useState(false);
    const [hoax, setHoax] = useState('')
    const [errors, setErrors] = useState({});
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

    const onClickHoaxify = async () => {
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
                    <button className="btn btn-primary" onClick={onClickHoaxify}>Hoaxify</button>
                    <button
                        className="btn btn-light d-inline-flex m-2"
                        onClick={() => setFocused(false)}
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