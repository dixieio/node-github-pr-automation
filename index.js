require('dotenv').config();

const express = require('express');
const app = express();

app.listen(process.env.SERVER_PORT || 3000, err => {
  if (err) {
    throw error;
  }

  console.log(`Server is running on localhost:${process.env.SERVER_PORT || 3000}`);
});
