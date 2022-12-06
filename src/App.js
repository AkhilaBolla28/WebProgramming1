import "./App.css";
import React from "react";
import { Component } from "react";
import SignInOutContainer from "./containers";
import UserDetails from "./components/userDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import Appbar from "./components/navbar";
import Forgotpassword from "./components/forgotpassword";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Changepassword from "./components/changepassword";
import EditProfile from "./components/editprofile";
import Auth from "./components/auth";
import SignUp from "./components/signup";
import Searchengine from "./components/searchengine";
import Summary from "./components/summary";
import Footer from "./components/footer";
import About from "./components/about"
import Contact from "./components/contact"

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Appbar />
        <Router>
          <Routes>
            {/* <Route exact path="/" element={<SignInOutContainer />} /> */}
            <Route exact path="/" element={<SearchBar />} />
            <Route
              exact
              path="/searchengine/:title"
              element={<Searchengine />}
            />
            <Route path="/SignInOut" element={<SignInOutContainer />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/summary/:id" element={<Summary />} />
            <Route path="/searchbar" element={<SearchBar />} />
            <Route path="/forgotpassword" element={<Forgotpassword />} />
            <Route path="/profile" element={<UserDetails />} />
            <Route path="/changepassword" element={<Changepassword />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </Router>
       
      </div>
    );
  }
}
