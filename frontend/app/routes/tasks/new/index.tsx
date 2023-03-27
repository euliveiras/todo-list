import { Alert } from "@mui/material";
import type { ActionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import StyledPaper from "~/components/shared/StyledPaper";
import TaskForm from "~/components/TaskForm";

export const action = async ({ request }: ActionArgs) => {
    const formData = await request.formData();
    const values = Object.fromEntries(formData);
    const categories = ["Personal", "Business"];
    const category = categories[Math.floor(Math.random() * categories.length)];

    const data = JSON.stringify({
        ...values,
        additionalInfo: values.note,
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
        <StyledPaper className="container">
            <TaskForm error={!data?.ok}>
                {data && !data?.ok && <Alert severity="error">{data?.message}</Alert>}
            </TaskForm>
        </StyledPaper>
    );
}
