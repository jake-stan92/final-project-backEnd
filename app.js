import express from "express";
import { getRoutes } from "./models/routes.js";

const app = express();
const PORT = 3000;

app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests

app.get("/routes", async (req, res) => {
  const allRoutes = await getRoutes();
  res.status(200).json({ status: "success", payload: allRoutes });
  //   console.log(allRoutes);
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running,and App is listening on port" + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
