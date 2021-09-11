module.exports.createUser = async (req, res) => {
  try {
    res.status(200).send('its works');
  } catch (error) {
    console.log(error);
  }
};
