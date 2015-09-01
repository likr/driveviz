/* global document */
import "whatwg-fetch";
import React from "react";
import {createStore} from "redux";
import {Provider} from "react-redux";
import Main from "./components/main";
import reducer from "./reducers";

const store = createStore(reducer);

React.render(
  <Provider store={store}>
    {() => <Main/>}
  </Provider>,
  document.getElementById("content")
);
