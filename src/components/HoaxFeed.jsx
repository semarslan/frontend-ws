import React, {useEffect, useState} from 'react';
import {getHoaxes} from "../api/apiCalls";
import {useTranslation} from "react-i18next";
import HoaxViewa from "./HoaxView";
import HoaxView from "./HoaxView";
import {useApiProgress} from "../shared/ApiProgress";
import Spinner from "./Spinner";

const HoaxFeed = () => {
    const [hoaxPage, setHoaxPage] = useState({content:[], last: true, number: 0});
    const {t} = useTranslation();

    const pendingApiCall = useApiProgress('get', '/api/1.0/hoaxes');

    useEffect(() => {
        loadHoaxes();
    }, []);
    const loadHoaxes = async (page) => {
        try {
            const response = await getHoaxes(page);
            //devamına ekleme kısmı burası.
            setHoaxPage(previousHoaxPage => ({
                ...response.data,
                content: [...previousHoaxPage.content, ...response.data.content]
            }))
        }catch (e) {}
    };
    const {content, last, number} = hoaxPage;
    if (hoaxPage.content.length === 0 ) {
        return <div className="alert alert-secondary text-center">{pendingApiCall ? <Spinner/> : t('There are no hoaxes')}</div>
    }
    return (
        <div>
            {content.map(hoax => {
                return <HoaxView key={hoax.id} hoax={hoax}/>
            })}
            {!last &&
            <div
                className="alert alert-secondary text-center"
                style={{cursor: pendingApiCall ? 'not-allowed' : 'pointer'}}
                onClick={pendingApiCall ? () => {} : () => loadHoaxes(number+1)}>
                {pendingApiCall ? <Spinner/> : t('...')}
            </div>}
        </div>
    );
};

export default HoaxFeed;