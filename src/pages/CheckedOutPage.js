import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function CheckedOutPage() {
  //   const { checkOutId } = useParams(); // Extracts the value of the 'id' parameter from the URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const vehicleNumber = queryParams.get("vehicle"); // Extracts the value of the 'vehicle_number' query parameter
  const garage_id = localStorage.getItem("garage_id");

  return (
    <>
      <div className="mx-auto w-80 pt-48 text-center">{vehicleNumber} was checked out successfully!</div>
      <div className="button-group flex fixed bottom-0 left-0 w-full px-4">
        <Link
          to={`/garage/${garage_id}`}
          className="flex-1 btn btn-secondary mr-2"
        >
          Go to Garage
        </Link>
      </div>
    </>
  );
}
