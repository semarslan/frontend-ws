import React from 'react';
import axios from 'axios';

class UserSignupPage extends React.Component {

    state = {
        username: null,
        //agreedClicked: false
        displayName: null,
        password: null,
        passwordRepeat: null
    }
    onChange = event => {
        const {name, value} = event.target;
        
       /*  const value = event.target.value;
        const name = event.target.name; */

        this.setState({
            [name]: value
        })
    }
    
    onClickSignup = event => {
        event.preventDefault();

        const {username, displayName, password} = this.state;
        const body = {
            username,
            displayName,
            password
        }
        //değişkenle referans isimlendirmeleri aynı ise bu şekilde key val isimleri aynı ise bu şekilde kullanılabilir.
        axios.post('/api/1.0/users', body)
    }
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
        return (
            <div className="container" >
                <form>
                <h1 className = "text-center">Sign Up</h1>
                <div className="form-group">
                    <label>Username</label>
                    <input className = "form-control"
                        name="username"
                        onChange={this.onChange}
                    />
                </div>
                <br></br>
                <div className="form-group">
                    <label>Display Name</label>
                    <input className="form-control"
                        name="displayName"
                        onChange={this.onChange} />
                </div>
                <br></br>
                <div className="form-group">
                    <label>Password</label>
                    <input className="form-control"
                        name="password"
                        type="password"
                        onChange={this.onChange} />
                </div>
                <br></br>
                <div className="form-group">
                    <label>Password Repeat</label>
                    <input className="form-control"
                        name="passwordRepeat"
                        type="password"
                        onChange={this.onChange} />
                </div>
                <br></br>
                {/* <input type="checkbox" onChange={this.onChangeAgree}/> Agreed
                <br></br> 
                <button disabled={!this.state.agreedClicked}>Sign Up</button> */}

                <div className="text-center">
                <button className="btn btn-primary" onClick={this.onClickSignup}>Sign Up</button>
                </div>
            </form >
            </div>
        );
    }
}

export default UserSignupPage;