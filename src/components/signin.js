import React, { Component } from "react";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Swal from 'sweetalert2'
import ReCAPTCHA from 'react-google-recaptcha'


export default class Login extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      captcha_value:"",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    localStorage.clear();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password, captcha_value} = this.state;
    //console.log(email, password, captcha_value);
    this.state.captcha_value = window.localStorage.getItem("captcha_value")

    if (this.state.captcha_value) 
   {
    fetch("http://localhost:5000/siteverify", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        "response" : this.state.captcha_value,
      }),
    }).then((res) => res.json())
    .then((data) => {
      //console.log(data);
      //console.log(data.success);
     if(data.success = "true"){
      fetch("http://localhost:5000/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data, "userRegister");
        if (data.status == "ok") {
          Swal.fire({
            title: "Login",
            text: "Successfully Sent OTP to Email!",
            icon: "success"
          })    
          // alert("login successful");
          window.localStorage.setItem("email", email);
          window.location.href = "./auth";
        }
        else if(data.error == "User Not found"){
          Swal.fire({
            title: "Login",
            text: "User Does Not Exists!",
            icon: "error"
          })  
        }
        else{
          Swal.fire({
            title: "Login",
            text: "Password Does not Match !",
            icon: "error"
          })   
        }
        
      });   }
      else{
        Swal.fire({
          title: "Verify the captcha",
          text: "You must verify the captcha before login!",
          icon: "error"
        }) 
     }

    })
    
   }else{
    Swal.fire({
      title: "Verify the captcha",
      text: "You must verify the captcha before login!",
      icon: "error"
    }) 
 }

}
handleChange(value){
  //console.log('captcha value:', value);
  window.localStorage.setItem("captcha_value", value);
};

  render() {
    return (
        <div class="container" >
          <form onSubmit={this.handleSubmit}>
          <div class="container text-center mt-3">
            <div class="row">
              <div className="avatarStyle">
                <LockOutlinedIcon />
              </div>
              <div className="headerStyle">
                <h3>Sign In</h3>
              </div>
            </div>
          </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>

        <div className="g-recaptacha">
      <ReCAPTCHA
        sitekey="6LeBECQjAAAAALzquKxIPmy-O-7aEa5CGLcnxmc3"
        size="normal"
        // hl="tr"
        theme="light"
        onChange={this.handleChange}
      />
    </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </div>

        <div class="text-center mt-2">
        <a href="/forgotpassword">Forgot Password ?</a>
        <p className="forgot-password text-right">
          {/* <a href="/signup">Sign Up ?</a> */}
        </p>
        </div>
      </form>
      </div>
    );
  }
}