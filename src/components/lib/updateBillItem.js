export default async function updateBillItem(bill_id, price, serviceName) {

    const res = await fetch("https://optimus-internal.suprrfix.com/api/v1/create/bill/items", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({billId: bill_id, price: price, serviceName:serviceName})
        }
      );
    
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
    
      return res.json();
}
