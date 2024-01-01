import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewTicket from "./pages/NewTicket";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";
import Applayout from "../ui/Applayout";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      {
        element: <Home />,
        path: "/",
      },
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <Register />,
        path: "/register",
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <NewTicket />,
            path: "/new-ticket",
          },
          {
            element: <Tickets />,
            path: "/tickets",
          },
          {
            element: <Ticket />,
            path: "/ticket/:ticketId",
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
