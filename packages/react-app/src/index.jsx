import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
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

const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache(),
});

//|:::: Moralis ::::|
const appId = process.env.REACT_APP_MORALIS_APP_ID ?? "TOYUgAQy6p6Sx3uKprDKcRRjU7AXF7DFxdSNlR2y";
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL ?? " https://2tmlqxwkknpp.moralishost.com:2053/server";

ReactDOM.render(
  <MoralisProvider appId={appId} serverUrl={serverUrl}>
    <ApolloProvider client={client}>
      <ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme || "light"}>
        <App subgraphUri={subgraphUri} />
        <App />
      </ThemeSwitcherProvider>
    </ApolloProvider>
  </MoralisProvider>,
  document.getElementById("root"),
);
