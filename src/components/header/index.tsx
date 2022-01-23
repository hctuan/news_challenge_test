import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { ROUTERS } from "./../../utils/constants";

const useStyle = createUseStyles({
  header: {
    gap: 8,
    top: 0,
    display: "flex",
    padding: "0 16px",
    position: "sticky",
    background: "white",
    boxShadow: "0px 1px 20px #1e528780",
    zIndex: 2,
  },
  appTitle: {
    lineHeight: "60px",
    fontSize: 32,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 8,
    color: "#1E5287",
  },
  menu: {
    display: "flex",
    gap: 8,
    margin: 0,
    padding: 0,
    listStyleType: "none",
    "& li": {
      height: 60,
      lineHeight: "60px",
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
    <div className={classes.header}>
      <span className={classes.appTitle}>NEWS</span>
      <ul className={classes.menu}>
        {ROUTERS.map((e) => (
          <li
            key={e.link}
            className={`${pathname === e.link ? "selected" : ""}`}
          >
            <Link to={e.link}>{e.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
