import { createRoot } from "react-dom/client";
import "./index.css";
import Container from "./Container.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  // <Container styles="">
  <App />
  // </Container>
  // </StrictMode>,
);
