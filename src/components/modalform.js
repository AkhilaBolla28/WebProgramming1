import React, { Component } from "react";
import Swal from "sweetalert2";

export default class modalform extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
   
  handleClick(event) {
    event.preventDefault();
    const { advisor, author, degree, program, title, university, year, text, file } = this.state;
    const count = window.localStorage.getItem('count');
    const etd_file_id= (parseInt(count) +1);
    const pdf = file.name;
    console.log( etd_file_id, advisor, author, degree, program, title, university, year, text, pdf );
    const formData = new FormData();
    formData.append("file",file);
   
    fetch("http://localhost:5000/upload", {
      method: "POST",
      body : formData
    }).then((res) => {
      console.log(formData)
       console.log(res);})


    fetch("http://localhost:5000/insert", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        etd_file_id, 
        advisor, 
        author, 
        degree, 
        program, 
        title, 
        university, 
        year, 
        text,
        pdf
      }),
    }).then((res) => {
    console.log(res);
    if (res.status === 200) {
      Swal.fire({
        title: "Insert",
        text: "Inserted Successfully !",
        icon: "success"
      })  
      window.localStorage.setItem("count",etd_file_id);
      ('#entryform').modal('hide'); 
      }else{
        Swal.fire({
          title: "Insert",
          text: "Insert Failed",
          icon: "error"
        })   
      }});   
  }

  render() {
    return (
      <div
        class="modal fade"
        id="entryform"
        tabindex="-1"
        aria-labelledby="entryformLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="entryformLabel">
                Insert Entry
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form class="needs-validation" novalidate>
                <div className="mb-3">
                  <label class="small mb-1">Advisor</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter advisor"
                    name="advisor" 
                    onChange={(e) =>
                      this.setState({ advisor: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label class="form-label small mb-1" for="validationCustom01">Author(s)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="Enter author" 
                    name="author" required
                    onChange={(e) =>
                      this.setState({ author: e.target.value })
                    }
                  />
                   <div class="valid-feedback">Valid.</div>
                <div class="invalid-feedback">Invalid.</div>
                </div>

                <div className="mb-3">
                  <label class="form-label small mb-1" for="validationCustom02">Degree</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom02"
                    placeholder="degree" required
                    name="degree" 
                    onChange={(e) =>
                      this.setState({ degree: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label class="form-label small mb-1" for="validationCustom03">Program</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom03"
                    placeholder="program" required
                    name="program" 
                    onChange={(e) =>
                      this.setState({ program: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label class="form-label small mb-1" for="validationCustom04">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom04"
                    placeholder="Enter title" required
                    name="title" 
                    onChange={(e) =>
                      this.setState({ title: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label class="form-label small mb-1" for="validationCustom05">University</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom05"
                    placeholder="Enter university" required
                    name="university" 
                    onChange={(e) =>
                      this.setState({ university: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label class="form-label small mb-1" for="validationCustom06">Year</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom06"
                    placeholder="year" required
                    name="year"
                    onChange={(e) =>
                      this.setState({ year: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label class="form-label small mb-1" for="validationCustom07">Abstract</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom07"
                    placeholder="Enter text" required
                    name="text" 
                    onChange={(e) =>
                      this.setState({ text: e.target.value })
                    }
                  />
                </div>

                <label class="form-label" for="file">
                  Upload pdf
                </label>
                <input type="file" className="form-control" id="file"   onChange={(e) =>
                      this.setState({ file: e.target.files[0]})
                    }/>
              <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary" onClick={this.handleClick}>
                Insert
              </button>
            </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
