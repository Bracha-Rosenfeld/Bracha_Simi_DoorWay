const axios = require('axios');

const PAYPAL_API = 'https://api-m.sandbox.paypal.com';
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const SECRET = process.env.PAYPAL_CLIENT_SECRET;

async function getAccessToken() {
  const response = await axios({
    url: `${PAYPAL_API}/v1/oauth2/token`,
    method: 'post',
    auth: {
      username: CLIENT_ID,
      password: SECRET
    },
    params: { grant_type: 'client_credentials' }
  });

  return response.data.access_token;
}

exports.createPaypalOrder = async (amount) => {
  const accessToken = await getAccessToken();
  const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, {
    intent: 'CAPTURE',
    purchase_units: [{ amount: { currency_code: 'USD', value: amount } }]
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data;
};

exports.capturePaypalOrder = async (orderID) => {
  const accessToken = await getAccessToken();
  const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data;
};
