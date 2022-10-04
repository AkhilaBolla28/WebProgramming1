import React, { Component } from "react";

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
        window.localStorage.setItem("email",data.data.email);
        window.localStorage.setItem("name",data.data.name);
        window.localStorage.setItem("profession",data.data.profession);
        window.localStorage.setItem("phoneNumber",data.data.phoneNumber);
        window.localStorage.setItem("address",data.data.address);
      });
  }
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
          <div class="shadow p-3 mb-5 bg-body rounded">
         
            <h1 class="text-center">User Profile</h1>
            
            <label class = "small mb-1">Name</label>
            <h3>{this.state.userData.name}</h3>

            <label class = "small mb-1">Email</label> <h3>{this.state.userData.email}</h3>

            <label class = "small mb-1">profession</label> <h3>{this.state.userData.profession}</h3>

            <label class = "small mb-1">phoneNumber</label> <h3>{this.state.userData.phoneNumber}</h3>

            <label class = "small mb-1">Address</label> <h3>{this.state.userData.address}</h3>

           <div class="text-center mt-4">
           <a type="button" href="/editprofile" class="btn btn-primary">Edit Profile </a>
           </div>
          
          </div>
          </div>
          <div class="col-md-4"></div>
        </div> 
      </div>
    );
  }
}