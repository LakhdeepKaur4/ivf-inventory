import React, { Component } from "react";
import './CreatePage.css';
import Dashboard from "../../components/dashboard/dashboard";
import $ from 'jquery';

class CreatePage extends Component {

    componentDidMount() {
        $(function () {
            $('textarea#eg-textarea').editable({
                inlineMode: false
            })
        });
    }

    render() {
        return (
            <div>
                <Dashboard>
                    <div className="create">CREATE PAGE</div>
                    <div className="Pdesc">[Page Description]</div>
                    <div className="subTitle">[SubTitle]</div>
                    <div className="row">
                        <div class="col-md-6">
                            <div className="row">
                                <div class="col-md-4">
                                    <label className="other">Other meta</label>
                                </div>
                                <div class="col-md-8" style={{ marginTop: "30px" }}>
                                    <input type="text" placeholder="Page title" />

                                    <input type="text" placeholder="keywords" />
                                    <input type="text" placeholder="description" />
                                    <input type="text" placeholder="s. keywords" />
                                    {/* <input
                  type="text"
                  placeholder="Template Layout"
                  class="glyphicon glyphicon-menu-down"
                /> */}

                                    <select id="exampleFormControlSelect1" required>
                                        <option value="group">Template Layout</option>
                                        <option value="angular">Angular</option>
                                        <option value="css">CSS</option>
                                        <option value="design">Graphic Design</option>
                                        <option value="ember">Ember</option>
                                        <option value="html">HTML</option>
                                        <option value="ia">Information Architecture</option>
                                    </select>

                                    <input
                                        type="checkbox"
                                        id="home"
                                        style={{ marginTop: "20px", color: "#444444" }}
                                    />
                                    <label
                                        for="home"
                                        style={{ marginLeft: "12px", color: "#43425D" }}
                                    >
                                        Display as home
                                    </label>
                                    <br />
                                    <input
                                        type="checkbox"
                                        id="home"
                                        style={{ marginTop: "17px", color: "#444444" }}
                                    />
                                    <label
                                        for="home"
                                        style={{ marginLeft: "12px", color: "#43425D" }}
                                    >
                                        Restrict to Cast
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div className="row" style={{ marginTop: "30px" }}>
                                <div class="col-md-1">
                                    <label
                                        // style={{  marginRight: "200px" }}
                                        className="link"
                                    >
                                        Link
                                    </label>
                                </div>
                                <div class="col-md-11">
                                    <input
                                        type="radio"
                                        id="defaultChecked"
                                        checked
                                        autocomplete="on  "
                                    />
                                    <label className="radioText" for="defaultChecked">
                                        Content from editor below
                                    </label>
                                    <br />

                                    <input type="radio" id="defaultUnchecked" />
                                    <label className="radioText" for="defaultUnchecked">
                                        Link to website or doc
                                    </label>
                                    <br />

                                    <input type="radio" id="defaultUnchecked2" />
                                    <label className="radioText" for="defaultUnchecked2">
                                        Display Content from RSS
                                    </label>
                                    <br />

                                    <input
                                        type="radio"
                                        id="defaultUnchecked3"
                                    // name="defaultExampleRadios"
                                    />
                                    <label className="radioText" for="defaultUnchecked3">
                                        Allow people to send questions/comments via
                                    </label>
                                    <br />

                                    <input
                                        type="radio"
                                        id="defaultUnchecked4"
                                    // name="defaultExampleRadios"
                                    />
                                    <label className="radioText" for="defaultUnchecked4">
                                        Contained raw HTML entered in the text area below
                                    </label>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <label className="Pdesc">Web Page Details</label>
                        </div>
                        <div className="col-md-10" style={{ marginTop: "63.15px" }}>
                            <input
                                type="text"
                                placeholder="Page title"
                                style={{ display: "inline-block" }}
                            />
                            <div className="tooltip">
                                (?)
              <div
                                    className="tooltiptext"
                                    style={{
                                        zIndex: 2000
                                    }}
                                >
                                    help text
              </div>
                            </div>
                            <br />
                            <input
                                type="text"
                                placeholder="Page URL"
                                style={{ display: "inline-block" }}
                            />
                            <div className="tooltip">
                                (?)
              <div
                                    className="tooltiptext"
                                    style={{
                                        zIndex: 2000
                                    }}
                                >
                                    help text
              </div>
                            </div>
                            <input
                                type="text"
                                placeholder="Content"
                                style={{ height: "82px" }}
                            />
                            <input type="text" placeholder="Page in zone" />
                            <input type="text" placeholder="URL" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1.5">
                            <label className="Pdesc">Page Content</label>
                        </div>
                        <div className="col-md-10.5 boxClass" />
                    </div>
                    <div className=" mainBox" />
                    <div className="row">
                        <div className="col-md-2">
                            <label className="Pdesc">Navigation menu options</label>
                        </div>
                        <div className="col-md-10">
                            <input
                                type="checkbox"
                                style={{ marginRight: "13px", marginTop: "33px" }}
                                id="navmenu"
                            />
                            <label for="navmenu" style={{ color: "#43425D" }}>
                                Nav menu<span className="spanType">(show this in nav)</span>
                                <span className="tooltip">
                                    (?)<span className="tooltiptext">help text</span>
                                </span>
                            </label>
                            <br />
                            <label
                                style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    color: "#555555",
                                    marginTop: "27px",
                                    marginBottom: "17px"
                                }}
                            >
                                Parent page
            </label>
                            <br />
                            <input type="checkbox" id="none" />
                            <label for="none" className="inputCheck">
                                {" "}
                                none
            </label>
                            <br />
                            <input type="checkbox" id="none" />
                            <label for="none" className="inputCheck">
                                {" "}
                                Blog
            </label>
                            <br />
                            <input type="checkbox" id="none" />
                            <label for="none" className="inputCheck">
                                {" "}
                                Contact Us
            </label>
                            <br />
                            <input type="checkbox" id="none" />
                            <label for="none" className="inputCheck">
                                {" "}
                                Home
            </label>
                            <br />
                            <input type="checkbox" id="none" />
                            <label for="none" className="inputCheck">
                                {" "}
                                Shop
            </label>
                            <br />
                            <input type="checkbox" id="none" />
                            <label for="none" className="inputCheck">
                                {" "}
                                News
            </label>
                            <br />
                        </div>
                    </div>
                </Dashboard>
            </div>
        );
    }
}

export default CreatePage;
