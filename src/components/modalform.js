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
              <form>
                <div className="mb-3">
                  <label class="small mb-1">Advisor</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter advisor"
                    name="advisor"
                    required
                    onChange={(e) =>
                      this.setState({ advisor: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label class="small mb-1">Author(s)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter author"
                    name="author"
                    required
                    onChange={(e) =>
                      this.setState({ author: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label class="small mb-1">Degree</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="degree"
                    name="degree"
                    required
                    onChange={(e) =>
                      this.setState({ degree: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label class="small mb-1">Program</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="program"
                    name="program"
                    required
                    onChange={(e) =>
                      this.setState({ program: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label class="small mb-1">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter title"
                    name="title"
                    required
                    onChange={(e) =>
                      this.setState({ title: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label class="small mb-1">University</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter university"
                    name="university"
                    required
                    onChange={(e) =>
                      this.setState({ university: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label class="small mb-1">Year</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="year"
                    name="year"
                    required
                    onChange={(e) =>
                      this.setState({ year: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label class="small mb-1">Abstract</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter text"
                    name="text"
                    required
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
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" onClick={this.handleClick}>
                Insert
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
