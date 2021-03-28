import React from "react";
import CIcon from "@coreui/icons-react";
import "./configBtn.css";

const ConfigBtns = ({ permission, serverStatus, configBtnOperations }) => {
  function renderPermissions() {
    if (permission) {
      return (
        <React.Fragment>
          <button
            disabled={serverStatus !== "running"}
            onClick={configBtnOperations.onStop}
            className="btn btn-primary"
          >
            Stop
          </button>
          <button
            disabled={serverStatus !== "stopped"}
            onClick={configBtnOperations.onStart}
            className="btn btn-primary"
          >
            Start
          </button>
        </React.Fragment>
      );
    } else {
      return;
    }
  }

  return (
    <div className="config-btns">
      {renderPermissions()}
      <button
        onClick={configBtnOperations.onRefresh}
        className="btn btn-primary"
      >
        <CIcon name="cil-loop-circular" />
      </button>
    </div>
  );
};

export default ConfigBtns;
