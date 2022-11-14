import React, { Component } from "react";
import { useParams } from "react-router-dom";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Domain } from "@mui/icons-material";
import { useLocation, Link } from "react-router-dom";

const Summary = (props) => {
  const location = useLocation();
  const state = location.state;
  console.log(state.searchres);
  const title = window.localStorage.getItem("title");
  // var etd_file_id = 1;
  // var links = "../PDF/"+etd_file_id+".pdf";

  return (
    <>
      <div class="container mt-150">
        <div class="row mb-5">
          <div class="bg-white p-40 rounded shadow bck">
            <div class="form-group col-md-3">
              <Link to={"/searchengine/" + title}>
                <a type="button" class="btn btn-primary">
                  Back to results
                </a>
              </Link>
            </div>
            <div class="row"></div>
            <div class="row result-bg">
              <div class="col-lg-12 mx-auto text-center">
                <h4 class="font-weight-light font-italic text-black text-capitalize mt-40">
                  {state.searchres.title}
                </h4>
              </div>
              <div class="text-center">
                <a
                  target="_blank"
                  href={`http://localhost:5000/fileInfo/${state.searchres.pdf}`}
                >
                  View Document
                </a>
              </div>

              <br />
              <br />
              <dl class="row ">
                <dt class="col-sm-6" style={{ textAlign: "right" }}>
                  Advisor(s):
                </dt>
                <dd class="col-sm-6 text-capitalize text-left">
                  {state.searchres.advisor}
                </dd>
                <dt class="col-sm-6" style={{ textAlign: "right" }}>
                  Author(s):
                </dt>
                <dd class="col-sm-6 text-capitalize text-left">
                  {state.searchres.author}
                </dd>
                <dt
                  class="col-sm-6 text-truncate"
                  style={{ textAlign: "right" }}
                >
                  Degree:
                </dt>
                <dd class="col-sm-6 text-capitalize">
                  {state.searchres.degree}
                </dd>
                <dt
                  class="col-sm-6 text-truncate"
                  style={{ textAlign: "right" }}
                >
                  Program:
                </dt>
                <dd class="col-sm-6 text-capitalize">
                  {state.searchres.program}
                </dd>
                <dt
                  class="col-sm-6 text-truncate"
                  style={{ textAlign: "right" }}
                >
                  Title:
                </dt>
                <dd class="col-sm-6 text-capitalize">
                  {state.searchres.title}
                </dd>
                <dt
                  class="col-sm-6 text-truncate"
                  style={{ textAlign: "right" }}
                >
                  University:
                </dt>
                <dd class="col-sm-6 text-capitalize">
                  {state.searchres.university}
                </dd>
                <dt class="col-sm-6" style={{ textAlign: "right" }}>
                  Year Issued:
                </dt>
                <dd class="col-sm-6 text-capitalize">{state.searchres.year}</dd>
              </dl>

              <div class="col-lg-12 mx-auto text-center">
                <h4 class="font-weight-light font-italic text-black mt-40">
                  Abstract
                </h4>
              </div>
              <div class="col-lg-12 mx-auto text-center">
                <p>{state.searchres.text}</p>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
