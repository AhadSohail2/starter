const Event = require("../models/events");

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("vendor");
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
