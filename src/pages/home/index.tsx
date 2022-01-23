import React from "react";
import { useQuery } from "react-query";
import moment from "moment";
import { createUseStyles } from "react-jss";

import Loading from "./../../components/loading";
import ErrorSection from "./../../components/errorSection";
import { IArticle } from "./../../utils/types";
import { noImageUrl } from "./../../utils/constants";
import ListViewSection from "./Listview";

const useStyle = createUseStyles({
  home: {
    padding: "0 32px",
  },
  homeGridSection: {
    maxWidth: 1024,
    margin: "auto",
  },
  homeGrid: {
    height: 400,
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    gap: 4,
  },
  gridItem: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "relative",
    "&.item-1": {
      gridArea: "1 / 1 / 3 / 3",
    },
    "&.item-2": {
      gridArea: "1 / 3 / 2 / 5",
    },
    "&.item-3": {
      gridArea: "2 / 3 / 3 / 4",
    },
    "&.item-4": {
      gridArea: "2 / 4 / 3 / 5",
    },
  },
  itemContent: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%",
    position: "absolute",
    bottom: 0,
    padding: 16,
    whiteSpace: "nowrap",
    background: "#00000080",
    backdropFilter: "blur(4px)",
    color: "white",
    boxSizing: "border-box",
  },
  itemLink: {
    textDecoration: "none",
    color: "white",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: 18,
    fontWeight: "bold",
  },
  author: {
    fontSize: 14,
    display: "flex",
    gap: 8,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  title: {
    textTransform: "uppercase",
    padding: "16px 0",
    color: "#1d5287",
    letterSpacing: 2,
  },
});

function Home() {
  const { isLoading, error, data } = useQuery("loadHome", () =>
    fetch(
      `https://newsapi.org/v2/top-headlines?apiKey=${process.env.REACT_APP_APIKEY}&category=general&page=1&pageSize=4`
    ).then((res) => res.json())
  );
  const classes = useStyle();

  if (isLoading) return <Loading style={{ height: "calc(100vh - 40px)" }} />;
  if (error || data.status === "error")
    return <ErrorSection reason={data.message || "unknown"} />;

  const articles = data.articles;

  return (
    <div className={classes.home}>
      <section className={classes.homeGridSection}>
        <div className={classes.title}>Top headlines</div>
        <div className={classes.homeGrid}>
          {articles.map((article: IArticle, index: number) => (
            <div
              key={`article-${index}`}
              className={`${classes.gridItem} item-${index}`}
              style={{
                backgroundImage: `url(${article.urlToImage || noImageUrl})`,
              }}
            >
              <div className={classes.itemContent}>
                <a className={classes.itemLink} href={article.url}>
                  {article.title}
                </a>
                <span className={classes.author}>
                  <span>{article.author}</span>
                  <span>{moment(article.publishedAt).format("ll")}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ListViewSection />
    </div>
  );
}

export default Home;
