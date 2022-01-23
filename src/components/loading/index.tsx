import React from "react";
import { createUseStyles } from "react-jss";
import classes from "*.module.css";

const useStyle = createUseStyles({
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

interface Props {
  style?: Object;
}

export default ({ style }: Props) => {
  const classes = useStyle();
  return (
    <div className={classes.loading} style={style}>
      Loading...
    </div>
  );
};
