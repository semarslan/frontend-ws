import React, {useState} from 'react';
import ProfileCard from "../components/ProfileCard";
import {getUser} from '../api/apiCalls';

const UserPage = (props) => {
    const [user, setUser] = useState();

    const loadUser = async ()  => {
        await getUser(props.match.params.username);
    }
    return (
        <div className="container">
            <ProfileCard />
        </div>
    );
};

export default UserPage;