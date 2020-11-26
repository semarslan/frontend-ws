import React from 'react';
import {useTranslation} from "react-i18next";
import ButtonWithProgress from "./ButtonWithProgress";

const Modal = (props) => {
    const {visible, onClickCancel, message, onClickOk, pendingApiCall} = props;

    const {t} = useTranslation();
    let className = "modal fade";
    if (visible) {
        className += ' show d-block';
    }
    return (
        <div className={className} style={{backgroundColor: '#000000b0'}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{t('Delete Hoax')}</h5>
                    </div>
                    <div className="modal-body">
                        {message}
                    </div>
                    <div className="modal-footer">
                        <ButtonWithProgress
                            className="btn btn-danger"
                            onClick={onClickOk}
                            pendingApiCall={pendingApiCall}
                            text={t('Delete Hoax')}
                            disabled={pendingApiCall}
                        />
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClickCancel}
                            disabled={pendingApiCall}
                        >
                            {t('Cancel')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;