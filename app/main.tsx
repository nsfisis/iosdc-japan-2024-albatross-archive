import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import "prismjs/themes/prism.min.css";
import "./tailwind.css";
import App from "./App";
import type { PageData } from "./pageData";

const root = document.getElementById("root");
const dataElement = document.getElementById("page-data");
if (!root || !dataElement?.textContent) {
  throw new Error("Prerendered page is broken");
}
const data = JSON.parse(dataElement.textContent) as PageData;

hydrateRoot(
  root,
  <StrictMode>
    <App data={data} />
  </StrictMode>,
);
