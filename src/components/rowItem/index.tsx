import React from "react";
import { IArticle } from "./../../utils/types";
import { noImageUrl } from "./../../utils/constants";
import { createUseStyles } from "react-jss";
import moment from "moment";

interface Props {
  article: IArticle;
}

const useStyle = createUseStyles({
  row: {
    gap: 8,
    height: 120,
    display: "flex",
    position: "relative",
    background: "white",
    cursor: "pointer",
    "&:hover": {
      background: "#1E528720",
    },
  },
  image: {
    width: 200,
    height: "100%",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    fontSize: 14,
  },
  title: {
    color: "#1E5287",
    fontSize: 20,
  },
  authorZone: {
    color: "gray",
    gap: 4,
    display: "flex",
  },
});

export default ({ article }: Props) => {
  const classes = useStyle();
  const onGotoArticlePage = (url: string) => (window.location.href = url);
  return (
    <div className={classes.row} onClick={() => onGotoArticlePage(article.url)}>
      <img
        className={classes.image}
        src={article.urlToImage || noImageUrl}
      ></img>
      <div className={classes.text}>
        <div className={classes.title}>{article.title}</div>
        <div>{(article.content || "").split("…")[0] + "..."}</div>
        <div className={classes.authorZone}>
          <span>{article.author}</span>
          <span style={{ color: "#158A8C" }}>
            {moment(article.publishedAt).format("ll")}
          </span>
        </div>
      </div>
    </div>
  );
};
