const { createPaypalOrder, capturePaypalOrder } = require('../service/paypalService');

exports.createOrder = async (req, res) => {
  try {
    const order = await createPaypalOrder(req.body.amount);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.captureOrder = async (req, res) => {
  try {
    const capture = await capturePaypalOrder(req.body.orderID);
    res.json(capture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
