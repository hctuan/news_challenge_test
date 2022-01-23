import React from "react";
import { createUseStyles } from "react-jss";
import classes from "*.module.css";

const useStyle = createUseStyles({
  loading: {
    height: "calc(100vh - 40px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default () => {
  const classes = useStyle();
  return <div className={classes.loading}>Loading...</div>;
};
