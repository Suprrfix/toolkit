import Card from "../UI/Card";
import { Link } from "react-router-dom";

const CustomerCard = ({
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
    <Card>
      <div className="flex items-center justify-between">

        <div className="p-4 md:p-7 flex-initial w-80">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {customer_first_name} {customer_last_name}
          </h3>
          <p>{vehicle_number}</p>
          <p className="mt-2 text-gray-800 dark:text-gray-400">
            {vehicle_brand} {vehicle_model} {vehicle_variant} ({vehicle_type})
          </p>
        </div>

        <div className="flex-initial w-20">
          <Link
            className="text-md w-10 h-10 block text-center py-2 font-medium text-blue-500 border-blue-500 border border-rounded rounded-full hover:text-blue-700"
            to={`tel:${customer_phone_number}`}
          >
            <i className="far fa-phone-alt"></i>
          </Link>
        </div>

      </div>
    </Card>
  );
};

export default CustomerCard;
