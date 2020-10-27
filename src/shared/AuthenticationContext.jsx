import React, {Component} from 'react';

export const Authentication = React.createContext();

class AuthenticationContext extends Component {

    state = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    };

    onLoginSuccess = authState => {
        this.setState({
            ...authState,
            /*
                Aynı şey ...authState ile
            username: authState.username,
            displayName: authState.displayName,
            password: authState.password,
            image: authState.image,

            */
            isLoggedIn: true
        })
    }

    onLogoutSuccess = () => {
        this.setState({
            isLoggedIn: false,
            username: undefined
        })
    }

    render() {
        return (
            <Authentication.Provider
                value={{
                    state: {...this.state},
                    onLoginSuccess: this.onLoginSuccess,
                    onLogoutSuccess: this.onLogoutSuccess
                }}>
                {this.props.children} {/*App.js'teki <App/> bu children oluyor.*/}
            </Authentication.Provider>
        );

    }
}

export default AuthenticationContext;