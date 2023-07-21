import CheckedInVehicleCard from "./CheckedInVehicleCard";

export default function CheckedInVehiclesList( {vehicles = [] }) {

  return (
    <div className="mx-auto">
      {vehicles?.map((CheckedInVehicle) => {
        return (
          <CheckedInVehicleCard
            check_in_id={CheckedInVehicle.check_in_id}
            key={CheckedInVehicle.check_in_id}
            vehicle_model={CheckedInVehicle.vehicle_model}
            vehicle_number={CheckedInVehicle.vehicle_number}
            customer_first_name={CheckedInVehicle.customer_first_name}
            customer_last_name={CheckedInVehicle.customer_last_name}
            customer_phone_number={CheckedInVehicle.customer_phone_number}
            vehicle_brand={CheckedInVehicle.vehicle_brand}
            vehicle_variant={CheckedInVehicle.vehicle_variant}
            vehicle_type={CheckedInVehicle.vehicle_type}
          ></CheckedInVehicleCard>
        );
      })}
    </div>
  );
}
