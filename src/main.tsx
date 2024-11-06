import { createRoot } from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store/configureStore";

createRoot(document.getElementById("root")!).render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
);
