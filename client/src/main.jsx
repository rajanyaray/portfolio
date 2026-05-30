import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

// ── GLOBAL ERROR CATCHER OVERLAY (For debugging blank screen) ──
if (typeof window !== 'undefined') {
  const showErrorOverlay = (message, source, lineno, colno, error) => {
    const errorBox = document.createElement('div');
    errorBox.style.position = 'fixed';
    errorBox.style.top = '0';
    errorBox.style.left = '0';
    errorBox.style.width = '100vw';
    errorBox.style.height = '100vh';
    errorBox.style.backgroundColor = '#110c18';
    errorBox.style.color = '#ff6b6b';
    errorBox.style.padding = '40px';
    errorBox.style.boxSizing = 'border-box';
    errorBox.style.zIndex = '999999';
    errorBox.style.fontFamily = 'monospace';
    errorBox.style.overflowY = 'auto';

    errorBox.innerHTML = `
      <h1 style="color: #ff3333; margin-top: 0; border-bottom: 2px solid #ff3333; padding-bottom: 10px;">⚠️ PORTFOLIO RUNTIME ERROR</h1>
      <p style="font-size: 18px; font-weight: bold; color: #f0eeff;">${message}</p>
      <p style="color: #9e9aab;"><strong>File:</strong> ${source} (Line ${lineno}:${colno})</p>
      <pre style="background: rgba(0,0,0,0.5); padding: 20px; border-radius: 8px; border: 1px dashed rgba(255,255,255,0.1); white-space: pre-wrap; font-size: 14px; color: #d0cdeb;">${error && error.stack ? error.stack : 'No stack trace available'}</pre>
      <button onclick="window.location.reload(true)" style="background: #ed782a; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; cursor: pointer; margin-top: 20px; font-weight: bold;">Reload Page</button>
    `;
    document.body.appendChild(errorBox);
  };

  window.onerror = function (message, source, lineno, colno, error) {
    showErrorOverlay(message, source, lineno, colno, error);
    return false;
  };

  window.addEventListener('unhandledrejection', function (event) {
    showErrorOverlay(
      event.reason && event.reason.message ? event.reason.message : 'Unhandled Promise Rejection',
      'Promise Rejection',
      0,
      0,
      event.reason
    );
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);