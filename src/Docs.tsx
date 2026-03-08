import React, { useEffect, useState } from "react";

function getTheme(): "light" | "dark" {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

export default function Docs() {
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
          <span className="badge">Docs</span>
        </div>
        <div className="header-right">
          <a href="#/faq" className="btn btn-sm btn-ghost" style={{ textDecoration: "none", color: "inherit" }}>FAQ</a>
          <a href="#/privacy" className="btn btn-sm btn-ghost" style={{ textDecoration: "none", color: "inherit" }}>Privacy</a>
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
          <h1>How to use JSON Diff Visualizer</h1>
          <p className="docs-lead">
            JSON Diff Visualizer lets you compare two JSON documents and see
            exactly what changed—added, removed, or modified keys—in a
            side-by-side or unified view. All processing happens in your
            browser; nothing is uploaded.
          </p>

          <section>
            <h2>1. Enter your JSON</h2>
            <p>
              On the home page you’ll see two panels:
            </p>
            <ul>
              <li>
                <strong>Original JSON</strong> — Paste or type the first (e.g.
                older) JSON.
              </li>
              <li>
                <strong>Updated JSON</strong> — Paste or type the second (e.g.
                newer) JSON you want to compare against the original.
              </li>
            </ul>
            <p>
              Both panels accept valid JSON. If there’s a syntax error, the app
              will show a warning and you won’t be able to run the comparison
              until it’s fixed.
            </p>
          </section>

          <section>
            <h2>2. Format (optional)</h2>
            <p>
              Use the <strong>Format</strong> button above each editor to
              prettify the JSON (indent with 2 spaces). This can make large
              objects easier to read and diff.
            </p>
          </section>

          <section>
            <h2>3. Compare</h2>
            <p>
              Click <strong>Compare JSON →</strong> (or the <strong>Compare
              →</strong> button in the header) when both inputs are valid. The
              app will switch to the diff view and align keys so that changes
              are easy to spot.
            </p>
          </section>

          <section>
            <h2>4. View the diff</h2>
            <p>In the diff view you can switch between:</p>
            <ul>
              <li>
                <strong>⇔ Side-by-Side</strong> — Original on the left, updated
                on the right. Best for structured comparison.
              </li>
              <li>
                <strong>≡ Unified (Inline)</strong> — A single view with
                additions and removals shown in context.
              </li>
            </ul>
            <p>
              Added lines are highlighted in green, removed in red, and modified
              sections are clearly marked so you can see what changed at a
              glance.
            </p>
          </section>

          <section>
            <h2>Header actions</h2>
            <ul>
              <li>
                <strong>Sample</strong> — Loads example original and updated
                JSON so you can try the tool without pasting your own data.
              </li>
              <li>
                <strong>Clear</strong> — Clears both panels and returns you to
                the input view.
              </li>
              <li>
                <strong>Light / Dark</strong> — Toggles the editor and UI theme.
              </li>
              <li>
                <strong>← Edit</strong> — In diff view, returns to the input
                panels so you can change the JSON and compare again.
              </li>
            </ul>
          </section>

          <section>
            <h2>Privacy</h2>
            <p>
              Your JSON is never sent to any server. Parsing, comparison, and
              diff highlighting all run locally in your browser.
            </p>
          </section>

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
        <a href="#/faq" style={{ color: "var(--accent)", textDecoration: "none" }}>FAQ</a>
        {" · "}
        <a href="#/privacy" style={{ color: "var(--accent)", textDecoration: "none" }}>Privacy</a>
      </footer>
    </div>
  );
}
