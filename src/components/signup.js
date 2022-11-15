import React, { Component } from "react";
import { Typography } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { ErrorMessage } from 'formik';
import  'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js'

import Swal from "sweetalert2";

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      profession:"",
      address:""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
}
  handleSubmit(e) {
    e.preventDefault();
    
    const { name, email, phoneNumber, password, confirmPassword, address, profession } = this.state;
    console.log( name, email, phoneNumber, password, confirmPassword,address, profession );

    if(password !== confirmPassword)
    {
        Swal.fire({
          title: " Password and Confirm Password Does not Match ",
          text: "Error!!!",
          icon: "error"
        }) 
      }else{

    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        email,
        phoneNumber,
        password,
        confirmPassword,
        address,
        profession,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
        // alert("User Registered Successfully");
        Swal.fire({
          title: "Register",
          text: "User Registered Successfully !",
          icon: "success"
        })   
        }else{
          Swal.fire({
            title: "Register",
            text: "User already exists!",
            icon: "error"
          })   
        }

      });
    
  }
}


  render() {
    return (
        <div class="container">
      <form onSubmit={this.handleSubmit} class="needs-validation" novalidate>
      <div class="container text-center mt-3">
            <div class="row">
              <div className="avatarStyle">
                <AddCircleOutlineOutlinedIcon />
              </div>
              <div className="headerStyle">
                <h3>Sign Up</h3>
              </div>
              <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
            </div>
      </div>

        <div className="mb-3" >
          <label class = "small mb-1" for="validationCustom01" >Name</label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            placeholder="Full Name" required
            name="name"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <div class="valid-feedback">Valid.</div>
          <div class="invalid-feedback">Invalid.</div>
        </div>

        <div className="mb-3">
          <label class = "small mb-1">Email</label>
          <input
            type="email"
            className="form-control"
            id="validationCustom03"
            placeholder="Email"
            name="email" required
            onChange={(e) => this.setState({ email: e.target.value })}
            />
            <div class="valid-feedback">Valid.</div>
          <div class="invalid-feedback">Please enter your email.</div>
        </div>

        <div className="mb-3">
          <label class = "small mb-1">Profession</label>
          <input
            type="text"
            className="form-control"
            id="validationCustom03"
            placeholder="Profession"
            name="profession" required
            onChange={(e) => this.setState({ profession: e.target.value })}
            />
            <div class="valid-feedback">Valid.</div>
          <div class="invalid-feedback">Please enter your profession.</div>
        </div>


        <div className="mb-3">
          <label class = "small mb-1">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="validationCustom03"
            placeholder="PhoneNumber"
            name="phoneNumber"  
            pattern="[1-9]{1}[0-9]{9}" required
             
            onChange={(e) => this.setState({ phoneNumber: e.target.value })}
          />
          <div class="valid-feedback">Valid.</div>
          <div class="invalid-feedback">Please enter your phoneNumber.</div>
        </div>

        <div className="mb-3">
          <label class = "small mb-1">Address</label>
          <input
            type="address"
            className="form-control"
            id="validationCustom03"
            placeholder="Address - Optional" 
            name="address"           
            onChange={(e) => this.setState({ address: e.target.value })}
          />
          <div class="valid-feedback">Valid.</div>
          <div class="invalid-feedback">Please enter address</div>
        </div>

        <div className="mb-3">
          <label class = "small mb-1">Password</label>
          <input
            type="password"
            className="form-control"
            id="validationCustom03"
            placeholder="Enter password" 
            name="password" required              
            helperText={<ErrorMessage name="password" />} 
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <div class="valid-feedback">Valid.</div>
          <div class="invalid-feedback">Please enter password.</div>
        </div>

        <div className="mb-3">
          <label class = "small mb-1">ConfirmPassword</label>
          <input
            type="password"
            className="form-control"
            id="validationCustom03"
            placeholder="Confirm your password"
            name="confirmPassword"
            required  
            onChange={(e) => this.setState({ confirmPassword: e.target.value })}
          />
        <div class="valid-feedback">Valid.</div>
          <div class="invalid-feedback">Please confirm password.</div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-center mt-2">
          Already registered <a href="/">sign in?</a>
        </p>
        </form>
        </div>
    );
                }
    
}
