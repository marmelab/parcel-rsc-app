import { callAction, renderRequest } from "@parcel/rsc/node";
import express from "express";

// Page components. These must have "use server-entry" so they are treated as code splitting entry points.
import { Page } from "./Page";

const app = express();

app.use(express.static("dist"));

app.get("/", async (req, res) => {
	await renderRequest(req, res, <Page />, { component: Page });
});

app.post("/", async (req, res) => {
	const id = req.get("rsc-action-id");
	const { result } = await callAction(req, id);
	let root: any = <Page />;
	if (id) {
		root = { result, root };
	}
	await renderRequest(req, res, root, { component: Page });
});

app.listen(3000);
console.log("Server listening on port 3000");
