import { callAction, renderRequest } from "@parcel/rsc/node";
import compression from "compression";
import express, { type RequestHandler } from "express";
// Page components. These must have "use server-entry" so they are treated as code splitting entry points.
import { AboutPage } from "./pages/about/AboutPage";
import { TasksPage } from "./pages/tasks/TasksPage";

const addDelay: RequestHandler = (req, _res, next) => {
	const delay = req.query.delay;
	if (delay && !Number.isNaN(Number(delay))) {
		const time = Number(delay);
		setTimeout(() => next(), time);
	} else {
		next();
	}
};

const app = express();

app.use(compression());
app.use(express.static("dist"));

app.get("/about", addDelay, async (req, res) => {
	await renderRequest(req, res, <AboutPage />, { component: AboutPage });
});

app.get("{/:filter}", addDelay, async (req, res) => {
	const filter = getFilter(req.params.filter as string | undefined);
	if (filter !== undefined && filter !== "active" && filter !== "completed") {
		res.status(404).send("Not found");
		return;
	}
	await renderRequest(req, res, <TasksPage filter={filter} />, {
		component: TasksPage,
	});
});

app.post("{/:filter}", addDelay, async (req, res) => {
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
};
