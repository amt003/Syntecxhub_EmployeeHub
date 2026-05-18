import React, { useEffect } from "react";

const Alert = ({ message, type = "success", duration = 5000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return <div className={`alert alert-${type}`}>{message}</div>;
};

export default Alert;
