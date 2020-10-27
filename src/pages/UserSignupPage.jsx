import React from 'react';
import {signup} from '../api/apiCalls'
import Input from '../components/Input';
import {withTranslation} from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import {withApiProgress} from '../shared/ApiProgress';

class UserSignupPage extends React.Component {

    state = {
        username: null,
        //agreedClicked: false
        displayName: null,
        password: null,
        passwordRepeat: null,
        errors: {}
    }
    onChange = event => {
        const {name, value} = event.target;
        const {t} = this.props;
        const errors = {...this.state.errors}
        errors[name] = undefined;
        /*  const value = event.target.value;
         const name = event.target.name; */
        if (name === 'password' || name === 'passwordRepeat') {
            if (name === 'password' && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = t('Password mismatch');
            } else if (name === 'passwordRepeat' && value !== this.state.password) {
                errors.passwordRepeat = t('Password mismatch');
            } else {
                errors.passwordRepeat = undefined;
            }
        }
        this.setState({
            [name]: value,
            errors
        })
    }

    onClickSignup = async event => {
        event.preventDefault();

        const {username, displayName, password} = this.state;
        const body = {
            username,
            displayName,
            password
        };

        //değişkenle referans isimlendirmeleri aynı ise bu şekilde key val isimleri aynı ise bu şekilde kullanılabilir.

        try {
            const response = await signup(body);

        } catch (e) {
            if (e.response.data.validationErrors) {
                this.setState({errors: e.response.data.validationErrors});
            }
        }
        //     signup(body).then((response) => {
        //         this.setState({pendingApiCall: false});
        //     }).catch(error => {
        //     this.setState({pendingApiCall: false});
        // });
    };


    /* onChangeUsername = (event) => {

        // console.log(event.target.value);
        // this.state.username = event.target.value;
        // console.log(this.state);

        this.setState({
            username: event.target.value
        })
    };

    // onChangeAgree = event => {
        //this.state.agreedClicked = event.target.checked;
        //console.log(this.state);
      //  this.setState({
         //   agreedClicked: event.target.checked
       // });
   // }; 

   onChangeDisplayName = (event) => {
        this.setState({
            displayName: event.target.value
        })
    };
    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    };
    onChangePasswordRepeat = (event) => {
        this.setState({
            passwordRepeat: event.target.value
        })
    }; */
    render() {
        const {errors} = this.state;
        const {username, displayName, password, passwordRepeat} = errors;
        const {t, pendingApiCall} = this.props;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('Sign Up')}</h1>
                    <Input name="username" label={t("Username")} error={t(username)} onChange={this.onChange}/>
                    {/* <div className="form-group">
                        <label>Username</label>
                        <input className={username ? 'form-control is-invalid' : 'form-control'}
                            name="username"
                            onChange={this.onChange}
                        />
                        <div className="invalid-feedback">
                            {username}
                        </div>
                    </div> */}
                    <br/>
                    <Input name="displayName" label={t("Display Name")} error={displayName} onChange={this.onChange}/>
                    <br/>
                    <Input name="password" label={t("Password")} error={password} onChange={this.onChange}
                           type="password"/>
                    <br/>
                    <Input
                        name="passwordRepeat"
                        label={t("Password Repeat")}
                        error={passwordRepeat}
                        onChange={this.onChange}
                        type="password"
                    />
                    <br></br>
                    {/* <input type="checkbox" onChange={this.onChangeAgree}/> Agreed
                <br></br> 
                <button disabled={!this.state.agreedClicked}>Sign Up</button> */}

                    <div className="text-center">
                        <ButtonWithProgress
                            onClick={this.onClickSignup}
                            disabled={pendingApiCall || passwordRepeat !== undefined}
                            text={t('Sign Up')}
                            pendingApiCall={pendingApiCall}
                        />
                    </div>
                </form>
            </div>

        );
    }
}

const UserSignupPageWithApiProgress = withApiProgress(UserSignupPage, '/api/1.0/users');

const UserSignupPageWithTranslation = withTranslation()(UserSignupPageWithApiProgress);

export default UserSignupPageWithTranslation;

//ya da ;
//export default withTranslation()(UserSignupPage);