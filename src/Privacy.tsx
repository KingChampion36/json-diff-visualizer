import React, { useEffect, useState } from "react";

function getTheme(): "light" | "dark" {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

export default function Privacy() {
  const [theme, setTheme] = useState<"light" | "dark">(getTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const goHome = () => {
    window.location.hash = "";
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goHome();
            }}
            className="header-title"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            🔍 JSON Diff Visualizer
          </a>
          <span className="badge">Privacy</span>
        </div>
        <div className="header-right">
          <a
            href="#/docs"
            className="btn btn-sm btn-ghost"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Docs
          </a>
          <a
            href="#/faq"
            className="btn btn-sm btn-ghost"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            FAQ
          </a>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goHome();
            }}
            className="btn btn-sm btn-primary"
          >
            ← Back to app
          </a>
        </div>
      </header>

      <main className="main docs-main">
        <div className="docs-content">
          <h1>Privacy policy</h1>
          <p className="docs-lead">
            JSON Diff Visualizer is designed so your data never leaves your
            device. This page summarizes how the tool handles information.
          </p>

          <section>
            <h2>Data processed by the tool</h2>
            <p>
              When you paste or type JSON into the app, that data is processed
              only in your browser. Parsing, formatting, comparison, and diff
              highlighting are performed locally by JavaScript running on your
              machine. We do not receive, store, or transmit your JSON to any
              server.
            </p>
          </section>

          <section>
            <h2>No account or login</h2>
            <p>
              You do not need to create an account or log in to use JSON Diff
              Visualizer. We do not collect names, email addresses, or other
              identifying information through the tool itself.
            </p>
          </section>

          <section>
            <h2>Hosting and access</h2>
            <p>
              The website (HTML, CSS, JavaScript) may be served by a hosting
              provider. Accessing the site can involve standard technical data
              (e.g. IP address, browser type) that the host or your network may
              log according to their own policies. The actual JSON content you
              enter in the app is not sent to our or the host’s servers as part
              of normal use.
            </p>
          </section>

          <section>
            <h2>Cookies and local storage</h2>
            <p>
              The app may use browser local storage or session storage for
              preferences (e.g. theme). We do not use this storage to collect or
              send your JSON or other personal data to a server. Any such data
              remains on your device.
            </p>
          </section>

          <section>
            <h2>Changes to this policy</h2>
            <p>
              We may update this privacy policy from time to time. The current
              version will be available on this page. Continued use of the tool
              after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* <section>
            <h2>Contact</h2>
            <p>
              If you have questions about this privacy policy or how JSON Diff
              Visualizer handles data, you can open an issue or contact the
              project maintainers through the project’s repository or website.
            </p>
          </section> */}

          <p className="docs-back">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goHome();
              }}
              className="btn btn-primary"
            >
              ← Back to app
            </a>
          </p>
        </div>
      </main>

      <footer className="footer">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            goHome();
          }}
          style={{ color: "var(--accent)", textDecoration: "none" }}
        >
          JSON Diff Visualizer
        </a>
        {" · "}
        <a href="#/docs" style={{ color: "var(--accent)", textDecoration: "none" }}>Docs</a>
        {" · "}
        <a href="#/faq" style={{ color: "var(--accent)", textDecoration: "none" }}>FAQ</a>
      </footer>
    </div>
  );
}
