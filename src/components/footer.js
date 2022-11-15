import * as React from "react";
import { Component } from "react";
import "./footer.css";

export default class Footer extends Component {
  render() {
    return (
        <div class="container">
          <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div class="col-md-4 d-flex align-items-center">
              <span class="mb-4 mb-md-0 text-dark">
                © 2022. All Rights Reserved.
              </span>
            </div>
            <div class="col-md-4 justify-content-end list-unstyled d-flex">
              <span class="mb-4 mb-md-0 text-dark">
                Digital Library with Wiki Cards
              </span>
            </div>
          </footer>
        </div>
    );
  }
}
