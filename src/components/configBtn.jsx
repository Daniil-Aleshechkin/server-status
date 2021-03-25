import React from "react";
import CIcon from "@coreui/icons-react";
import "./configBtn.css";

const ConfigBtns = () => {
  return (
    <div className="config-btns">
      <button className="btn btn-primary">Stop</button>
      <button className="btn btn-primary">Start</button>
      <button className="btn btn-primary">
        <CIcon name="cil-loop-circular" />
      </button>
    </div>
  );
};

export default ConfigBtns;
