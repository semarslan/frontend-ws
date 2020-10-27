import {createStore} from 'redux';
import authReducer from "./authReducer";

const loggedInState = {
    isLoggedIn: true,
    username: "user1",
    displayName: "display1",
    image: null,
    password: "P4ssword"
};

const configureStore = () => {

    const hoaxAuth = localStorage.getItem('hoax-auth');

    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    };

    if (hoaxAuth) {
        try {
            stateInLocalStorage = JSON.parse(hoaxAuth)
        }catch (e) {}
    }
    const store = createStore(authReducer, stateInLocalStorage,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    store.subscribe(() => {
        localStorage.setItem('hoax-auth', JSON.stringify(store.getState()))
    } )
    return store;
}

export default configureStore;