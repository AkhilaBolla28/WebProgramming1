import React, { Component } from "react";
import Swal from "sweetalert2";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      profession: "",
      phoneNumber: "",
      address: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      });
  }

  handleSubmit() {
    const { name, email, phoneNumber, profession, address } = this.state;
     if (name == "") {
      name = window.localStorage.getItem("name")
     }
     if (profession == "") {
       profession = window.localStorage.getItem("profession")
     }
     if (phoneNumber == "") {
       phoneNumber = window.localStorage.getItem("phoneNumber")
     }
     if (address == "") {
       address = window.localStorage.getItem("address")
     }

    fetch("http://localhost:5000/editProfile", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: window.localStorage.getItem("email"),
        name,
        profession,
        phoneNumber,
        address,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          Swal.fire({
            title: "Updated Profile ",
            text: "Success!!!",
            icon: "success",
          });
          window.location.href = "/profile";
        } else {
          Swal.fire({
            title: "Something is Wrong!! ",
            text: "Error!!!",
            icon: "error",
          });
        }
      });
  }
  render() {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const profession = localStorage.getItem("profession");
    const phoneNumber = localStorage.getItem("phoneNumber");
    const address = localStorage.getItem("address");
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <div class="shadow p-3 mb-5 bg-body rounded">
              <form onSubmit={(e) => e.preventDefault()}>
              <div className="headerStyle">
                  <h2>Edit Profile</h2>
                </div>

                <div className="mb-3">
                  <label class="small mb-1">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder={name}
                    name="name"
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label class="small mb-1">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder={email}
                    name="email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label class="small mb-1">Profession</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder={profession}
                    name="profession"
                    onChange={(e) =>
                      this.setState({ profession: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label class="small mb-1">Phone Number</label>
                  <input
                    type="tel"
                    class="form-control"
                    placeholder={phoneNumber}
                    name="phoneNumber"
                    pattern="[1-9]{1}[0-9]{9}"
                    onChange={(e) =>
                      this.setState({ phoneNumber: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label class="small mb-1">Address</label>
                  <input
                    type="address"
                    class="form-control"
                    placeholder={address}
                    name="address"
                    onChange={(e) => this.setState({ address: e.target.value })}
                  />
                </div>

                <div className="d-grid">
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={this.handleSubmit}
                  >Save</button>
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
