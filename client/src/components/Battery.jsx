import React, { useState, useEffect } from "react";
import "./Homepage.css";
import BatterySvg from "../svgs/battery.svg";

const Battery = ({ batteryData }) => {
  const [flashing, setFlashing] = useState(false);
  const [batteryColor, setBatteryColor] = useState("#7CFC00");
  const [rec1Height, setRec1Height] = useState(55);
  const [rec2Height, setRec2Height] = useState(55);
  const [rec3Height, setRec3Height] = useState(55);
  const [rec4Height, setRec4Height] = useState(55);

  useEffect(() => {
    if (batteryData < 20) {
      setFlashing(true);
    } else {
      setFlashing(false);
    }
    if (batteryData <= 25) {
      setBatteryColor("red");
      setRec4Height(0);
      setRec3Height(0);
      setRec2Height(0);
      setRec1Height(batteryData * 2.2);
    }
    if (batteryData > 25 && batteryData <= 50) {
      setBatteryColor("yellow");
      setRec4Height(0);
      setRec3Height(0);
      setRec2Height((batteryData - 25) * 2.2);
      setRec1Height(55);
    }
    if (batteryData > 50 && batteryData < 75) {
      setBatteryColor("green");
      setRec4Height(0);
      setRec3Height((batteryData - 50) * 2.2);
      setRec2Height(55);
      setRec1Height(55);
    }
    if (batteryData >= 75) {
      setBatteryColor("green");
      setRec4Height((batteryData - 75) * 2.2);
      setRec3Height(55);
      setRec2Height(55);
      setRec1Height(55);
    }
  }, [batteryData]);

  const batteryStyle = {
    width: "300px",
    height: "300px",
    opacity: flashing ? "0" : "1",
    transition: flashing ? "opacity 0.5s ease-in-out" : "none",
    position: "relative",
  };

  const rec1 = {
    width: "110px",
    height: rec1Height,
    backgroundColor: batteryColor,
    marginLeft: "95px",
    bottom: "25px",
    opacity: flashing ? "0" : "1",
    transition: flashing ? "opacity 0.5s ease-in-out" : "none",
    position: "absolute",
  };

  const rec2 = {
    width: "110px",
    height: rec2Height,
    backgroundColor: batteryColor,
    marginLeft: "95px",
    bottom: "85px",
    opacity: flashing ? "0" : "1",
    transition: flashing ? "opacity 0.5s ease-in-out" : "none",
    position: "absolute",
  };

  const rec3 = {
    width: "110px",
    height: rec3Height,
    backgroundColor: batteryColor,
    marginLeft: "95px",
    bottom: "145px",
    opacity: flashing ? "0" : "1",
    transition: flashing ? "opacity 0.5s ease-in-out" : "none",
    position: "absolute",
    transform: "rotate(180deg)",
  };

  const rec4 = {
    width: "110px",
    height: rec4Height,
    backgroundColor: batteryColor,
    marginLeft: "95px",
    bottom: "205px",
    opacity: flashing ? "0" : "1",
    transition: flashing ? "opacity 0.5s ease-in-out" : "none",
    position: "absolute",
  };

  const rectangles = {
    position: "relative",
  };

  return (
    <div className={`battery ${flashing ? "flashing" : ""}`}>
      <img src={BatterySvg} alt="battery" style={batteryStyle} />
      <div style={rectangles}>
        <div style={rec1} className={`${flashing ? "flashing" : ""}`} />
        <div style={rec2} className={`${flashing ? "flashing" : ""}`} />
        <div style={rec3} className={`${flashing ? "flashing" : ""}`} />
        <div style={rec4} className={`${flashing ? "flashing" : ""}`} />
      </div>
      <h3>%{batteryData}</h3>
    </div>
  );
};

export default Battery;
