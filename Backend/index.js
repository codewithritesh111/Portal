const express = require("express");
const mongoose = require("mongoose");
const Model = require('./Models/model')
const app = express();
var cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

mongoose.connect(
  "mongodb+srv://riteshparwal111:%23%23%40Ri24042003@cluster0.olby3.mongodb.net/",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Connected to MongoDB successfully'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Correctly mount the routes
app.use("/update", require("./Routes/update"));

async function func() {
  try {
    // Use await to handle the asynchronous find operation
    const f = await Model.findOne({ name: "IBM_START" }); // Use findOne for a single match
    
    if (!f) { // Check if no result is found
      const model = new Model({
        name: "IBM_START"
      });
      await model.save(); // Save the new model
      console.log("Model saved successfully");
    } else {
      console.log("Model already exists:", f);
    }
  } catch (error) {
    console.error("Error in func:", error);
  }
}

func();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("App listening at port 5000");
});