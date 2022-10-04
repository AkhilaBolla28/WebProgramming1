import React, { Component } from "react";
import * as Yup from 'yup';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FormHelperText } from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import  'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js'
import style from 'bootstrap/dist/css/bootstrap.css';
import Swal from 'sweetalert2'

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
}
  handleSubmit(e) {
    e.preventDefault();
    
    const { currentPassword, newPassword, confirmPassword } = this.state;
    console.log( currentPassword, newPassword, confirmPassword );
    if(currentPassword == newPassword)
    {
      Swal.fire({
        title: "Current and New Password Same ",
        text: "Error!!!",
        icon: "error"
      })  
    }else{
      if(newPassword != confirmPassword){
        Swal.fire({
          title: "New and Confirm Password Does not Match ",
          text: "Error!!!",
          icon: "error"
        }) 
      }else{
        fetch("http://localhost:5000/changepassword", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
          email: window.localStorage.getItem("email"),
          currentPassword,
          newPassword,
          confirmPassword,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userRegister");
            if (data.status == "error2") {
              Swal.fire({
                title: "Current Password is Wrong ",
                text: "Error!!!",
                icon: "error"
              }) 
            }else if(data.status == "error"){
              Swal.fire({
                title: "Something is wrong !!",
                text: "Error!!!",
                icon: "error"
              }) 
            }
            else{
              Swal.fire({
                title: "Password Changed Succesfully!! ",
                text: "Success!!!",
                icon: "success"
              }) 
            }
          });
      }
    }
  }

  render() {
    return (

        <div class="container">
          <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4" >
            <div class="shadow p-3 mb-5 bg-body rounded">
            <form onSubmit={this.handleSubmit}>
          <div className="headerStyle">
            <h2>Change Password</h2>
        </div>

        <div className="mb-3" >
          <label class = "small mb-1">Current Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password" 
            name="currentPassword"
            required
            onChange={(e) => this.setState({ currentPassword: e.target.value })}
          />
          </div>

        <div className="mb-3">
          <label class = "small mb-1">New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            name="newPassword"
            required
            onChange={(e) => this.setState({ newPassword: e.target.value })}
            />
        </div>

        <div className="mb-3">
          <label class = "small mb-1">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="confirmPassword"  
            required      
            onChange={(e) => this.setState({ confirmPassword: e.target.value })}
          />
         </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Change Password
          </button>
        </div>
        </form>
            </div>
            </div>
            <div class="col-md-4"></div>
          </div>
          
        </div>
    );
                }
    
}
