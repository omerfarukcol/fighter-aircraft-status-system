import React from "react";
import "./Homepage.css";
import PlaneSvg from "../svgs/plane.svg";

const Angle = ({ angleData }) => {
  const angleStyle = {
    transform: `rotate(${angleData}deg)`,
    width: "400px",
    height: "400px",
  };

  return (
    <div className="angle">
      <img src={PlaneSvg} alt="plane" style={angleStyle} />
    </div>
  );
};

export default Angle;
