import React from "react";
import "./Homepage.css";
import ArrowSvg from "../svgs/speedometer-arrow.svg";
import CircleSvg from "../svgs/speedometer-circle.svg";

const Speed = ({ speed, arrowAngle }) => {
  const arrowStyle = {
    transform: `rotate(${arrowAngle}deg)`,
    transformOrigin: "center bottom",
    width: "120px",
    height: "120px",
    position: "absolute",
    bottom: "47%",
    left: "30%",
  };

  return (
    <div class="speed">
      <img className="circle" src={CircleSvg} alt="circle" />
      <img className="arrow" src={ArrowSvg} alt="arrow" style={arrowStyle} />
      <h2>
        {speed}
        <br />
        km/h
      </h2>
    </div>
  );
};
export default Speed;
