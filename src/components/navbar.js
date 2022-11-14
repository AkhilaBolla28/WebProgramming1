import * as React from "react";
import { Component } from "react";
import "./navbar.css";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  signout() {
    localStorage.clear();
  }
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light navbar-custom">
        <div class="container">
          <h2 class="navbar-brand">Digital Library with Wiki Cards</h2>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            {localStorage.getItem("token") ? (
              <>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu">
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i>
                        <AccountCircleIcon /> My Account
                      </i>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <a class="dropdown-item" href="/searchbar">
                          <i>
                            <HomeIcon />
                          </i>
                          Home
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/changepassword">
                          {" "}
                          <i>
                            <ChangeCircleIcon />
                          </i>{" "}
                          Change Password
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/profile">
                          <i>
                            <PersonIcon />
                          </i>{" "}
                          View Profile
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/editprofile">
                          <i>
                            <ManageAccountsIcon />
                          </i>{" "}
                          Edit Profile
                        </a>
                      </li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          class="dropdown-item"
                          href="/"
                          onClick={this.signout}
                        >
                          <i>
                            <LogoutIcon />
                          </i>{" "}
                          Log Out
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu">
                  <li class="nav-link navbar-nav navbar-right">
                    <a
                      class="nav-link active"
                      href="/searchbar"
                      aria-expanded="true"
                    >
                      {" "}
                      SearchEngine{" "}
                    </a>
                  </li>
                  <li class="nav-link navbar-nav navbar-right">
                    <a
                      class="nav-link active"
                      href="/SignInOut"
                      aria-expanded="true"
                    >
                      {" "}
                      Would you like to Login?{" "}
                    </a>
                  </li>
                </ul>
                <p></p>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
