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
          <div class="col-md-2"></div>
          <div class="col-md-7">
          <div class="shadow p-3 mb-8 bg-body rounded">
         
            <h2 class="text-center">User Profile</h2>
            
            <label class = "mt-3" >Name :</label><h5>{this.state.userData.name}</h5>

            <label class = "mt-3">Email :</label> <h5>{this.state.userData.email}</h5>

            <label class = "mt-3">Profession :</label> <h5>{this.state.userData.profession}</h5>

            <label class = "mt-3">PhoneNumber :</label> <h5>{this.state.userData.phoneNumber}</h5>

            <label class = "mt-3">Address :</label> <h5>{this.state.userData.address}</h5>

            <label class = "mt-3">API User Key :</label> <h5>{this.state.userData.key}</h5>

           <div class="text-center mt-4">
           <a type="button" href="/editprofile" class="btn btn-primary">Edit Profile </a>
           </div>
          
          </div>
          </div>
          <div class="col-md-2"></div>
         </div> 
      </div>
    );
  }
}