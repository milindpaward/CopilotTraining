# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # OctoFit Tracker Frontend

  ## Environment Setup

  Define `VITE_CODESPACE_NAME` in `.env.local` when running in GitHub Codespaces:

  ```env
  VITE_CODESPACE_NAME=your-codespace-name
  ```

  The app builds API URLs like:

  `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`

  If `VITE_CODESPACE_NAME` is missing, the app safely falls back to:

  `http://localhost:8000/api/[component]/`

  This avoids broken URLs like `https://undefined-8000...`.
      },
