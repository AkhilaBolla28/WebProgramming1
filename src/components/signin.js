import React, { Component } from "react";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Swal from 'sweetalert2'


export default class Login extends Component  {


  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
   
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
        console.log(data, "userRegister");
        if (data.status == "ok") {
          Swal.fire({
            title: "Login",
            text: "Successfully Sent OTP to Email!",
            icon: "success"
          })    
          // alert("login successful");
          window.localStorage.setItem("email", email);
          window.location.href = "./auth";
        }else if(data.error == "User Not found"){
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
        
      });

}
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