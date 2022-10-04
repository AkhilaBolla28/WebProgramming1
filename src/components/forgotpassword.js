import React, { Component } from "react";
import Swal from 'sweetalert2'

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    console.log( email );
    fetch("http://localhost:5000/forgotpassword", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          Swal.fire({
            title: "Forgot Password",
            text: "Successfully Sent Email to Registered User!",
            icon: "success"
          })    
        }else{
          Swal.fire({
            title: "Forgot Password",
            text: "User Does Not Exists!",
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
        <h3>Forgot Password</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <div class="text-center">
        <p className="forgot-password text-right">
        <a href="/">Sign in?</a> </p>
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