import React from 'react'
import axios from 'axios'

class Login extends React.Component {
  state={
    credentials:{
      username:'',
      password:''
    },
    error:''
  }
 

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  login = e =>{
    e.preventDefault();

    axios.post('http://localhost:5000/api/login',this.state.credentials)
    .then(res =>{
      console.log('successful',res.data.payload)
      localStorage.setItem('token',res.data.payload)
      this.props.history.push('/BubblePage')
    })
    .catch(err => {
      console.log(err)      
        this.setState({
          ...this.state.error,
          error: err
        })
      
    })
  } 
  
  
  render(){

    return (
      <div>
        <h1>Welcome to the Bubble App!</h1>
        <div data-testid="loginForm" className="login-form">
          <form className='form-container' onSubmit={this.login}>
            <h2>Login</h2>
            <div className='form-group-inputs'>
              <label> username:
                <input
                data-testid='username'
                type='text'
                name='username'
                value={this.state.credentials.username}
                onChange={this.handleChange}
                />
              </label>

              <label> password:
                <input
                data-testid='password'
                type='password'
                name='password'
                value={this.state.credentials.password}
                onChange={this.handleChange}
                />
              </label>
             
              <button>Log In</button>    
               <p data-testid="errorMessage" className="error">{this.state.error}</p>         
            </div>
          </form>
        </div>  
       
      </div>
    );
  }

  
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.