// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { MoralisProvider } from "react-moralis";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const prevTheme = window.localStorage.getItem("theme");

// const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";

// const client = new ApolloClient({
//   uri: subgraphUri,
//   cache: new InMemoryCache(),
// });

const appId = process.env.REACT_APP_MORALIS_APP_ID ?? "";
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL ?? "";

ReactDOM.render(
  // <ApolloProvider client={client}>
  <MoralisProvider appId={appId} serverUrl={serverUrl}>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme || "light"}>
      {/* <App subgraphUri={subgraphUri} /> */}
      <App />
    </ThemeSwitcherProvider>
  </MoralisProvider>,
  // </ApolloProvider>,
  document.getElementById("root"),
);
