module.exports.gastoTest = async (req, res) => {
  try {
    res.status(200).send('its working!!');
  } catch (error) {
    console.log(error);
  }
};
