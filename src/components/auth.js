import React, { Component } from "react";
import Swal from 'sweetalert2'

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email,otp } = this.state;
    fetch("http://localhost:5000/login-otp", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email : localStorage.getItem("email"),
        otp,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
            window.localStorage.setItem("token",data.data);
            window.location.href = "./Searchbar";
          Swal.fire({
            title: "Login",
            text: "Successfully Logged In",
            icon: "success"
          })    
        }else{
          Swal.fire({
            title: "Login",
            text: "OTP Invalid!",
            icon: "error"
          })   
        }
        
      });
  }
  render() {
    return (
      <div class="container mt-5">
        <div class="row">
        <div class="col-md-4"></div>

          <div class="col-md-4">
          <div class="shadow p-3 mb-5 bg-body rounded">
          <form onSubmit={this.handleSubmit}>
        <h3>Enter OTP</h3>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter OTP"
            onChange={(e) => this.setState({ otp: e.target.value })}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
       
      </form>
          </div>
          <div class="col-md-4"></div>
        </div>
      </div>
      </div>
    );
  }
}