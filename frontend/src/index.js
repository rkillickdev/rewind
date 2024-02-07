import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { AlertProvider } from "./contexts/AlertContext";
import { ProfileDataProvider } from "./contexts/ProfileDataContext";
import { OptionsProvider } from "./contexts/OptionsContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/Error";

ReactDOM.render(
  <Router>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => (location.href = "/")}
    >
      <CurrentUserProvider>
        <ProfileDataProvider>
          <OptionsProvider>
            <AlertProvider>
              <App />
            </AlertProvider>
          </OptionsProvider>
        </ProfileDataProvider>
      </CurrentUserProvider>
    </ErrorBoundary>
  </Router>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
