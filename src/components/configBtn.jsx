import React from "react";
import CIcon from "@coreui/icons-react";
import "./configBtn.css";

const ConfigBtns = ({ permission }) => {
  function renderPermissions() {
    if (permission) {
      return (
        <React.Fragment>
          <button className="btn btn-primary">Stop</button>
          <button className="btn btn-primary">Start</button>
        </React.Fragment>
      );
    } else {
      return;
    }
  }

  return (
    <div className="config-btns">
      {renderPermissions()}
      <button className="btn btn-primary">
        <CIcon name="cil-loop-circular" />
      </button>
    </div>
  );
};

export default ConfigBtns;
