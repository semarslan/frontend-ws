import React from 'react';
import UserSignupPage from '../pages/UserSignupPage';
import LoginPage from '../pages/LoginPage';
import LanguageSelector from '../components/LanguageSelector';
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import TopBar from "../components/TopBar";
import {connect} from 'react-redux';
// import {Authentication} from "../shared/AuthenticationContext";


class App extends React.Component {
    // static contextType = Authentication;
    render() {
        const {isLoggedIn} = this.props;
        return (
            <React.StrictMode>
                <div>
                    <Router>
                        <TopBar/>
                        <Switch>
                            <Route exact path="/" component={HomePage}/>
                            {!isLoggedIn && <Route path="/login" component={LoginPage}/>}
                            <Route path="/signup" component={UserSignupPage}/>
                            <Route path="/user/:username" component={UserPage}/>
                            {/*olmayan bir path varsa*/}
                            <Redirect to="/"/>
                        </Switch>
                    </Router>
                    <LanguageSelector/>
                </div>
            </React.StrictMode>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        isLoggedIn: store.isLoggedIn,
    }
};

export default connect(mapStateToProps)(App);
