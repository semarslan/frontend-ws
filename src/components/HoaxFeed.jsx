import React, {useEffect, useState} from 'react';
import {getHoaxes, getOldHoaxes} from "../api/apiCalls";
import {useTranslation} from "react-i18next";
import HoaxView from "./HoaxView";
import {useApiProgress} from "../shared/ApiProgress";
import Spinner from "./Spinner";
import {useParams} from "react-router-dom";

const HoaxFeed = () => {
    const [hoaxPage, setHoaxPage] = useState({content:[], last: true, number: 0});
    const {t} = useTranslation();
    const {username} = useParams();

    const path = username ? `/api/1.0/users/${username}/hoaxes?page=` : '/api/1.0/hoaxes?page='

    const initialHoaxLoadProgress = useApiProgress('get', path);

    let lastHoaxId = 0;
    if(hoaxPage.content.length >0) {
        const lastHoaxIndex = hoaxPage.content.length -1;
        lastHoaxId = hoaxPage.content[lastHoaxIndex].id;
    }

    const oldHoaxPath = username ? `/api/1.0/users/${username}/hoaxes/${lastHoaxId}` : `/api/1.0/hoaxes/${lastHoaxId}`

    const loadOldHoaxesProgress = useApiProgress('get', oldHoaxPath , true);

    useEffect(() => {
        const loadHoaxes = async (page) => {
            try {
                const response = await getHoaxes(username, page);
                //devamına ekleme kısmı burası.
                setHoaxPage(previousHoaxPage => ({
                    ...response.data,
                    content: [...previousHoaxPage.content, ...response.data.content]
                }))
            } catch (e) {}
        };
        loadHoaxes();
    }, [username]);

    const loadOldHoaxes = async () => {
        const response = await getOldHoaxes(lastHoaxId, username)
        setHoaxPage(previousHoaxPage => ({
            ...response.data,
            content: [...previousHoaxPage.content, ...response.data.content]
        }))
    }
    const {content, last} = hoaxPage;
    if (hoaxPage.content.length === 0 ) {
        return <div className="alert alert-secondary text-center">{initialHoaxLoadProgress ? <Spinner/> : t('There are no hoaxes')}</div>
    }
    return (
        <div>
            {content.map(hoax => {
                return <HoaxView key={hoax.id} hoax={hoax}/>
            })}
            {!last &&
            <div
                className="alert alert-secondary text-center"
                style={{cursor: loadOldHoaxesProgress ? 'not-allowed' : 'pointer'}}
                onClick={loadOldHoaxesProgress ? () => {} : () => loadOldHoaxes()}>
                {loadOldHoaxesProgress ? <Spinner/> : t('...')}
            </div>}
        </div>
    );
};

export default HoaxFeed;