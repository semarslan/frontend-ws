import React from 'react';
import { useTranslation } from 'react-i18next';
import {changeLanguage} from '../api/apiCalls';

const LanguageSelector = (props) => {
    const {i18n} = useTranslation();
    const onChangeLanguage = language => {
        i18n.changeLanguage(language).then(changeLanguage(language))
    }
    return (
        <div className="container">
        <img
            src="https://www.countryflags.io/tr/flat/24.png"
            alt="Turkish Flag"
            onClick={() => onChangeLanguage('tr')}
            style={{ cursor: 'pointer' }}
        />
        <img 
            src="https://www.countryflags.io/us/flat/24.png"
            alt="USA Flag"
            onClick={() => onChangeLanguage('en')}
            style={{ cursor: 'pointer' }}
        />
    </div>
    );
};

export default LanguageSelector;