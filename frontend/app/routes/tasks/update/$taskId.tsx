import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { ActionArgs, LinksFunction, LoaderArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import updateTaskCss from "../../../styles/update-task.css";

type ITasks = {
    id: string;
    category: string;
    label: string;
    additionalInfo?: string;
    createdAt: string;
    ownerId: string;
    expiration: string;
};

type JSONResponse = {
    data: Array<ITasks>;
    errors?: Array<{ message: string }>;
};

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: updateTaskCss }];
};

export const action = async ({ request }: ActionArgs) => {
    const form = await request.formData();
    const label = form.get("label");
    const id = form.get("id");
    console.log(id, label);

    const body = JSON.stringify({ label });

    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body,
    });

    return redirect("/");
};

export const loader = async ({ params }: LoaderArgs) => {
    const taskId = params.taskId;

    const response = await fetch(
        "http://localhost:3000/tasks/3ac4f5a9-44cd-464f-8897-9cec1f0e5ebf",
        { method: "GET" }
    );

    const { data }: JSONResponse = await response.json();

    const task = data?.find((v) => v.id === taskId);

    return json({ task });
};
export default function TaskRoute() {
    const data = useLoaderData<typeof loader>();
    return (
        <Paper className="container">
            <h1>Edit task</h1>
            <Form className="form" method="patch">
                <label className="label">
                    <p>Task name</p>
                    <input name="id" type="hidden" defaultValue={data.task?.id} />
                    <input name="label" defaultValue={data.task?.label} />
                </label>
                <Button variant="contained" type="submit">
                    Save
                </Button>
            </Form>
        </Paper>
    );
}
