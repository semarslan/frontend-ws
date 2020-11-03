import React, {useEffect, useState} from 'react';
import ProfileCard from "../components/ProfileCard";
import {getUser} from '../api/apiCalls';

const UserPage = (props) => {

    const [user, setUser] = useState();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser(props.match.params.username);
                setUser(response.data)

            } catch (error){

            }
        };
        loadUser();
    }, [])

    return (
        <div className="container">
            <ProfileCard/>
        </div>
    );
};

export default UserPage;