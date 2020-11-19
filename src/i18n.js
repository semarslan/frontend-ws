import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import React from "react";
import {register} from "timeago.js";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign Up': 'Sign Up',
                'Password mismatch': 'Password mismatch',
                Username: 'Username',
                // error: {
                //     usernameError: 'username must be unique',
                // },
                'Display Name': 'Display name',
                Password: 'Password',
                'Password Repeat': 'Password Repeat',
                Login: 'Login',
                Logout: "Logout",
                Users: "Users",
                Next: "Next >",
                Previous: "< Previous",
                'Load Failure': "Load Failure",
                'User not found' : "User not found",
                Edit: "Edit",
                Save: "Save",
                Cancel: "Cancel",
                'Change Display Name' : "Change Display Name",
                'My Profile': 'My Profile',
                Hoaxify: 'Hoax',
                "There are no hoaxes" : "There are no hoaxes",
                'Load old hoaxes': 'Load old hoaxes'

            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kayıt Ol',
                'Password mismatch': 'Parolayı tekrar girin',
                Username: 'Kullanıcı Adı',
                // error: {
                //     usernameError: 'Kullanıcı adı benzeri var',
                // },
                'Display Name': 'Tercih edilen isim',
                Password: 'Parola',
                'Password Repeat': 'Parolayı tekrarla',
                Login: 'Giriş Yap',
                Logout: 'Çıkış Yap',
                Users: "Kullanıcılar",
                Next: "Sonraki >",
                Previous: "< Önceki",
                'Load Failure' : "Liste Alınamadı",
                'User not found' : "Kullanıcı bulunamadı",
                Edit : 'Düzenle',
                Save: "Kaydet",
                Cancel: "Vazgeç",
                'Change Display Name' : "Tercih Edilen İsmi Değiştir",
                'My Profile' : 'Hesabım',
                Hoaxify: 'Hoax',
                "There are no hoaxes" : "Hoax bulunamadı.",
                'Load old hoaxes' : 'Geçmiş hoaxları getir'
            }
        }
    },
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }
});

const timeageTR = (number, index) => {
    return [
        ['az önce', 'şimdi'],
        ['%s saniye önce', '%s saniye içinde'],
        ['1 dakika önce', '1 dakika içinde'],
        ['%s dakika önce', '%s dakika içinde'],
        ['1 saat önce', '1 saat içinde'],
        ['%s saat önce', '%s saat içinde'],
        ['1 gün önce', '1 gün içinde'],
        ['%s gün önce', '%s gün içinde'],
        ['1 hafta önce', '1 hafta içinde'],
        ['%s hafta önce', '%s hafta içinde'],
        ['1 ay önce', '1 ay içinde'],
        ['%s ay önce', '%s ay içinde'],
        ['1 yıl önce', '1 yıl içinde'],
        ['%s yıl önce', '%s yıl içinde'],
    ][index];
}
register('tr', timeageTR);
export default i18n;