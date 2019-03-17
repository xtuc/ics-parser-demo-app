import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { App } from "./app.js";

(async function() {
  const rust = await import("../crate/pkg");
  const js = await import("./icalendar.js");
  const worker = await import("./worker.js");

  function AppRouter() {
    return (
      <Router>
        <div>
          <div id="nav">
            <Link to="/">js</Link>
            <Link to="/rust">rust</Link>
            <Link to="/rust-worker">rust-worker</Link>
          </div>

          <Route
            path="/"
            exact
            component={() => <App title="JavaScript" parse={js.parse} />}
          />
          <Route
            path="/rust"
            exact
            component={() => <App title="Rust" parse={rust.parse2} />}
          />
          <Route
            path="/rust-worker"
            exact
            component={() => <App title="Rust + Worker" parse={worker.parse} />}
          />
        </div>
      </Router>
    );
  }

  render(<AppRouter />, document.getElementById("root"));
})();
