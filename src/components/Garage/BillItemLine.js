const BillItemLine = (props) => {
    return (
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
          {props.services_name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
          {props.services_price}
        </td>
      </tr>
    );
  };
  
  export default BillItemLine;