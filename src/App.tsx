import { FC, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Config from "./pages/Config";

const router = createBrowserRouter([
  {
    path: "/config",
    element: <Config />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

const App: FC = () => {
  useEffect(() => {
    if (window.location.search.length !== 0) {
      const search = window.location.search.substring(1);
      const params = JSON.parse(
        '{"' +
          decodeURI(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}'
      );
      Object.keys(params).forEach((key) => {
        if (params[key].trim().length !== 0) {
          localStorage.setItem(key, decodeURIComponent(params[key]));
        }
      });
      window.location.href = "/";
    }
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
