exports.getCoordinatesFromAddress= async (address)=> {
  const apiKey = process.env.LOCATIONIQ_API_KEY; // שימי לב לוודא שהמפתח קיים בקובץ .env שלך
  const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(address)}&format=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Invalid address or API error.");
  }

  const data = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Address not found.");
  }

  const firstResult = data[0];

  if (!firstResult.lat || !firstResult.lon) {
    throw new Error("Missing latitude or longitude in response.");
  }

  const latitude = parseFloat(firstResult.lat);
  const longitude = parseFloat(firstResult.lon);

  if (isNaN(latitude) || isNaN(longitude)) {
    throw new Error("Invalid latitude or longitude format.");
  }

  return [latitude, longitude];
}