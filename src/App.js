import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import HomePage from "./pages/Home";
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
import CheckedOutPage from "./pages/CheckedOutPage";
// import ComingSoonPage from "./pages/ComingSoonPage";
import AddGarageFormPage from "./pages/AddGarageFormPage";
import GarageBusinessPage from "./pages/GarageBusinessPage";
import CustomerListPage from "./pages/CustomerListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "/garages", element: <AllGaragesPage />, loader: async () => {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `/api/garages`,
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

        const allGarages = await res.json();

        return allGarages;
      } },
      { path: "/business", element: <GarageBusinessPage />, loader: async ({ params }) => {
        const token = localStorage.getItem("token");
        const garage_id = localStorage.getItem("garage_id");
        const res = await fetch(
          `/api/garage/${garage_id}/details`,
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

        const garageDetails = await res.json();

        return garageDetails;
      }},
      { path: "/customers", element: <CustomerListPage />, 
      //loader: async ({ params }) => {
        // const res = await ('https://64a2ee97b45881cc0ae5e5dd.mockapi.io/api/test/customers');

        // const token = localStorage.getItem("token");
        // const garage_id = localStorage.getItem("garage_id");
        // const res = await fetch(
        //   `/api/garage/${garage_id}/details`,
        //   {
        //     cache: "no-store",
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );

        // if (!res.ok) {
        //   throw new Error("Failed to fetch data");
        // }

        // const customerList = await res.json();

        // return customerList;
      // }
    },
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
      { path: 'add', element: <AddGarageFormPage /> },
      { path: "check-in", element: <CheckInVehicleForm /> },
      { path: "checked-out/:checkOutId", element: <CheckedOutPage /> },
      { path: "generate-bill/:checkInId", element: <BillPage />, loader: async ({ params }) => {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `/api/check_in/${params.checkInId}/details`,
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

        const billDetails = await res.json();

        return billDetails;
      } },
      {
        path: "check-in/:checkInId",
        element: <CheckedInVehiclePage />,
        loader: async ({ params }) => {
          const token = localStorage.getItem("token");
          const res = await fetch(
            `/api/check_in/${params.checkInId}/details`,
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
          const garage_id = localStorage.getItem('garage_id');

          const res = await fetch(
            `/api/incomplete_checkins/${garage_id}`,
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
