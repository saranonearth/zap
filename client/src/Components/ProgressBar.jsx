import React from "react";

const ProgressBar = (props) => {
  const parent = props;
  let values =
    parent.readings &&
    parent.readings.length &&
    parent.readings.map(function (item, i) {
      if (item.value > 0) {
        return (
          <div
            className="value"
            className="value"
            style={{ color: item.color, width: item.value + "%" }}
            key={i}
          >
            <span>{item.value}%</span>
          </div>
        );
      }
    });

  let calibrations =
    parent.readings &&
    parent.readings.length &&
    parent.readings.map(function (item, i) {
      if (item.value > 0) {
        return (
          <div
            className="graduation"
            style={{ color: item.color, width: item.value + "%" }}
            key={i}
          >
            <span>|</span>
          </div>
        );
      }
    });

  let bars =
    parent.readings &&
    parent.readings.length &&
    parent.readings.map(function (item, i) {
      if (item.value > 0) {
        return (
          <div
            className="bar"
            style={{ backgroundColor: item.color, width: item.value + "%" }}
            key={i}
          ></div>
        );
      }
    });

  let legends =
    parent.readings &&
    parent.readings.length &&
    parent.readings.map(function (item, i) {
      if (item.value > 0) {
        return (
          <div className="legend" key={i}>
            <span className="dot" style={{ color: item.color }}>
              ●
            </span>
            <span className="label">{item.name}</span>
          </div>
        );
      }
    });
  return (
    <div className="multicolor-bar">
      <div className="values">{values}</div>
      <div className="scale">{calibrations}</div>
      <div className="bars">{bars}</div>
      <div className="legends">{legends}</div>
    </div>
  );
};

export default ProgressBar;
