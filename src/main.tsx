import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Docs from "./Docs.tsx";
import FAQ from "./FAQ.tsx";
import Privacy from "./Privacy.tsx";

type Route = "home" | "docs" | "faq" | "privacy";

function getRoute(): Route {
  const hash = (window.location.hash || "").replace(/^#\/?/, "").toLowerCase();
  if (hash === "docs") return "docs";
  if (hash === "faq") return "faq";
  if (hash === "privacy") return "privacy";
  return "home";
}

function Root() {
  const [route, setRoute] = useState<Route>(getRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <StrictMode>
      {route === "docs" && <Docs />}
      {route === "faq" && <FAQ />}
      {route === "privacy" && <Privacy />}
      {route === "home" && <App />}
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);

