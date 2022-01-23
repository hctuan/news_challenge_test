import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useComboState } from "./../../hooks";
import Loading from "./../../components/loading";
import ErrorSection from "./../../components/errorSection";
import { IArticle } from "./../../utils/types";
import moment from "moment";
import { createUseStyles } from "react-jss";
import NewRow from "./../../components/rowItem";
import { useLocation } from "react-router-dom";

const useStyle = createUseStyles({
  category: {
    padding: "0 32px",
  },
  list: {
    padding: "32px 0",
    maxWidth: 1024,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
});

export default () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { isLoading, error, data } = useQuery(["loadCatelory", pathname], () =>
    fetch(
      `https://newsapi.org/v2/top-headlines?apiKey=${
        process.env.REACT_APP_APIKEY
      }&category=${pathname.replaceAll("/", "")}`
    ).then((res) => res.json())
  );
  const classes = useStyle();

  if (isLoading) return <Loading style={{ height: "calc(100vh - 40px)" }} />;
  if (error) return <ErrorSection />;

  const articles = data.articles;
  return (
    <div className={classes.category}>
      <div className={classes.list}>
        {articles.map((article: IArticle, index: number) => (
          <NewRow key={`list-item-${index}`} article={article} />
        ))}
      </div>
    </div>
  );
};
