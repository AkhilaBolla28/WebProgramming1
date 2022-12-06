import React, { Component, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Domain } from "@mui/icons-material";
import { useLocation, Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import ReactTooltip from "react-tooltip";
import Wrapper from "react-wiki-preview";
import "./summary.css";
import Hovercard from "hovercard";

const Summary = (props) => {
  const location = useLocation();
  const state = location.state;
  console.log('searchres', state.searchres);
  const title = window.localStorage.getItem("title");
  // var etd_file_id = 1;
  // var links = "../PDF/"+etd_file_id+".pdf";
  const words = state.searchres.wikifier_terms;
  //console.log(words);
  var keywords = [];
  for (let i = 0; i < words.length; i++) {
    keywords.push(words[i]);
    //console.log(words[i].term);
  }

  console.log(keywords);

  const cards = new Hovercard({
    lang: "en",
  });

  const addWikiCard = (text, keywords) => {
    //console.log({ text, keywords })
    const markWikiStyling = (abstract, keyword) => {
      return keyword.reduce((sum, acc) => {
        let { term, url } = acc;
        const regex1 = new RegExp(term, "gi");
        let sTerm = sum !== "" ? sum : abstract;
        sum = sTerm?.replace(
          regex1,
          `<a href="${url}" target="_blank"><span class="hovercard">$&</span></a>`
        );
        return sum;
      }, "");
    };

    const res = markWikiStyling(text, keywords);
    return <span dangerouslySetInnerHTML={{ __html: res }}></span>
  }

  useEffect(() => {
    const cards = new Hovercard({
      lang: "en",
      getFetchEndpoint: (word) => {
        console.log({ word });
        return `https://en.wikipedia.org/api/rest_v1/page/summary/${word?.toLowerCase()}`;
      },
      getHeading: (result) => {
        console.log({ result });
        return result.title;
      },
      template: (wikiResult) => {
        return `<div class="hovercard-card">
      <h3 class="hovercard-title"><span class="mw-page-title-main">${
        wikiResult?.heading
      }</span></h3>
      <a href="https://en.wikipedia.org/wiki/${wikiResult?.heading}" target="_blank">
         https://en.wikipedia.org/wiki/${wikiResult?.heading}
        </a>
  <p class="hovercard-description">${wikiResult?.body}</p>
 
  </div>
    `;
      },
    });
  }, [keywords]);

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
                  href={`http://localhost:5000/view/${state.searchres.pdf}`}
                >
                  View Document
                </a>
              </div>

              <br />
              <br />
              <dl class="row ">
                <dt class="col-sm-2" style={{ textAlign: "left" }}>
                  Advisor(s):
                </dt>
                <dd class="col-sm-4 text-capitalize text-left">
                  {state.searchres.advisor}
                </dd>
                <dd class="col-sm-6"></dd>
                
                <dt class="col-sm-2" style={{ textAlign: "left" }}>
                  Author(s):
                </dt>
                <dd class="col-sm-4 text-capitalize text-left">
                  {state.searchres.author}
                </dd>
                <dd class="col-sm-6"></dd>
                <dt
                  class="col-sm-2 text-truncate"
                  style={{ textAlign: "left" }}
                >
                  Degree:
                </dt>
                <dd class="col-sm-4 text-capitalize">
                  {state.searchres.degree}
                </dd>
                <dd class="col-sm-6"></dd>
                <dt
                  class="col-sm-2 text-truncate"
                  style={{ textAlign: "left" }}
                >
                  Program:
                </dt>
                <dd class="col-sm-4 text-capitalize">
                  {state.searchres.program}
                </dd>
                <dd class="col-sm-6"></dd>
                <dt
                  class="col-sm-2 text-truncate"
                  style={{ textAlign: "left" }}
                >
                  Title:
                </dt>
                <dd class="col-sm-4 text-capitalize">
                  {state.searchres.title}
                </dd>
                <dd class="col-sm-6"></dd>
                <dt
                  class="col-sm-2 text-truncate"
                  style={{ textAlign: "left" }}
                >
                  University:
                </dt>
                <dd class="col-sm-4 text-capitalize">
                  {state.searchres.university}
                </dd>
                <dd class="col-sm-6"></dd>
                <dt class="col-sm-2" style={{ textAlign: "left" }}>
                  Year Issued:
                </dt>
                <dd class="col-sm-4 text-capitalize">{state.searchres.year}</dd>
              </dl>
              <dd class="col-sm-6"></dd>
              <div class="col-lg-12 mx-auto text-center">
                <h4 class="font-weight-light font-italic text-black mt-40">
                  Abstract
                </h4>
              </div>
              <div class="col-lg-12 mx-auto text-justify">
                {/* <Wrapper keyword={keywords}>{state.searchres.text}</Wrapper> */}
                <p>{addWikiCard(state.searchres.text, keywords)}</p>
                
                {/* 
<span class="hovercard" keyword={keywords} anchorStyles={style}><p>{state.searchres.text} </p></span> */}

                {/* <p>{state.searchres.text}
                </p> */}
                {/* <ReactTooltip id="tooltip" effect="solid" type="success" /> */}
                {/* <Highlighter
                      highlightClassName="YourHighlightClass"
                      searchWords={['radiation','the']}
                      autoEscape={true}
                      textToHighlight={state.searchres.text}
                    /> */}
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
