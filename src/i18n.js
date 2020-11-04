import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import React from "react";

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
                'Change Display Name' : "Change Display Name"
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
                'Change Display Name' : "Tercih Edilen İsmi Değiştir"
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

export default i18n;