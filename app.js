import express from "express";
import {
  getRoutes,
  getRouteById,
  saveNewRoute,
  deleteRoute,
} from "./models/routes.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests
app.options("*", cors());
app.use(cors()); // change from * to make more secure

// 1_ GET all routes (to display in table on FrontEnd (FE)) ---- /getAllRoutes
// GET to retrieve stored route
// read row from database
// return the route data and name -- as JSON?
app.get("/routes", async (req, res) => {
  const allRoutes = await getRoutes();
  res.status(200).json({ status: "success", payload: allRoutes });
  //   console.log(allRoutes);
});

// 2_ GET route by ID to display single route on user click ---- /getRouteById
app.get("/route/:id", async (req, res) => {
  // get id from params in url
  const id = req.params.id;
  //   pass id to function to get specificed route
  const route = await getRouteById(id);
  //   return chosen route
  res.status(200).json({ status: "success", payload: route });
});

// POST to store/save a route
app.post("/newRoute", cors(), async (req, res) => {
  //define data from request body - THIS WILL NEED VALIDATING!
  const route = req.body;
  console.log("req.body received:");
  console.log(JSON.stringify(route));
  // add new route to DB once validated
  const newRoute = await saveNewRoute(route);
  console.log("Returned route:");
  console.log(newRoute);
  // return new route and success
  res.status(201).json({ status: "success", payload: { newRoute } });
});

// DELETE to delete a saved route
app.delete("/delete/:id", async (req, res) => {
  // get id from params in url
  const id = req.params.id;
  // pass id to delete function
  const deletedRoute = deleteRoute(id);
  // return details of deleted route
  res.status(200).json({ status: "success", payload: "Deleted Successfully" });
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running,and App is listening on port" + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
