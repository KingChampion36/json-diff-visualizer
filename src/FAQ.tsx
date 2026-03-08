import React, { useEffect, useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Is my JSON data sent to a server?",
    a: "No. All processing happens entirely in your browser. Your JSON is never uploaded, stored, or transmitted to any server. You can paste sensitive or confidential data without concern.",
  },
  {
    q: "Does JSON Diff Visualizer work offline?",
    a: "Yes. After the first load, the app runs in your browser. If you save the page for offline use or have a cached version, you can compare JSON without an internet connection.",
  },
  {
    q: "Is there a file size or length limit?",
    a: "There is no fixed limit imposed by the app. Practical limits depend on your device and browser memory. Very large documents (e.g. millions of lines) may slow down the editor or cause the browser to become unresponsive.",
  },
  {
    q: "What browsers are supported?",
    a: "JSON Diff Visualizer works in modern browsers that support JavaScript and the features used by the editor (e.g. Chrome, Firefox, Safari, Edge). We recommend using a recent version for the best experience.",
  },
  {
    q: "Is the tool free?",
    a: "Yes. JSON Diff Visualizer is free to use. There are no sign-ups, subscriptions, or paid features.",
  },
  {
    q: "Can I use it to compare API responses or config files?",
    a: "Yes. Paste the original response or config into the first panel and the updated version into the second, then click Compare. The side-by-side and unified views help you spot added, removed, and changed keys quickly.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      text: a,
    },
  })),
};

function getTheme(): "light" | "dark" {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

export default function FAQ() {
  const [theme, setTheme] = useState<"light" | "dark">(getTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(FAQ_JSON_LD);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
          <span className="badge">FAQ</span>
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
            href="#/privacy"
            className="btn btn-sm btn-ghost"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Privacy
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
          <h1>Frequently asked questions</h1>
          <p className="docs-lead">
            Common questions about JSON Diff Visualizer, privacy, and usage.
          </p>

          <dl className="faq-list">
            {FAQ_ITEMS.map(({ q, a }, i) => (
              <React.Fragment key={i}>
                <dt className="faq-q">{q}</dt>
                <dd className="faq-a">{a}</dd>
              </React.Fragment>
            ))}
          </dl>

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
        <a href="#/privacy" style={{ color: "var(--accent)", textDecoration: "none" }}>Privacy</a>
      </footer>
    </div>
  );
}
