import React from 'react';
import defaultPicture from "../assets/profile.png";

const ProfilePicture = props => {

    const {image, tempImage} = props;

    let imageSource = defaultPicture;
    if (image) {
        imageSource = image;
    }
    return (
        <img
            src={tempImage || imageSource} alt={`Profile`} {...props} />
    );
};
export default ProfilePicture;