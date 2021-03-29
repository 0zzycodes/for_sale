import React from "react";
import { Ionicons } from "react-web-vector-icons";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { colors } from "../../../constants/Colors";

import "./styles.scss";

const NotFound = () => {
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
        <div className="flex-center heading">
          <Ionicons name="md-warning" size={70} color={colors.white} />
        </div>
        <div className="body">
          <h3 className="404">404 Page not found</h3>
          <span className="ooops">
            Oopps. The page you were looking for doesn't exist.
          </span>
          <p className="suggestedReason">
            You may have mistyped the address or the page might have been moved.
          </p>
          <div className="navigationButtons">
            <Link to="/">
              <button className="btn">Back to home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
