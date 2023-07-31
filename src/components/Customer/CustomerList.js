import CustomerCard from "./CustomerCard";

export default function CustomerList( {customers = [] }) {

  return (
    <div className="mx-auto">
      {customers?.map((customer, index) => {
        return (
        //   <CustomerCard
        //     vehicle_model={customer.vehicle_model}
        //     vehicle_number={customer.vehicle_number}
        //     customer_first_name={customer.customer_first_name}
        //     customer_last_name={customer.customer_last_name}
        //     customer_phone_number={customer.customer_phone_number}
        //     vehicle_brand={customer.vehicle_brand}
        //     vehicle_variant={customer.vehicle_variant}
        //     vehicle_type={customer.vehicle_type}
        //   ></CustomerCard>
          <CustomerCard
          key={index}
            vehicle_model={''}
            vehicle_number={customer.customer_vehicle_number}
            customer_first_name={customer.customer_name}
            customer_last_name={''}
            customer_phone_number={customer.customer_mobile_number}
            vehicle_brand={''}
            vehicle_type={customer.customer_vehicle_type}
            vehicle_variant={customer.customer_vehicle}
          ></CustomerCard>
        );
      })}
    </div>
  );
}
