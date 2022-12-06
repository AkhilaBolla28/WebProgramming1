import * as React from "react";
import { Component } from "react";
import "./footer.css";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';

export default class Footer extends Component {
  render() {
    return (
     
      <footer class="navbar-footer" >
        <div class = "container">

          <div class="row">
            <div class="col-md-1 text-start">
            <a href="/about" class="link-dark">
               <i>
                            <InfoOutlinedIcon />
                          </i>
                          About  
                          </a>

            </div>
            <div class="col-md-4 text-start">
            <a href="/contact" class="link-dark">
               <i>
                            <ContactsOutlinedIcon />
                          </i>
                          Contact  </a>
              
            </div>
            <div class="col-md-7 text-end">
            <p> © 2022 Digital Library with Wiki Cards. All Rights Reserved.</p>
              
            </div>
          </div>
            {/* <div class="col-md-5 d-flex align-items-center">
              <div class="col-md-2">
                <span class="mb-4 mb-md-0 text-dark">
                <a href="/about" class="link-dark">
               <i>
                            <InfoOutlinedIcon />
                          </i>
                          About  
                          </a>
           
                </span>
            </div>
            <div class="col-md-1">
            </div>
            <div class="col-md-2">
              <span class="mb-4 mb-md-0 text-dark">
               <a href="/contact" class="link-dark">
               <i>
                            <ContactsOutlinedIcon />
                          </i>
                          Contact  </a>
                </span>
            </div>
            </div> */}
           
            {/* <div class="col-md-7 justify-content-end list-unstyled d-flex">
              <span class="mb-4 mb-md-0 text-dark">
               <p> © 2022 Digital Library with Wiki Cards. All Rights Reserved.</p>
              </span>
            </div> */}
        </div>
        </footer>
      
        
    );
  }
}
