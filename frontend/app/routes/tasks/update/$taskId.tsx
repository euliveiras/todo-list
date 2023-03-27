import { Button } from "@mui/material";
import type { ActionArgs, LinksFunction, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import StyledPaper from "~/components/StyledPaper";
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

    const body = JSON.stringify({ label });

    await fetch(`${process.env.API_ADDRESS}/tasks/${id}`, {
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

    const response = await fetch(`${process.env.API_ADDRESS}/tasks/${process.env.OWNER_ID}`, {
        method: "GET",
    });

    const { data }: JSONResponse = await response.json();

    const task = data?.find((v) => v.id === taskId);

    return json({ task });
};

export default function TaskRoute() {
    const data = useLoaderData<typeof loader>();
    return (
        <StyledPaper className="container">
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
        </StyledPaper>
    );
}
