import React from 'react';
import ProfilePicture from "./ProfilePicture";
import {Link} from "react-router-dom";
import {format} from "timeago.js";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {deleteHoax} from "../api/apiCalls";

const HoaxView = (props) => {
    const loggedInUser = useSelector(store => store.username);
    const {hoax, onDeleteHoax} = props;
    const {user, content, date, fileAttachmentVM, id} = hoax;
    const {username, displayName, image} = user;

    const {i18n} = useTranslation();


/*    apiCall metodu old içinn async await oluşturuluyor.*/
    const onClickDelete = async () => {
        await deleteHoax(id);
        onDeleteHoax(id);
    }

    const formatted = format(date, i18n.language);

    /*login olan user ile (loggedInUser) hoax username'i(username) aynı ise silme butonu görünmesi için'*/
    const ownedByLoggedInUser = loggedInUser === username;

    return (
        <div className="card p-1 m-2">
            <div className="d-flex">
                <ProfilePicture image={image} width={32} height={32} className="rounded-circle m-1"/>
                <div className="flex-fill m-auto pl-2">
                    <Link to={`/user/${username}`} className="text-dark ">
                        <h6 className="d-inline">{displayName}@{username}</h6>
                        <span> - </span>
                        <span>{formatted}</span>
                    </Link>
                </div>
                {ownedByLoggedInUser && (<button className="btn btn-delete-link btn-sm" onClick={onClickDelete}>
                    <span className="material-icons">delete_outline</span>
                </button>)}
            </div>
            <div className="pl-5">
                {content}
            </div>
            {fileAttachmentVM && (
                <div className="pl-5">
                    {fileAttachmentVM.fileType.startsWith('image') && (
                        <img className="img-fluid" src={'images/attachments/' + fileAttachmentVM.name} alt={content}/>
                    )}
                    {!fileAttachmentVM.fileType.startsWith('image') && (
                        <strong>Hoax has unknown attachment</strong>
                    )}
                </div>
            )}
        </div>
    );
};

export default HoaxView;