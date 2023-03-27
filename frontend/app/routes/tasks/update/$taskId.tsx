import type { ActionArgs, LinksFunction, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import StyledPaper from "~/components/shared/StyledPaper";
import TaskForm from "~/components/TaskForm";
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
    const formData = await request.formData();
    const values = Object.fromEntries(formData);

    const body = JSON.stringify({
        label: values.label,
        expiration: values.expiration,
        additionalInfo: values.note
    });

    await fetch(`${process.env.API_ADDRESS}/tasks/${values.taskId}`, {
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
            <TaskForm
                data={{
                    expiration: data.task?.expiration,
                    label: data.task?.label,
                    note: data.task?.additionalInfo,
                    id: data?.task?.id,
                }}
            />
        </StyledPaper>
    );
}
