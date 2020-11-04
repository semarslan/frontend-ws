import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import ProfilePicture from "./ProfilePicture";

const ProfileCard = props => {
    const {username: loggedInUsername} = useSelector((store) => ({username: store.username}));
    const routeParams = useParams();

    const {user} = props;
    const {username, displayName, image} = user;

    const pathUsername = routeParams.username;

/*    let message = "We cannot edit";
    if (pathUsername === loggedInUsername) {
        message = "We can edit"
    }*/
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
                <h3>
                    {displayName}@{username}
                </h3>
            </div>
        </div>
    );
};
export default ProfileCard;

