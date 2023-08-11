import React, { useState, useEffect } from "react";
import Speed from "./Speed";
import Angle from "./Angle";
import Battery from "./Battery";
import "./Homepage.css";

const WebSocketComponent = () => {
  const [ws, setWs] = useState(null);
  const [speed, setSpeed] = useState(0);
  const [arrowAngle, setArrowAngle] = useState(210);
  const [angle, setAngle] = useState(0);
  const [battery, setBattery] = useState(100);

  useEffect(() => {
    const newWs = new WebSocket("ws://localhost:5175");

    newWs.onopen = () => {
      console.log("WebSocket connection opened");
    };

    newWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(event.data);
      if (data.eventName === "PLANE_SPEED") {
        setSpeed(data.data.speed);
        setArrowAngle((data.data.speed * 3 + 210) % 360);
      } else if (data.eventName === "PLANE_ANGLE") {
        setAngle(data.data.angle);
      } else if (data.eventName === "PLANE_BATTERY") {
        setBattery(data.data.battery);
      } else {
        console.log("Received message is invalid.");
      }
    };

    newWs.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setWs(newWs);

    return () => {
      newWs.close();
    };
  }, []);

  const sendMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  };

  return (
    <div className="outer">
      <Angle angleData={angle} />
      <Battery batteryData={battery} />
      <button className="button-start" onClick={() => sendMessage("START")}>
        Start Broadcasting
      </button>
      <button className="button-stop" onClick={() => sendMessage("STOP")}>
        Stop Broadcasting
      </button>
      <Speed speed={speed} arrowAngle={arrowAngle} />
    </div>
  );
};

export default WebSocketComponent;
