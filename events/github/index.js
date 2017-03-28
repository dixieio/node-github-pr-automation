module.exports = (req, res) => {
  res.status(200).send(`Recived: ${req.body.message}`);
}
