import {applyMiddleware, compose, createStore} from 'redux';
import authReducer from "./authReducer";
import SecureLS from "secure-ls";
import {setAuthorizationHeader} from "../api/apiCalls";
import thunk from "redux-thunk";

const secureLs = new SecureLS();

const getStateFromStorage = () => {
    const hoaxAuth = secureLs.get('hoax-auth');

    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    };

    if (hoaxAuth) {
        return hoaxAuth;
    }
    return stateInLocalStorage;
};
const updateStateInStorage = newState => {
    secureLs.set('hoax-auth', newState);
};

const configureStore = () => {
    const initialState = getStateFromStorage();
    setAuthorizationHeader(initialState);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(authReducer, initialState, composeEnhancers(applyMiddleware(thunk)));
    store.subscribe(() => {
        updateStateInStorage(store.getState());
        setAuthorizationHeader(store.getState());
    })

    return store;
}

export default configureStore;