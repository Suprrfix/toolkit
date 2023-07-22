export default async function getCheckedInVehicles() {
  const token = localStorage.getItem("token");
  const garage_id = localStorage.getItem("garage_id");

  const res = await fetch(
    `https://optimus-internal.suprrfix.com/api/v1/incomplete_checkins/${garage_id}`,
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
}
