import React, { Component } from "react";

export default class App extends Component {
render() {
return (
    <div class="container mt-5">
        <br/>
<div className="App">
    <br/>
<div class="col-lg-12 mx-auto text-center">
<h3 class="font-weight-light font-italic text-black mt-40">
About the Website
</h3>
</div>
<br/>
<div class="col-lg-12 mx-auto text-center">
<p>Building a web-based user interface (UI) for abstracts for electronic thesis and dissertations is the aim of this 
project. Users should be able to search for Elasticsearch-indexed ETDs using a text box on the UI's landing page. 
When a user hits a single search engine results page (SERP), a summary page displaying an ETD's metadata, 
including its name, writers, year, college, adviser, field, and abstract. The focus words should be highlighted in the 
abstract text. A key phrase extractor pre-extracted these key phrases, which can relate a phrase to a term on 
Wikipedia. When a user hops its mouse on the highlighted phrases, a window (referred to as a "Wiki-card") will 
appear and show the first sentence in the key phrase’s explanation in Wikipedia. Users can also click the Wiki-card 
and go to the key phrase’s Wikipedia page. </p>
<br />
</div>
<div class="col-lg-12 mx-auto text-center">
Created by: <a href= "https://www.linkedin.com/in/akhila-bolla/" class="alert-link">Akhila Bolla</a>
</div>
</div>
</div>
);
      }
    }