import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/index.css";
import App from "./App";
import PlaygroundPage from "./pages/Playground/PlaygroundPage";
import CreateStoryPage from "./pages/CreateStory/CreateStoryPage";
import CreateCharacterPage from "./pages/CreateCharacter/CreateCharacterPage";
import CreateComicPage from "./pages/CreateComicPage/CreateComicPage";
import About from "./pages/About/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "Playground",
    element: <PlaygroundPage />,
  },
  {
    path: "About",
    element: <About />,
  },
  {
    path: "CreateStory",
    element: <CreateStoryPage/>,
  },
  {
    path: "CreateComicPage",
    element: <CreateComicPage />,
  },
  {
    path: "CreateCharacter",
    element: <CreateCharacterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
