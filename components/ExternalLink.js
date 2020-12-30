import React from "react";

const ExternalLink = ({ children, withIcon, ...rest }) => {
  return (
    <a {...rest} target="_blank" rel="noopener noreferrer">
      {children} {withIcon && <i className="fa fa-external-link-alt" />}
    </a>
  );
};

export default ExternalLink;
