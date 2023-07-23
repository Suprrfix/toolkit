import { Link } from "react-router-dom";
import CheckedInVehiclesList from "../components/Garage/checkedInVehiclesList";
import { useLoaderData } from "react-router-dom";
import MainNavigation from "../components/common/MainNavigation";

export default function GaragePage() {
  const vehicles = useLoaderData();
  return (
    <>
      <Link to="/garage/check-in" className="btn btn-blue">
        Check-in vehicle
      </Link>
      {vehicles.length > 0 ? (
        <CheckedInVehiclesList vehicles={vehicles} />
      ) : (
        <div className="text-center mt-48"><i className="fas fa-cars text-4xl"></i> <p>No vehicles checked in yet.</p></div>
      )}  
      <MainNavigation />
    </>
  );
}
