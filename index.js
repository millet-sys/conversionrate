import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://v6.exchangerate-api.com/v6/bcdeccc566466f3a53f9ec3d/pair/USD/ZMW");
    res.render("index.ejs", {
      usd: result.data.conversion_rate,
      nextupdate: result.data.time_next_update_utc,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
