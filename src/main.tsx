import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./style.css"
import "./lib/i18n"

createRoot(document.getElementById("root")!).render(<App />)
