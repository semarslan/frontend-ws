import React from 'react';
import ProfilePicture from "./ProfilePicture";
import {Link} from "react-router-dom";

const HoaxView = (props) => {
    const {hoax} = props;
    const {user, content} = hoax;
    const {username, displayName, image} = user;
    return (
        <div className="card p-1 m-2">
            <div className="d-flex">
                <ProfilePicture image={image} width={32} height={32} className="rounded-circle m-1"/>
                <div className="flex-fill m-auto pl-2">
                    <Link to={`/user/${username}`} className="text-dark ">
                        <h6>{displayName}@{username}</h6>
                    </Link>
                </div>
            </div>
            <div className="pl-5">
                {hoax.content}
            </div>
        </div>
    );
};

export default HoaxView;