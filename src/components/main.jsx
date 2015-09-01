/* global window */
import React from "react";
import {connect} from "react-redux";
import d3 from "d3";
import {back, forward, loadFiles} from "../actions";

const color = d3.scale.category20c();

const partition = d3.layout.partition()
  .sort(null)
  .value((d) => d.fileSize);

const arc = d3.svg.arc()
  .startAngle((d) => d.x)
  .endAngle((d) => d.x + d.dx)
  .innerRadius((d) => Math.sqrt(d.y))
  .outerRadius((d) => Math.sqrt(d.y + d.dy));

const getFilename = (d) => {
  if (d.title) {
    return d.title;
  }
  if (d.item) {
    return d.item.title;
  }
  return "ROOT";
};

@connect(({files}) => ({
  files: files.files
}))
class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      selectedFilename: ""
    };
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });
    });

    window.fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.props.dispatch(loadFiles(data));
      });
  }

  render() {
    const {width, height} = this.state;
    const radius = Math.min(width, height) / 2 * 0.95;
    partition.size([2 * Math.PI, radius * radius]);

    const paths = partition(this.props.files).map((d) => {
      return (
        <path
          key={d.item ? d.item.id : d.id}
          style={{
            cursor: "pointer"
          }}
          onMouseOver={this.handleMouseOver.bind(this, d)}
          onClick={this.handleClickPath.bind(this, d)}
          d={arc(d)}
          stroke="black"
          fill={color(d.ownerNames ? d.ownerNames[0] : (d.item ? d.item.ownerNames[0] : null))}/>
      );
    });
    return (
      <div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: `${width}px`,
          height: `${height - 10}px`
        }}>
          <svg width="100%" height="100%">
            <g transform={`translate(${width / 2},${height / 2})`}>
              {paths}
            </g>
          </svg>
        </div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0
        }}>
          <div>
            <button onClick={::this.handleClickBack}>Back</button>
          </div>
          <div>
            <p style={{color: "white"}}>{this.state.selectedFilename}</p>
          </div>
        </div>
      </div>
    );
  }

  handleMouseOver(d) {
    this.setState({
      selectedFilename: getFilename(d)
    });
  }

  handleClickPath(d) {
    this.props.dispatch(forward(d));
  }

  handleClickBack() {
    this.props.dispatch(back());
  }
}

export default Main;
