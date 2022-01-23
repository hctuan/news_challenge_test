import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useComboState } from "./../../hooks";
import Loading from "./../../components/loading";
import ErrorSection from "./../../components/errorSection";
import { IArticle } from "./../../utils/types";
import moment from "moment";
import { createUseStyles } from "react-jss";
import NewRow from "./../../components/rowItem";

const useStyle = createUseStyles({
  homeGridSection: {
    padding: 32,
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

  homeListSection: {
    padding: 32,
    maxWidth: 1024,
    margin: "auto",
  },
  homeList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
});

export default () => {
  const { isLoading, error, data } = useQuery("loadHome", () =>
    fetch(
      `https://newsapi.org/v2/top-headlines?apiKey=${process.env.REACT_APP_APIKEY}&country=us`
    ).then((res) => res.json())
  );
  const classes = useStyle();

  if (isLoading) return <Loading />;
  if (error) return <ErrorSection />;

  const allArticles = data.articles;
  const firstFourArticles = allArticles.slice(0, 4);
  const restArticles = allArticles.slice(4, allArticles.length);

  return (
    <div>
      <section className={classes.homeGridSection}>
        <div className={classes.homeGrid}>
          {firstFourArticles.map((article: IArticle, index: number) => (
            <div
              key={`article-${index}`}
              className={`${classes.gridItem} item-${index}`}
              style={{ backgroundImage: `url(${article.urlToImage})` }}
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
      <section className={classes.homeListSection}>
        <div className={classes.homeList}>
          {restArticles.map((article: IArticle, index: number) => (
            <NewRow key={`list-item-${index}`} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
};
