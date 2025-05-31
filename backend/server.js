const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.get("/",(req, res)=>{
  res.send("Running")
});

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
// app.get("/", (req, res) => {
//   res.send("Backend is live!");
// });
app.use('/api/auth', require('../backend/routes/auth'));
app.use('/api/chargers', require('../backend/routes/chargers'));

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
