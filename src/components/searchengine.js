import React, { Component } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Modal } from "bootstrap";
import Modalform from "./modalform";
import Summary from "./summary";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import "./searchengine.css";
import DOMPurify from 'dompurify';

export default class Searchengine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchvalue: "",
      //searchData: "",
      title: "",
      searcharray: [],
      searchres: "",
      // currentPage: 1,
      // postsPerPage: 5,
// newly added
   perPage: 5,
   page: 0,
   pages: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    const title = window.localStorage.getItem("title");
    fetch("http://localhost:5000/searchengine?title=" + title + "", {
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
        console.log(data, "searchData");
        this.setState({ searchvalue: data.total });
        //this.setState({ searchData: data.hits[0]._source});
        this.setState({ searcharray: data.hits });
        this.setState({ title: title });
        this.setState({
          pages: Math.ceil(this.state.searcharray.length / this.state.perPage)
        });
      });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ title: event.target.value });
  }
  handleClick(event) {
    event.preventDefault();
    this.state.title = this.state.title.replace(/(<([^>]+)>)/gi,'');
    this.state.title = this.state.title.replace(/^\s*\/*\s*|\s*\/*\s*$/gm,'');
    this.state.title = this.state.title.replace(/\/$/g,'');
    this.state.title = this.state.title.replace(/\\/g,'');
    //this.state.title = this.state.title.replace(/[^a-zA-Z0-9 ]/g,'');

    window.localStorage.setItem("title", this.state.title);
    const { title, value } = this.state;
    window.location.href = "./" + this.state.title;
    fetch("http://localhost:5000/searchengine?title=" + title + "", {
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
        console.log(data, "searchData");
        this.setState({ searchvalue: data.total });
        //this.setState({ searchData: data.hits[0]._source});
        this.setState({ searcharray: data.hits });
        this.setState({ title: title });
        console.log(this.state.searchvalue);
        console.log(this.state.searchData);
        console.log(this.state.searcharray);
        console.log(this.state.title);
      });
  }
  changeState = (d) => {
    this.setState({ searchres: d });
    console.log(this.state.searchres);
  };
  handlePageClick = (event) => {
    let page = event.selected;
    this.setState({page})
  }

  modalClick() {
    Swal.fire({
      title: "Login",
      text: "Please login to insert an entry",
      icon: "error",
    });
}
  render() {
    //newly added
  //const {page, perPage, pages, list} = this.state;
   let items = this.state.searcharray.slice(this.state.page * this.state.perPage, (this.state.page + 1) * this.state.perPage);

    // //Get currentPosts
    // const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    // const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    // const currentPosts = this.state.searcharray.slice(
    //   indexOfFirstPost,
    //   indexOfLastPost
    // );

    // //Implement page numbers
    // const pageNumbers = [];

    // for (
    //   let i = 1;
    //   i <= Math.ceil(this.state.searcharray.length / this.state.postsPerPage);
    //   i++
    // ) {
    //   pageNumbers.push(i);
    // }

    // //Set current page
    // const setPage = (pageNum) => {
    //   this.setState({ currentPage: pageNum });
    // };

    const title = window.localStorage.getItem("title");

    return (
      <div class="container mt-150">
        <br/>
        <div class="row mb-5">
          <div class="col-lg-8 mx-auto">
            <h3 class="font-weight-light mb-4 font-italic text-white mt-40">
              Welcome to WikiLibrary!!
            </h3>
            <div class="bg-white p-40 rounded shadow bck">
              <div class="row mb-4 ">
                <div class="form-group col-md-8 mt-2">
                  <input
                    id="exampleFormControlInput5"
                    type="text"
                    value={this.state.title}
                    onChange={this.handleChange}
                    placeholder="What're you searching for?"
                    class="form-control form-control-underlined"
                  />
                </div>
                <div class="form-group col-md-4 mt-2">
                  <a
                    type="button"
                    class="btn btn-primary"
                    onClick={this.handleClick}
                  >
                    Search
                  </a>
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
                    <>
                     <div class="form-group col-md-3">
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-bs-toggle="modal"
                          // data-bs-target="#entryform"
                          onClick={this.modalClick}
                        >
                          Insert Entry
                        </button>
                      </div>
                      </>
                  )}
                </div>
              </div>

              <Modalform />

              <br/>

              <div class="row">
                <div class="col-lg-12 mx-auto">
                  <h4 class="font-weight-light font-italic text-black mt-40">
                    {this.state.searchvalue.value} search results by
                    searching&nbsp;
                    <Highlighter
                      highlightClassName="YourHighlightClass"
                      searchWords={[this.state.title]}
                      autoEscape={true}
                      textToHighlight={title}
                    />
                  </h4>
                </div>
              </div>
              {items.map((d) => (
                <div class="row result-bg">
                  <div class="text-align">
                    <h5 class="font-weight-light font-italic text-black text-capitalize mt-40">
                      <Link
                        to={"/summary/" + d._source.etd_file_id}
                        state={{ searchres: d._source }}
                      >
                        <a>
                          <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={[this.state.title]}
                            autoEscape={true}
                            textToHighlight={d._source.title}
                          />
                        </a>
                      </Link>
                    </h5>
                    <br />{" "}
                  </div>
                  <dl class="row">
                    
                    <dt class="col-sm-3">Author(s)</dt>
                    <dd class="col-sm-9 text-capitalize">
                      <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[this.state.title]}
                        autoEscape={true}
                        textToHighlight={d._source.author}
                      />
                    </dd>

                    <dt class="col-sm-3">Degree</dt>
                    <dd class="col-sm-9 text-capitalize">
                      <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[this.state.title]}
                        autoEscape={true}
                        textToHighlight={d._source.degree}
                      />
                    </dd>

                    <dt class="col-sm-3">Program</dt>
                    <dd class="col-sm-9 text-capitalize">
                      <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[this.state.title]}
                        autoEscape={true}
                        textToHighlight={d._source.program}
                      />
                    </dd>

                    <dt class="col-sm-3">University</dt>
                    <dd class="col-sm-9 text-capitalize">
                      <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[this.state.title]}
                        autoEscape={true}
                        textToHighlight={d._source.university}
                      />
                    </dd>

                    <dt class="col-sm-3">Year</dt>
                    <dd class="col-sm-9 text-capitalize">
                      <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[this.state.title]}
                        autoEscape={true}
                        textToHighlight={d._source.year}
                      />
                    </dd>

                    <div class="col-sm-8 text-truncate">
                      <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[this.state.title]}
                        autoEscape={true}
                        textToHighlight={d._source.text}
                      />
                    </div>
                  </dl>
                  <div>
                    <Link
                      to={"/summary/" + d._source.etd_file_id}
                      state={{ searchres: d._source }}
                    >
                      <a type="button" class="btn btn-primary">
                        Show more
                      </a>
                    </Link>
                  </div>
                  <br />
                  <br />
                </div>
              ))}

              <br></br>

              {/* {
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    {pageNumbers.map((pageNum, index) => (
                      <li class="page-item">
                        <a
                          class="page-link"
                          href="#"
                          onClick={() => {
                            setPage(pageNum);
                          }}
                        >
                          {" "}
                          {pageNum}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              } */}
          <ReactPaginate
         previousLabel={'Prev'}
         nextLabel={'Next'}
         pageCount={this.state.pages}
         onPageChange={this.handlePageClick}
         containerClassName={'pagination'}
         activeClassName={'active'}
       />

            </div>
          </div>
        </div>
      </div>
    );
  }
}
