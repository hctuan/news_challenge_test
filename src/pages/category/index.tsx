import React from "react";
import { useQuery } from "react-query";
import Loading from "./../../components/loading";
import ErrorSection from "./../../components/errorSection";
import { IArticle } from "./../../utils/types";
import { createUseStyles } from "react-jss";
import NewRow from "./../../components/rowItem";
import { useLocation } from "react-router-dom";

const useStyle = createUseStyles({
  category: {
    padding: "0 32px",
    maxWidth: 1024,
    margin: "auto",
  },
  list: {
    padding: "32px 0",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  title: {
    textTransform: "uppercase",
    padding: "16px 0",
    color: "#1d5287",
    letterSpacing: 2,
  },
});

function Category() {
  const location = useLocation();
  const pathname = location.pathname.replaceAll("/", "");
  const { isLoading, error, data } = useQuery(["loadCategory", pathname], () =>
    fetch(
      `https://newsapi.org/v2/top-headlines?apiKey=${process.env.REACT_APP_APIKEY}&category=${pathname}`
    ).then((res) => res.json())
  );
  const classes = useStyle();

  if (isLoading) return <Loading style={{ height: "calc(100vh - 40px)" }} />;
  if (error || data.status === "error")
    return <ErrorSection reason={data.message || "unknown"} />;

  const articles = data.articles;
  return (
    <div className={classes.category}>
      <div className={classes.title}>{pathname}</div>
      <div className={classes.list}>
        {articles.map((article: IArticle, index: number) => (
          <NewRow key={`list-item-${index}`} article={article} />
        ))}
      </div>
    </div>
  );
}

export default Category;
