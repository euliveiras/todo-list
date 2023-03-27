import { Alert, Button } from "@mui/material";
import type { ActionArgs, LinksFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import newTaskCss from "../../../styles/new-task.css";
import DatePicker from "~/components/shared/DatePicker";
import StyledPaper from "~/components/shared/StyledPaper";
import BackButton from "~/components/shared/BackButton";
import TaskForm from "~/components/TaskForm";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: newTaskCss }];
};

export const action = async ({ request }: ActionArgs) => {
    const formData = await request.formData();
    const values = Object.fromEntries(formData);
    const categories = ["Personal", "Business"];
    const category = categories[Math.floor(Math.random() * categories.length)];

    const data = JSON.stringify({
        ...values,
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
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (data && !data?.ok) {
            inputRef.current?.focus();
        }
    });

    return (
        <StyledPaper className="container">
            <TaskForm inputRef={inputRef}>
                {data && !data?.ok && <Alert severity="error">{data?.message}</Alert>}
            </TaskForm>
        </StyledPaper>
    );
}
