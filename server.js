const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Task = mongoose.model("Task", { text: String });

app.get("/tasks", async (req, res) => res.json(await Task.find()));
app.post("/tasks", async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.send(task);
});
app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.send("Deleted");
});

app.listen(5000, () => console.log("Server running on port 5000"));
