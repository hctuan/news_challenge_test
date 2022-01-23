import React from "react";
import { createUseStyles } from "react-jss";

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

function Loading({ style }: Props) {
  const classes = useStyle();
  return (
    <div className={classes.loading} style={style}>
      Loading...
    </div>
  );
}

export default Loading;
