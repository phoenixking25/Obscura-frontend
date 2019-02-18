import React from 'react';
import { Bar } from 'react-chartjs-2';

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        scales: {
          xAxes: [{
            barPercentage: 0.1,
          }],
        },
      },
    };
    this.colors = ['#ff5b57', '#0ac38f', '#348fe2', '#9c72b6', '#f59c1a', '#99052c', '#4c66bf', '#49c7f3', '#ffcd56', '#55ed74'];
    this.labels = [];
    this.datasets = {};
    this.data = [];
    const { players } = this.props;
    if (players) {
      this.makeData(players);
    }
  }


  componentWillReceiveProps = (nextProps) => {
    this.makeData(nextProps.players);
  }

  makeData = (players) => {
    this.data = [];
    this.labels = [];
    players.map((d) => {
      this.labels.push(d.username);
      this.data.push(d.level_cleared);
    });
    this.datasets.data = this.data;
    this.datasets.label = 'Team contribution';
    this.datasets.backgroundColor = 'rgb(255, 99, 132)';
    this.datasets.borderColor = 'rgb(255, 99, 132)';
    this.state = {
      data: {
        labels: this.labels,
        datasets: [this.datasets],
      },
    };
  }

  render = () => {
    const { data, options } = this.state;
    if (this.data.length) {
      return (
        <div className="row">
          <div className="col s12">
            <div className="card z-index-4">

              <ul className="collapsible">
                <li>
                  <div className="collapsible-header grey darken-3 white-text">
                    <i className="material-icons">
                      insert_chart
                    </i>
                    Contributions
                  </div>
                </li>
              </ul>
              <Bar
                width={5}
                height={1}
                data={data}
                options={options}
              />
            </div>
          </div>
        </div>
      );
    }
    return <div />;
  }
}

export default BarChart;
