require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
 .then(() => console.log("MongoDB connected"))
 .catch((error) => console.error(error));

const UserSchema = new mongoose.Schema({
  name: String,
  height: Number,
  email: String,
});

const User = mongoose.model("User", UserSchema);

// API to store user data
app.post("/api/users", async (req, res) => {
  try {
    const { name, height, email } = req.body;
    const newUser = new User({ name, height, email });
    await newUser.save();

    // Calculate average height
    const users = await User.find();
    const avgHeight =
      users.reduce((acc, user) => acc + user.height, 0) / users.length;

    res.json({ success: true, avgHeight });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API to get average height
app.get("/api/average-height", async (req, res) => {
  const users = await User.find();
  const avgHeight =
    users.reduce((acc, user) => acc + user.height, 0) / users.length;
  res.json({ avgHeight });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));