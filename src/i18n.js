import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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
                Previous: "< Previous"
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
                Previous: "< Önceki"
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