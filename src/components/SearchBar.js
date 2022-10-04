import React, { Component } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

export default class SearchBar extends Component  {

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

render(){

  return (
  <div class="container mt-100">
    <div class="row mb-5">
    <div class="col-lg-8 mx-auto">
      <h2 class="font-weight-light mb-4 font-italic text-white mt-40">Welcome to WikiLibrary {this.state.userData.name}!!</h2>
      <div class="bg-white p-5 rounded shadow">
        <form>
          <div class="row mb-4">
            <div class="form-group col-md-9">
              <input id="exampleFormControlInput5" type="text" placeholder="What're you searching for?" class="form-control form-control-underlined"/>
            </div>
            <div class="form-group col-md-3">
              <button type="submit" class="btn btn-primary rounded-pill btn-block shadow-sm">Search</button>
            </div>
          </div>
        </form>
    </div>
    </div>
    </div>
    </div>
    );
  }
}