import React, { Component } from "react";
import MediaQuery from "react-responsive";
import axios from "axios";
import Content from "./Content.js";
import MapView from "./MapView.js";
import "./App.css";

class App extends Component {
  state = { offices: [], view: "list", content: 0, responsive: 0 };

  async componentDidMount() {
    const { data } = await axios.get(
      "https://itk-exam-api.herokuapp.com/api/offices"
    );
    this.setState({ offices: data });
  }

  updateView = (view, content) => {
    this.setState({ view, content });
  };

  setResponsive = () => {
    this.setState(prevState => {
      const responsive = prevState.responsive ? 0 : 1;
      return { responsive };
    });
  };

  render() {
    const { offices, view, content, responsive } = this.state;
    return (
      <div className="App">
        <header className="header">
          <h1>
            <a className="logo" href="/">
              Offices
            </a>
          </h1>
          <div className={`select-view${responsive ? " responsive" : ""}`}>
            <button type="button" onClick={() => this.updateView("list", 0)}>
              List
            </button>
            <button type="button" onClick={() => this.updateView("grid", 0)}>
              Grid
            </button>
            <button type="button" onClick={() => this.updateView("map", 1)}>
              Map
            </button>
          </div>
          <button className="mobile-menu" onClick={() => this.setResponsive()}>
            &#8801;
          </button>
        </header>
        <main>
          <section className={`content ${view}`}>
            {
              [
                <Content offices={offices} />,
                <div>
                  <MediaQuery maxWidth={900}>
                    <MapView offices={offices} zoom={1} />
                  </MediaQuery>
                  <MediaQuery minWidth={901}>
                    <MapView offices={offices} zoom={2} />
                  </MediaQuery>
                  <MediaQuery minWidth={1701}>
                    <MapView offices={offices} zoom={3} />
                  </MediaQuery>
                </div>
              ][content]
            }
          </section>
        </main>
      </div>
    );
  }
}

export default App;
