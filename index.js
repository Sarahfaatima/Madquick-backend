const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const VaultRouter = require('./Routes/VaultRouter');


require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
  res.send('PONG');
});
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/api', VaultRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
});