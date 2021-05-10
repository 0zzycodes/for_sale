import React, { useState } from "react";
import CustomPopUp from "../../common/CustomPopUp/CustomPopUp";
import Spinner from "../../common/Spinner/Spinner";

import "./styles.scss";

const ScanCode = () => {
  const [errorMessage] = useState("");
  const [isLoading] = useState(true);

  return (
    <div className="scan-code">
      <div>
        <h3 className="title">Scan Product</h3>
        {errorMessage !== "" ? (
          <CustomPopUp
            message={`${errorMessage}`}
            type={"error"}
            customStyles={{ backgroundColor: "red" }}
            customTextStyles={{ color: "#ffffff", textAlign: "center" }}
          />
        ) : null}
        {isLoading && <Spinner style={{ height: "7em" }} />}
      </div>
    </div>
  );
};
export default ScanCode;
