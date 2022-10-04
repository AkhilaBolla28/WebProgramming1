import './App.css';
import React from 'react';import { Component } from "react";
import SignInOutContainer from './containers';
import UserDetails from "./components/userDetails";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SearchBar from "./components/SearchBar";
import Appbar from './components/navbar';
import Forgotpassword from './components/forgotpassword';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Changepassword from "./components/changepassword"
import EditProfile from './components/editprofile';
import Auth from './components/auth';
import SignUp from './components/signup';

export default class App extends Component {

render(){
  return (
    <div className="App">
        <Appbar />
          <Router>
          <Routes>
              <Route exact path="/" element={<SignInOutContainer />} />
              {/* <Route exact path="/signup" element={<SignUp />} /> */}
              <Route path="/searchbar" element={<SearchBar />} />
              <Route path="/forgotpassword" element={<Forgotpassword />} />
              <Route path="/profile" element={<UserDetails />} />
              <Route path="/changepassword" element={<Changepassword />} />
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
            </Router>
        </div>
      );
    }
  }

