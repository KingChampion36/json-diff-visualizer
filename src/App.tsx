import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Editor, DiffEditor } from "@monaco-editor/react";
import { alignJsonKeyOrder, safeParseJson } from "./utils";

// ─── Sample data ─────────────────────────────────────────────────────────────

const SAMPLE_ORIGINAL = JSON.stringify(
  {
    name: "Alice",
    age: 30,
    email: "alice@example.com",
    address: {
      street: "123 Main St",
      city: "Springfield",
      zip: "12345",
    },
    roles: ["admin", "editor"],
    active: true,
  },
  null,
  2
);

const SAMPLE_UPDATED = JSON.stringify(
  {
    name: "Alice",
    age: 31,
    email: "alice@newdomain.com",
    address: {
      street: "123 Main St",
      city: "Shelbyville",
      zip: "12345",
      country: "USA",
    },
    roles: ["admin", "editor", "viewer"],
    active: true,
    createdAt: "2024-01-01",
  },
  null,
  2
);

// ─── Types ───────────────────────────────────────────────────────────────────

type ViewMode = "input" | "diff";
type DiffTab = "split" | "unified";
type Theme = "light" | "dark";

// ─── JsonInputPanel ──────────────────────────────────────────────────────────

interface JsonInputPanelProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error: string | null;
  monacoTheme: string;
  onFormat: () => void;
  statusText: string;
  isValid: boolean;
}

const JsonInputPanel: React.FC<JsonInputPanelProps> = ({
  label,
  value,
  onChange,
  error,
  monacoTheme,
  onFormat,
  statusText,
  isValid,
}) => (
  <div className="panel">
    <div className="panel-header">
      <span className="panel-label">{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {isValid && <span className="panel-status-ok">✓ Valid JSON</span>}
        {statusText && !isValid && <span className="panel-hint">{statusText}</span>}
        <button
          className="btn btn-xs btn-ghost"
          disabled={!!error || !value.trim()}
          onClick={onFormat}
          title="Prettify / Format JSON"
        >
          Format
        </button>
      </div>
    </div>
    <div className={`editor-wrap${error ? " error" : ""}`}>
      <Editor
        height="100%"
        language="json"
        theme={monacoTheme}
        value={value}
        onChange={(v) => onChange(v ?? "")}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "off",
          scrollbar: { horizontal: "visible" },
          lineNumbers: "on",
        }}
      />
    </div>
    {error && <div className="error-msg">⚠ {error}</div>}
  </div>
);

// ─── DiffView ────────────────────────────────────────────────────────────────

interface DiffViewProps {
  oldJson: string;
  newJson: string;
  monacoTheme: string;
}

