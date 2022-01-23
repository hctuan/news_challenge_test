import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { ROUTERS } from "./../../utils/constants";

const useStyle = createUseStyles({
  header: {
    display: "flex",
    gap: 8,
    margin: 0,
    padding: "0 16px",
    position: "sticky",
    top: 0,
    background: "#D0F66A",
    boxShadow: "0px 1px 10px #1E528780",
    listStyleType: "none",
    "& li": {
      height: 40,
      lineHeight: "40px",
      padding: "0 8px",
      "& a": {
        textDecoration: "none",
        color: "#1E5287",
      },
      "&.selected": {
        background: "#1E5287",
        "& a": {
          color: "white",
        },
      },
      "&:hover": {
        background: "#1E5287",
        "& a": {
          color: "white",
        },
      },
    },
  },
});

export default () => {
  const classes = useStyle();
  const location = useLocation();

  const pathname = location.pathname;
  return (
    <ul className={classes.header}>
      {ROUTERS.map((e) => (
        <li key={e.link} className={`${pathname === e.link ? "selected" : ""}`}>
          <Link to={e.link}>{e.label}</Link>
        </li>
      ))}
    </ul>
  );
};
