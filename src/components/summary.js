import React, { Component } from "react";
import {useParams} from "react-router-dom";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Domain } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

export default class Summary extends Component  {

  constructor(props) {
    super(props);
    console.dir(props);
    console.log(props.location.state);
    this.state = {
      userData: "",
      data: ""
    };
    this.setState({ data: props.searchres });
    console.log(this.state.data)
   
  }
  componentDidMount() {
    
  }

render()

{

  return (

  <div class="container mt-150">
    <div class="row mb-5">
      <div class="bg-white p-40 rounded shadow bck">
      <div class="form-group col-md-3">
              {/* <button type="submit" href="/searchengine" class="btn btn-primary rounded-pill btn-block shadow-sm">Back to results</button> */}
              <a type="button" href="/searchengine" class="btn btn-primary">Back to results</a>
            </div>  
        <div class="row">
        {/* <div class="col-lg-12 mx-auto text-center">
            <h4 class="font-weight-light font-italic text-black mt-40">Web enabled Composition of web services</h4>
        </div> */}
    </div>  
    <div class="row result-bg" >
    <div class="col-lg-12 mx-auto text-center">
            <h5 class="font-weight-light font-italic text-black mt-40">{this.state.data.title}</h5>
            </div> 
    
    <a href="#" class="text-center link-primary">http://hdl.handle.net/10897/23456</a>

    <br/><br/>

{/* <div class="form-group col-md-6 text-center"> 
  <a href="#" class="link-dark">Author(s):</a>
  </div>
  <div class="form-group col-md-6 text-center">
  <p class="col-sm-9">Enid Blyton</p></div>

  <a href="#" class="link-dark">University:</a>
  <p class="col-sm-9">Old Dominion University</p>

  <a href="#" class="link-dark">Year Issued:</a>
  <p class="col-sm-9">2022</p> */}
  
  <dl class="row text-center">
    <dt class="col-sm-3">Author(s):</dt>
    <dd class="col-sm-9">Enid Blyton</dd>
    <dt class="col-sm-3 text-truncate">University:</dt>
    <dd class="col-sm-9">Old Dominion University</dd>
    <dt class="col-sm-3">Year Issued:</dt>
    <dd class="col-sm-9">2022</dd>
</dl>

  <div class="col-lg-12 mx-auto text-center">
            <h5 class="font-weight-light font-italic text-black mt-40"><a href="/summary">Abstract</a></h5>
            </div> 
            <div class="col-lg-12 mx-auto text-center">
 <p class="col-sm-8">I heard you like definition lists. Let me put a definition list inside your definition list</p>
 <br/></div>
 <div class="form-group col-md-4">
              <input id="exampleFormControlInput5" type="text" placeholder="Add tag" class="form-control form-control-underlined"/>
            <br/></div>
            <div class="form-group col-md-3">
              <a type="button" href="/searchengine" class="btn btn-primary">Add Tag</a>
            </div> 
</div>
    </div>
    </div>
   </div>

    );
  }
}