import React from "react";
import { useQuery } from "react-query";
import { useComboState } from "./../../hooks";
import Loading from "./../../components/loading";
import ErrorSection from "./../../components/errorSection";
import { IArticle, ISource } from "./../../utils/types";
import { createUseStyles } from "react-jss";
import NewRow from "./../../components/rowItem";

const useStyle = createUseStyles({
  homeListSection: {
    maxWidth: 1024,
    margin: "auto",
  },
  homeList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  homeListTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    textTransform: "uppercase",
    padding: "16px 0",
    color: "#1d5287",
    letterSpacing: 2,
  },

  searchZone: {
    display: "flex",
    gap: 8,
  },
  inputZone: {
    position: "relative",
    "& span": {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: 28,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  input: {
    outline: "none",
    padding: "0 24px 0 4px",
    height: 25,
    border: "1px solid #1d5287",
    borderRadius: 4,
  },
  selector: {
    height: 28,
  },
});

function ListView() {
  const [state, setState] = useComboState({
    form: {
      q: "",
      sources: "",
    },

    search: {
      q: "",
      sources: "",
    },
  });
  const { isLoading, error, data } = useQuery(
    ["loadList", state.search.sources, state.search.q],
    () =>
      fetch(
        `https://newsapi.org/v2/everything?` +
          `apiKey=${process.env.REACT_APP_APIKEY}` +
          `&q=${
            state.search.sources ? state.search.q : state.search.q || "news"
          }&sources=${state.search.sources}`
      ).then((res) => res.json())
  );
  const { data: sourcesData } = useQuery("loadSources", () =>
    fetch(
      `https://newsapi.org/v2/top-headlines/sources?apiKey=${process.env.REACT_APP_APIKEY}`
    ).then((res) => res.json())
  );
  const classes = useStyle();

  if (error) return <ErrorSection />;

  const articles = (data || {}).articles || [];

  const doSearch = () => {
    setState({ search: { ...state.form } });
  };

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    doSearch();
  };

  return (
    <section className={classes.homeListSection}>
      <div className={classes.homeListTop}>
        <div className={classes.title}>Others</div>
        <form className={classes.searchZone} onSubmit={onSearchSubmit}>
          <div className={classes.inputZone}>
            <input
              name="search"
              className={classes.input}
              onChange={(e) =>
                setState({ form: { ...state.form, q: e.target.value } })
              }
            ></input>
            <span>&#x1f50d;</span>
          </div>
          <div>
            <select
              className={classes.selector}
              onChange={(e) =>
                setState({
                  form: {
                    ...state.form,
                    sources: e.target.value,
                  },
                  search: { ...state.search, sources: e.target.value },
                })
              }
            >
              <option value="">All</option>
              {((sourcesData || {}).sources || []).map((source: ISource) => (
                <option key={source.id} value={source.id}>
                  {source.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className={classes.homeList}>
          {articles.map((article: IArticle, index: number) => (
            <NewRow key={`list-item-${index}`} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ListView;
