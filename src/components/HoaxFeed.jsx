import React, {useEffect, useState} from 'react';
import {getHoaxes, getNewHoaxCount, getNewHoaxes, getOldHoaxes} from "../api/apiCalls";
import {useTranslation} from "react-i18next";
import HoaxView from "./HoaxView";
import {useApiProgress} from "../shared/ApiProgress";
import Spinner from "./Spinner";
import {useParams} from "react-router-dom";

const HoaxFeed = () => {
    const [hoaxPage, setHoaxPage] = useState({content: [], last: true, number: 0});
    const [newHoaxCount, setNewHoaxCount] = useState(0);
    const {t} = useTranslation();
    const {username} = useParams();

    const path = username ? `/api/1.0/users/${username}/hoaxes?page=` : '/api/1.0/hoaxes?page='

    const initialHoaxLoadProgress = useApiProgress('get', path);

    let lastHoaxId = 0;
    let firstHoaxId = 0;
    if (hoaxPage.content.length > 0) {
        firstHoaxId = hoaxPage.content[0].id;

        const lastHoaxIndex = hoaxPage.content.length - 1;
        lastHoaxId = hoaxPage.content[lastHoaxIndex].id;
    }

    const oldHoaxPath = username ? `/api/1.0/users/${username}/hoaxes/${lastHoaxId}` : `/api/1.0/hoaxes/${lastHoaxId}`
    const loadOldHoaxesProgress = useApiProgress('get', oldHoaxPath, true);

    const newHoaxPath = username ? `/api/1.0/users/${username}/hoaxes/${firstHoaxId}?direction=after`
        : `/api/1.0/hoaxes/${firstHoaxId}?direction=after`
    const loadNewHoaxesProgress = useApiProgress('get', newHoaxPath, true);

    useEffect(() => {
        const getCount = async () => {
            const response = await getNewHoaxCount(firstHoaxId, username);
            setNewHoaxCount(response.data.count);
        };
        let looper = setInterval(() => {
            getCount();
        }, 5000);
        return function cleanup() {
            clearInterval(looper);
        }
    }, [firstHoaxId, username]);

    useEffect(() => {
        const loadHoaxes = async (page) => {
            try {
                const response = await getHoaxes(username, page);
                //devamına ekleme kısmı burası.
                setHoaxPage(previousHoaxPage => ({
                    ...response.data,
                    content: [...previousHoaxPage.content, ...response.data.content]
                }))
            } catch (e) {
            }
        };
        loadHoaxes();
    }, [username]);

    const loadOldHoaxes = async () => {
        const response = await getOldHoaxes(lastHoaxId, username)
        setHoaxPage(previousHoaxPage => ({
            ...response.data,
            content: [...previousHoaxPage.content, ...response.data.content]
        }));
    }

    const loadNewHoaxes = async () => {
        const response = await getNewHoaxes(firstHoaxId, username)
        setHoaxPage(previousHoaxPage => ({
            ...previousHoaxPage,
            content: [...response.data, ...previousHoaxPage.content]
            //Load edilen ksıım ...response.data,
            //Var olan kısım ...previousHoaxPage.content
        }));
        setNewHoaxCount(0);
    }

    const onDeleteHoaxSuccess = (id) => {
        //state'i günceller.
        setHoaxPage(previousHoaxPage => ({
            ...previousHoaxPage,
            // parametredeki id'nin olmadığı bir liste haline getiriyoruz. filtreliyoruz
            content: previousHoaxPage.content.filter((hoax) => {
                if (hoax.id !== id ) {
                    return true;
                }
                return false;
            })
        }));
    }
    const {content, last} = hoaxPage;
    if (hoaxPage.content.length === 0) {
        return <div className="alert alert-secondary text-center">
            {initialHoaxLoadProgress ? <Spinner/> : t('There are no hoaxes')}
        </div>
    }

    return (
        <div>
            {newHoaxCount > 0 && (
                <div className="alert alert-secondary text-center"
                     style={{cursor: loadNewHoaxesProgress ? 'not-allowed' : 'pointer'}}
                     onClick={loadNewHoaxesProgress ? () => {} : loadNewHoaxes}
                >
                    {loadNewHoaxesProgress ? <Spinner/> : t('There are new hoaxes')}
                </div>
            )}
            {content.map(hoax => {
                return <HoaxView key={hoax.id} hoax={hoax} onDeleteHoax={onDeleteHoaxSuccess}/>
            })}
            {!last &&
            <div
                className="alert alert-secondary text-center mb-1"
                style={{cursor: loadOldHoaxesProgress ? 'not-allowed' : 'pointer'}}
                onClick={loadOldHoaxesProgress ? () => {
                } : () => loadOldHoaxes()}
            >
                {loadOldHoaxesProgress ? <Spinner/> : t('...')}
            </div>}
        </div>
    );
};

export default HoaxFeed;