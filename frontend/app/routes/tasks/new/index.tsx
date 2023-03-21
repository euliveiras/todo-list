import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import type { ActionArgs, LinksFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import updateTaskCss from "../../../styles/update-task.css";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: updateTaskCss }];
};

export const action = async ({ request }: ActionArgs) => {
    const form = await request.formData();
    const label = form.get("label");
    const categories = ["Personal", "Business"];
    const category = categories[Math.floor(Math.random() * categories.length)];

    const body = JSON.stringify({
        label,
        expiration: new Date(),
        category,
        ownerId: "3ac4f5a9-44cd-464f-8897-9cec1f0e5ebf",
    });

    const response = await fetch(`http://localhost:3000/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body,
    });

    console.log(response);

    return redirect("/");
};

export default function TaskRoute() {
    return (
        <Paper className="container">
            <h1>Create task</h1>
            <Form className="form" method="post">
                <label className="label">
                    <p>Task name</p>
                    <input name="label" />
                </label>
                <Button variant="contained" type="submit">
                    Save
                </Button>
            </Form>
        </Paper>
    );
}
