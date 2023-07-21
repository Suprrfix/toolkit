import Card from '../UI/Card';
import { Link } from 'react-router-dom';

const CheckedInVehicleCard = ({
  check_in_id,
  vehicle_number,
  customer_first_name,
  customer_last_name,
  customer_phone_number,
  vehicle_model,
  vehicle_brand,
  vehicle_variant,
  vehicle_type,
}) => {
  return (
    <Card className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <div className="p-4 md:p-7">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {vehicle_number}
        </h3>
        <p className="mt-2 text-gray-800 dark:text-gray-400">{vehicle_brand} {vehicle_model} {vehicle_variant} ({vehicle_type})</p>
        <div className="flex items-stretch">
          <Link
            className="inline-flex mr-4 items-center gap-2 mt-2 text-sm font-medium text-blue-500 hover:text-blue-700"
            to={`tel:${customer_phone_number}`}
          >
            <i className="far fa-phone-alt"></i>
            Call customer
          </Link>
          <Link
            className=" inline-flex items-center gap-2 mt-2 text-sm font-medium text-blue-500 hover:text-blue-700"
            // set up a relative path here
            to={`/garage/check-in/${check_in_id}`}
          >
            <i className="fas fa-eye"></i>
            Open
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CheckedInVehicleCard;
