export async function fetchCars() {
  const headers = {
    "X-RapidAPI-Key": "6b9b242596mshedbee62db71ccf5p14bb4fjsnc87a47edf4f7",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla",
    { headers: headers }
  );

  const result = await response.json();

  return result;
}
