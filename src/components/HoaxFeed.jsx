import React, {useEffect, useState} from 'react';
import {getHoaxes} from "../api/apiCalls";
import {useTranslation} from "react-i18next";
import HoaxViewa from "./HoaxView";
import HoaxView from "./HoaxView";

const HoaxFeed = () => {
    const [hoaxPage, setHoaxPage] = useState({content:[]});

    const {t} = useTranslation();
    useEffect(() => {
        const loadHoaxes = async () => {
            try {
                const response = await getHoaxes();
                setHoaxPage(response.data)
            }catch (e) {}
        };
        loadHoaxes();
    }, []);
    const {content} = hoaxPage;
    if (hoaxPage.content.length === 0 ) {
        return <div className="alert alert-secondary text-center">{t('There are no hoaxes')}</div>
    }
    return (
        <div>
            {content.map(hoax => {
                return <HoaxView key={hoax.id} hoax={hoax}/>
            })}
        </div>
    );
};

export default HoaxFeed;