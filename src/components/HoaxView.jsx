import React from 'react';
import ProfilePicture from "./ProfilePicture";
import {Link} from "react-router-dom";
import {format} from "timeago.js";
import {useTranslation} from "react-i18next";

const HoaxView = (props) => {
    const {hoax} = props;
    const {user, content, date} = hoax;
    const {username, displayName, image} = user;

    const {i18n} = useTranslation();

    const formatted = format(date, i18n.language);
    return (
        <div className="card p-1 m-2">
            <div className="d-flex">
                <ProfilePicture image={image} width={32} height={32} className="rounded-circle m-1"/>
                <div className="flex-fill m-auto pl-2">
                    <Link to={`/user/${username}`} className="text-dark ">
                        <h6 className="d-inline">{displayName}@{username}</h6>
                    </Link>
                    <span> - </span>
                    {formatted}
                </div>
            </div>
            <div className="pl-5">
                {content}
            </div>
        </div>
    );
};

export default HoaxView;