module.exports.createUser = async (req, res) => {
  try {
    res.status(200).send('its work!!');
  } catch (error) {
    console.log(error);
  }
};
