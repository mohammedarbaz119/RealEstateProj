import HomePage from "./routes/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import { Layout, AuthLayout } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import { LoadAll, LoadSingle, ProfilePostsLoader } from "./lib/loader";
import AboutPage from "./routes/About/About";
import ContactPage from "./routes/Contact/Contact";
import { Link } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/agents",
          element: <div>Agents Coming soon</div>,
        },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: LoadAll,
        },
        {
          path: "/listing/:id",
          element: <SinglePage />,
          loader: LoadSingle,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/*",
          element: <>
          <div>404 not found</div>
          <Link to={"/"}>Go back to home</Link>
          </>,
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/post/new",
          element: <NewPostPage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: ProfilePostsLoader,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