const DiffView: React.FC<DiffViewProps> = ({ oldJson, newJson, monacoTheme }) => {
  const [activeTab, setActiveTab] = useState<DiffTab>("split");

  return (
    <div className="diff-view">
      <div className="tab-bar">
        <button
          className={`tab${activeTab === "split" ? " active" : ""}`}
          onClick={() => setActiveTab("split")}
        >
          ⇔ Side-by-Side
        </button>
        <button
          className={`tab${activeTab === "unified" ? " active" : ""}`}
          onClick={() => setActiveTab("unified")}
        >
          ≡ Unified (Inline)
        </button>
      </div>

      <div className={`tab-panel${activeTab === "split" ? " active" : ""}`}>
        <div className="diff-editor-wrap">
          <DiffEditor
            key={`split-${oldJson.length}-${newJson.length}`}
            height="100%"
            language="json"
            original={oldJson}
            modified={newJson}
            theme={monacoTheme}
            options={{
              readOnly: true,
              renderSideBySide: true,
              minimap: { enabled: false },
              fontSize: 13,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: "off",
              scrollbar: { horizontal: "visible" },
            }}
          />
        </div>
      </div>

      <div className={`tab-panel${activeTab === "unified" ? " active" : ""}`}>
        <div className="diff-editor-wrap">
          <DiffEditor
            key={`unified-${oldJson.length}-${newJson.length}`}
            height="100%"
            language="json"
            original={oldJson}
            modified={newJson}
            theme={monacoTheme}
            options={{
              readOnly: true,
              renderSideBySide: false,
              minimap: { enabled: false },
              fontSize: 13,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: "off",
              scrollbar: { horizontal: "visible" },
            }}
          />
        </div>
      </div>
    </div>
  );
};

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [viewMode, setViewMode] = useState<ViewMode>("input");
  const [originalText, setOriginalText] = useState(SAMPLE_ORIGINAL);
  const [updatedText, setUpdatedText] = useState(SAMPLE_UPDATED);

  const monacoTheme = theme === "dark" ? "vs-dark" : "vs";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const originalParsed = useMemo(() => safeParseJson(originalText), [originalText]);
  const updatedParsed = useMemo(() => safeParseJson(updatedText), [updatedText]);

  const canCompare =
    originalText.trim() !== "" &&
    updatedText.trim() !== "" &&
    !originalParsed.error &&
    !updatedParsed.error;

  const oldJson = useMemo(() => {
    if (!originalParsed.value) return "";
    return JSON.stringify(originalParsed.value, null, 2);
  }, [originalParsed.value]);

  const newJson = useMemo(() => {
    if (!updatedParsed.value) return "";
    const aligned = alignJsonKeyOrder(updatedParsed.value, originalParsed.value);
    return JSON.stringify(aligned, null, 2);
  }, [updatedParsed.value, originalParsed.value]);

  const handleCompare = useCallback(() => {
    if (canCompare) setViewMode("diff");
  }, [canCompare]);

  const handleReset = useCallback(() => {
    setOriginalText("");
    setUpdatedText("");
    setViewMode("input");
  }, []);

  const handleLoadSample = useCallback(() => {
    setOriginalText(SAMPLE_ORIGINAL);
    setUpdatedText(SAMPLE_UPDATED);
    setViewMode("input");
  }, []);

  const handleFormatOriginal = useCallback(() => {
    if (!originalParsed.error && originalParsed.value) {
      setOriginalText(JSON.stringify(originalParsed.value, null, 2));
    }
  }, [originalParsed]);

  const handleFormatUpdated = useCallback(() => {
    if (!updatedParsed.error && updatedParsed.value) {
      setUpdatedText(JSON.stringify(updatedParsed.value, null, 2));
    }
  }, [updatedParsed]);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <span className="header-title">🔍 JSON Diff Visualizer</span>
          {viewMode === "diff" && <span className="badge">Diff View</span>}
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
          <a
            href="#/privacy"
            className="btn btn-sm btn-ghost"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Privacy
          </a>
          <button className="btn btn-sm btn-ghost" onClick={handleLoadSample}>
            Sample
          </button>
          <button className="btn btn-sm btn-danger-ghost" onClick={handleReset}>
            Clear
          </button>
          <div className="divider" />
          <button className="btn btn-sm btn-outline" onClick={() => setTheme(t => t === "light" ? "dark" : "light")}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          {viewMode === "diff" ? (
            <button className="btn btn-sm btn-outline" onClick={() => setViewMode("input")}>
              ← Edit
            </button>
          ) : (
            <button
              className="btn btn-sm btn-primary"
              disabled={!canCompare}
              onClick={handleCompare}
            >
              Compare →
            </button>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="main">
        {viewMode === "input" ? (
          <>
            <div className="input-grid">
              <JsonInputPanel
                label="Original JSON"
                value={originalText}
                onChange={setOriginalText}
                error={originalParsed.error}
                monacoTheme={monacoTheme}
                onFormat={handleFormatOriginal}
                isValid={!!originalParsed.value && !originalParsed.error}
                statusText={!originalText.trim() ? "Paste your original JSON here" : ""}
              />
              <JsonInputPanel
                label="Updated JSON"
                value={updatedText}
                onChange={setUpdatedText}
                error={updatedParsed.error}
                monacoTheme={monacoTheme}
                onFormat={handleFormatUpdated}
                isValid={!!updatedParsed.value && !updatedParsed.error}
                statusText={!updatedText.trim() ? "Paste your updated JSON here" : ""}
              />
            </div>
            <div className="compare-bar">
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                {!canCompare && originalText.trim() && updatedText.trim()
                  ? "Fix JSON errors above before comparing"
                  : ""}
              </span>
              <button
                className="btn btn-lg btn-primary"
                disabled={!canCompare}
                onClick={handleCompare}
              >
                Compare JSON →
              </button>
            </div>
          </>
        ) : (
          <DiffView oldJson={oldJson} newJson={newJson} monacoTheme={monacoTheme} />
        )}
      </main>

      <footer className="footer">
        <a href="#/docs" style={{ color: "var(--accent)", textDecoration: "none" }}>Docs</a>
        {" · "}
        <a href="#/faq" style={{ color: "var(--accent)", textDecoration: "none" }}>FAQ</a>
        {" · "}
        <a href="#/privacy" style={{ color: "var(--accent)", textDecoration: "none" }}>Privacy</a>
        {" · "}
        Compare &amp; visualize JSON side-by-side or unified
      </footer>
    </div>
  );
}

