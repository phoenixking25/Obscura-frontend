import React from 'react';
import { Line } from 'react-chartjs-2';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
    this.colors = ['#ff5b57', '#0ac38f', '#348fe2', '#9c72b6', '#f59c1a', '#99052c', '#4c66bf', '#49c7f3', '#ffcd56', '#55ed74'];
  }

  componentDidMount = () => {
    // const { data } = this.props;
  }

  componentWillReceiveProps = (nextProps) => {
    const dataSets = [];
    nextProps.data.map((d) => {
      const dataPoints = [];
      return dataSets.push({
        label: d.name,
        data: d.timeline.map(dp => dataPoints.push(dp.level_no)),
        fill: false,
        lineTension: 0.1,
        borderColor: this.colors[Math.floor((Math.random() * 9) + 1)],
      });
    });
    this.setState({
      data: dataSets,
    });
  }


render = () => (
  <div>
    <Line
      data={this.state.data}
      width={6}
      height={1}
    />
  </div>
)
}

export default LineChart;
