import { Link } from "react-router-dom";
import CheckedInVehiclesList from "../components/Garage/checkedInVehiclesList";
import { useLoaderData } from "react-router-dom";
import MainNavigation from "../components/common/MainNavigation";

export default function GaragePage() {
  const vehicles = useLoaderData();
  return (
    <>
      <Link to="/garage/check-in" className="btn btn-blue mt-12">
        Check-in vehicle
      </Link>
      <CheckedInVehiclesList vehicles={vehicles} />
      <MainNavigation />
    </>
  );
}
