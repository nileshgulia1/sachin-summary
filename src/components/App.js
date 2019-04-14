import React, { Component } from "react";
import config from "./config";
import Dropdown from "react-dropdown";
import UserImg from "../assets/images/25.jpg";
import styled from "styled-components";
import Linechart from "./LineChart";
import PieCharts from "./VictoryChart";
const Container = styled.div``;

const Nav = styled.nav``;
let Runteam = 0;

const url = `https://sheets.googleapis.com/v4/spreadsheets/${
  config.spreadsheetId
}/values:batchGet?ranges=sachin&majorDimension=ROWS&key=${config.apiKey}`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      dropdownOptions: [],
      selectedValue: null,
      Runteam: null,
      count: null,
      lostcount: null,
      totalRuns: null,
      catches: null,
      wickets: null,
      grounds: [],
      runs: []
    };
  }

  getData = arg => {
    // google sheets data
    const arr = this.state.items;
    const arrLen = arr.length;

    let count = 0;

    let lostcount = 0;

    let totalRuns = 0;

    let catches = 0;

    let wickets = 0;

    let runs = [];

    let grounds = new Set();

    let selectedValue = null;

    for (let i = 0; i < arrLen; i++) {
      if (arg === arr[i]["opposition"]) {
        this.RunsInTeam(arr[i]);
        if (arr[i]["match_result"] === "won") {
          count++;
        }
        if (arr[i]["match_result"] === "lost") {
          lostcount++;
        }

        catches += parseInt(arr[i].catches, 10);

        if (arr[i].wickets !== "-") wickets += parseInt(arr[i].wickets, 10);

        grounds.add(arr[i].ground);

        runs.push({
          name: `Match${i + 1}`,
          runs: arr[i].batting_score
        });
      }
      if (arr[i].batting_score !== "DNB" && arr[i].batting_score !== "TDNB") {
        totalRuns += parseInt(arr[i].batting_score, 10);
      }
    }

    selectedValue = arg;

    // setting state
    this.setState({
      Runteam: Runteam,
      count: count,
      lostcount: lostcount,
      totalRuns: totalRuns,
      catches: catches,
      selectedValue: selectedValue,
      wickets: wickets,
      grounds: grounds,
      runs: runs
    });
  };

  updateDashboard = event => {
    this.getData(event.value);
    this.setState({ selectedValue: event.value });
  };

  RunsInTeam = data => {
    if (data.batting_score !== "DNB" && data.batting_score !== "TDNB") {
      Runteam += parseInt(data.batting_score, 10);
    }
  };

  componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let RowValues = data.valueRanges[0].values;

        const rows = [];
        for (let i = 1; i < RowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < RowValues[i].length; j++) {
            rowObject[RowValues[0][j]] = RowValues[i][j];
          }
          rows.push(rowObject);
        }

        // dropdown options
        let dropdownOptions = [];

        for (let i = 0; i < rows.length; i++) {
          dropdownOptions.push(rows[i].opposition);
        }

        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();

        this.setState(
          {
            items: rows,
            dropdownOptions: dropdownOptions,
            selectedValue: "v Ireland"
          },
          () => this.getData("v Ireland")
        );
      });
  }

  render() {
    return (
      <Container>
        {/* static navbar - top */}
        <Nav className="navbar navbar-expand-lg fixed-top is-white is-dark-text">
          <Container className="navbar-brand h1 mb-0 text-large font-medium">
            Sachin Tendulkar Highlights
          </Container>
          <Container className="navbar-nav ml-auto">
            <Container className="user-detail-section">
              <span className="pr-2">Sachin</span>
              <span className="img-container">
                <img src={UserImg} className="rounded-circle" alt="user" />
              </span>
            </Container>
          </Container>
        </Nav>

        {/* static navbar - bottom */}
        <Nav className="navbar fixed-top nav-secondary is-dark is-light-text">
          <Container className="text-medium">Summary</Container>
          <Container className="navbar-nav ml-auto">
            <Dropdown
              className="pr-2 custom-dropdown"
              options={this.state.dropdownOptions}
              onChange={this.updateDashboard}
              value={this.state.selectedValue}
              placeholder="Select an option"
            />
          </Container>
        </Nav>

        {/* content area start */}
        <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
          {/* row 1 - revenue */}
          <Container className="row">
            <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Total Runs
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-x-large">
                  {this.state.totalRuns}
                </Container>
              </Container>
            </Container>

            <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Runs {this.state.selectedValue}
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-x-large">
                  {this.state.Runteam}
                </Container>
              </Container>
            </Container>

            <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Number of Matches Won
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-x-large">
                  {this.state.count}
                </Container>
              </Container>
            </Container>

            <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Number of Matches Lost
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-x-large">
                  {this.state.lostcount}
                </Container>
              </Container>
            </Container>
          </Container>

          {/* row 2 - conversion */}
          <Container className="row">
            <Container className="col-md-4 col-lg-3 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading mb-3">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Catches
                  </Container>
                </Container>
                <Container className="card-value pt-4 text-x-large">
                  {this.state.catches}
                </Container>
              </Container>
            </Container>
            <Container className="col-md-4 col-lg-3 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading mb-3">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Wickets
                  </Container>
                </Container>
                <Container className="card-value pt-4 text-x-large">
                  {this.state.wickets}
                </Container>
              </Container>
            </Container>
            <Container className="col-md-4 col-lg-3 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading mb-3">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Ground Names
                  </Container>
                </Container>
                <Container className="is-dark-text-dark pt-4 text-x-small">
                  {Array.from(this.state.grounds).map(item => (
                    <p>{item}</p>
                  ))}
                </Container>
              </Container>
            </Container>
            <PieCharts
              count={this.state.count}
              lostcount={this.state.lostcount}
            />
          </Container>
          <Container>
            <Linechart
              data={this.state.runs}
              value={this.state.selectedValue}
            />
          </Container>
        </Container>
        {/* content area end */}
      </Container>
    );
  }
}

export default App;
