import React, { Component } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import Modalform from "./modalform";
import Swal from "sweetalert2";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      title: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
        window.localStorage.setItem("email", data.data.email);
        window.localStorage.setItem("name", data.data.name);
        window.localStorage.setItem("profession", data.data.profession);
        window.localStorage.setItem("phoneNumber", data.data.phoneNumber);
        window.localStorage.setItem("address", data.data.address);
      });
    fetch("http://localhost:5000/count", {
      method: "GET",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.count, "count");
        window.localStorage.setItem("count", data.count);
      });
  }
  handleClick(event) {
    event.preventDefault();
    window.localStorage.setItem("title", this.state.title);
    if (this.state.title) {
      window.location.href = "./searchengine/" + this.state.title;
    } else
      Swal.fire({
        title: "Error",
        text: "Please enter value to search!",
        icon: "error",
      });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ title: event.target.value });
  }

  render() {
    return (
      <div class="container mt-100">
        <div class="row mb-5">
          <div class="col-lg-8 mx-auto">
            <h3 class="font-weight-light mb-4 font-italic text-white mt-40">
              Welcome to WikiLibrary {this.state.userData.name}!!
            </h3>
            <div class="bg-white p-5 rounded shadow bck">
              <form>
                <div class="row mb-4">
                  <div class="form-group col-md-9">
                    <input
                      id="exampleFormControlInput5"
                      type="text"
                      value={this.state.title}
                      onChange={this.handleChange}
                      placeholder="What're you searching for?"
                      class="form-control form-control-underlined"
                    />
                  </div>
                  <div class="form-group col-md-3">
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={this.handleClick}
                    >
                      Search
                    </button>
                    <br /> <br />
                  </div>
                  <div class="row mb-3">
                    {localStorage.getItem("token") ? (
                      <>
                        <div class="form-group col-md-3">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#entryform"
                          >
                            Insert Entry
                          </button>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <Modalform />
          </div>
        </div>
      </div>
    );
  }
}
