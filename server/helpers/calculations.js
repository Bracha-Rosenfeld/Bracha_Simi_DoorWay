exports.getCoordinatesFromAddress = async (address) => {
  const apiKey = process.env.API_KEY;
  const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(address)}&format=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Invalid address or API error. " + address);
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

exports.getCityFromCoordinates = async (latitude, longitude) => {
  const apiKey = process.env.API_KEY;
  //const url = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;
  const url = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json&accept-language=en`;
  // console.log("url", url);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Reverse geocoding API error.");
  }

  const data = await response.json();
  // console.log("data:", data);
  // console.log("town:",data.address.town, "village:",data.address.village, "county:",data.address.county, "state:",data.address.state, "city:",data.address.city, "data.address:",data.address);
  console.log("data:! ",data.address.city);

  if (!data.address || !data.address.city) {
    return (
      data.address.town ||
      data.address.village ||
      data.address.county ||
      data.address.state ||
      'Unknown'
    );
  }
  console.log("data:",data.address.city);

  return data.address.city;
};