import { callAction, renderRequest } from "@parcel/rsc/node";
import express from "express";

// Page components. These must have "use server-entry" so they are treated as code splitting entry points.
import { TasksPage } from "./TasksPage";
import { AboutPage } from "./AboutPage";

const app = express();

app.use(express.static("dist"));

app.get("/about", async (req, res) => {
  await renderRequest(req, res, <AboutPage />, { component: AboutPage });
});

app.get("{/:filter}", async (req, res) => {
  const filter = getFilter(req.params.filter as string | undefined);
  if (filter !== undefined && filter !== "active" && filter !== "completed") {
    res.status(404).send("Not found");
    return;
  }
  await renderRequest(req, res, <TasksPage filter={filter} />, { component: TasksPage });
});


app.post("{/:filter}", async (req, res) => {
  const filter = getFilter(req.params.filter as string | undefined);
  const id = req.get("rsc-action-id");
  const { result } = await callAction(req, id);
  let root: any = <TasksPage filter={filter} />;
  if (id) {
    root = { result, root };
  }
  await renderRequest(req, res, root, { component: TasksPage });
});

app.listen(3000);
console.log("Server listening on port 3000");

const getFilter = (filter: string | undefined) => {
  if (filter === "active" || filter === "completed") {
    return filter;
  }
  return undefined;
}