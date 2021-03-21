import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import "./styles.scss";

const NotFound = ({ isShow, setIsShow }) => {
  useEffect(() => {
    setIsShow(true);
  }, [setIsShow]);

  return (
    <div className="notFound">
      <Helmet>
        <title>Stoque &mdash; 404 Error</title>
        <meta property="og:title" content="Stoque &mdash; 404 Error" />
        <meta property="og:type" content="website" />
        <meta name="description" content="" />
        <meta property="og:site_name" content="Stoque" />
      </Helmet>
      <div className="notFoundContainer">
        <div className="heading">
          <h4>ICON</h4>
        </div>
        <div className="body">
          <h3 className="404">404 Page not found</h3>
          <span className="ooops">
            Oopps. The page you were looking for doesn't exist.
          </span>
          <p className="suggestedReason">
            You may have mistyped the address or the page may have moved.
          </p>
          <div className="navigationButtons">
            <button className="btn">Back to home</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
