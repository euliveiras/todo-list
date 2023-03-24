import { Alert, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import type { ActionArgs, LinksFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import updateTaskCss from "../../../styles/update-task.css";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: updateTaskCss }];
};

export const action = async ({ request }: ActionArgs) => {
    const body = await request.formData();
    const values = Object.fromEntries(body);
    const categories = ["Personal", "Business"];
    const category = categories[Math.floor(Math.random() * categories.length)];

    const data = JSON.stringify({
        ...values,
        expiration: new Date(),
        category,
        ownerId: process.env.OWNER_ID,
    });

    const response = await fetch(`${process.env.API_ADDRESS}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: data,
    });

    if (response.status === 400) {
        return json({ ok: false, message: "label must contain 2 or more characters" });
    }

    return redirect("/");
};

export default function TaskRoute() {
    const data = useActionData<typeof action>();
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
                {data && !data?.ok && <Alert severity="error">{data?.message}</Alert>}
            </Form>
        </Paper>
    );
}
