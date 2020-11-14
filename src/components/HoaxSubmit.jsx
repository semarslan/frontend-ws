import React from 'react';
import {useSelector} from "react-redux";
import ProfilePicture from "./ProfilePicture";


const HoaxSubmit = () => {
    const {image} = useSelector((store) => ({image:store.image}))
    return (
        <div className="card p-1 flex-row">
            <ProfilePicture image={image} width={30} height={30} className="rounded-circle m-2"/>
            <div className="flex-fill">
                <textarea className="form-control" />
                <div className="text-right m-2">
                    <button className="btn btn-primary">Hoaxify</button>
                </div>
            </div>

        </div>
    );
};

export default HoaxSubmit;