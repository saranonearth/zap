import React, { useEffect, useState } from "react";

const ProgressBar = (props) => {
  const { fileData } = props;
  const totalFiles = fileData.files.length;
  let fileTypeCount = { doc: 0, jpg: 0, pdf: 0, png: 0, ppt: 0 };
  const [readings, setReadings] = useState([
    {
      name: "doc",
      value: 0,
      color: "#4818a9",
    },
    {
      name: "jpg",
      value: 0,
      color: "#5e299a",
    },
    {
      name: "pdf",
      value: 0,
      color: "#6a4cb0",
    },
    {
      name: "png",
      value: 0,
      color: "#2264D1",
    },
    {
      name: "ppt",
      value: 0,
      color: "#133774",
    },
  ]);
  useEffect(() => {
    fileData.files.forEach((e, index) => {
      const fileName = e[4];
      if (fileName.endsWith("pdf")) {
        fileTypeCount["pdf"] += 1;
      } else if (fileName.endsWith("png")) {
        fileTypeCount["png"] += 1;
      } else if (fileName.endsWith("jpg") || fileName.endsWith("jpeg")) {
        fileTypeCount["jpg"] += 1;
      } else if (fileName.endsWith("ppt") || fileName.endsWith("pptx")) {
        fileTypeCount["ppt"] += 1;
      } else if (fileName.endsWith("doc") || fileName.endsWith("docx")) {
        fileTypeCount["doc"] += 1;
      }
    });
    let newReadings = [...readings];
    newReadings.forEach((e, index) => {
      const fileType = e.name;
      const numberOfFiles = fileTypeCount[fileType];
      e.value = parseInt((numberOfFiles / totalFiles) * 100);
    });
    setReadings(newReadings);
  }, [props]);

  let values =
    readings &&
    readings.length &&
    readings.map(function (item, i) {
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
    readings &&
    readings.length &&
    readings.map(function (item, i) {
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
    readings &&
    readings.length &&
    readings.map(function (item, i) {
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
    readings &&
    readings.length &&
    readings.map(function (item, i) {
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
