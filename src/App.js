import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import GaragePage from "./pages/GaragePage";
import RootLayout from "./RootLayout";
import ErrorPage from "./pages/Error";
import AllGaragesPage from "./pages/AllGarages";
import { AuthProvider } from "./AuthContext";
import LoginPage from "./pages/Login";
import CheckInVehicleForm from "./pages/CheckInVehicleForm";
import CheckedInVehiclePage from "./pages/CheckedInVehiclePage";
import LogoutPage from "./pages/Logout";
import BillPage from "./pages/BillPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/business", element: <GaragePage /> },
      { path: "/customers", element: <GaragePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/logout", element: <LogoutPage /> },
    ],
  },
  {
    path: "/garage",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <AllGaragesPage /> },
      { path: "check-in", element: <CheckInVehicleForm /> },
      { path: "generate-bill/:checkInId", element: <BillPage />, loader: async ({ params }) => {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:9094/api/v1/check_in/${params.checkInId}/details`,
          {
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const vehicleDetails = await res.json();

        return vehicleDetails;
      } },
      {
        path: "check-in/:checkInId",
        element: <CheckedInVehiclePage />,
        loader: async ({ params }) => {
          const token = localStorage.getItem("token");
          const res = await fetch(
            `http://localhost:9094/api/v1/check_in/${params.checkInId}/details`,
            {
              cache: "no-store",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!res.ok) {
            throw new Error("Failed to fetch data");
          }

          const vehicleDetails = await res.json();

          return vehicleDetails;
        },
      },
      {
        path: ":garageId",
        element: <GaragePage />,
        loader: async ({ params }) => {
          const token = localStorage.getItem("token");
          const garage_id = params.garageId;

          const res = await fetch(
            `http://localhost:9094/api/v1/incomplete_checkins/${garage_id}`,
            {
              cache: "no-store",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!res.ok) {
            throw new Error("Failed to fetch data");
          }

          return res.json();
        },
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
