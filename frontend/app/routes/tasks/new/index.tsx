import { Alert, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import type { ActionArgs, LinksFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import newTaskCss from "../../../styles/new-task.css";
import DatePicker from "~/components/shared/DatePicker";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: newTaskCss }];
};

export const action = async ({ request }: ActionArgs) => {
    const formData = await request.formData();
    const values = Object.fromEntries(formData);
    const categories = ["Personal", "Business"];
    const category = categories[Math.floor(Math.random() * categories.length)];

    // await Promise.resolve(new Promise((s) => setTimeout(s, 1500)));

    // const parsedDate =

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
    const navigation = useNavigation();
    const inputRef = useRef<HTMLInputElement>(null);

    const isSubmitting = navigation.state === "submitting";

    useEffect(() => {
        if (data && !data?.ok) {
            inputRef.current?.focus();
        }
    });

    return (
        <Paper sx={{ borderRadius: "42px" }} className="container">
            <Link to="/" className="close-btn" aria-label="back to home">
                <CloseIcon />
            </Link>
            <Form replace className="form" method="post">
                <label className="label" htmlFor="label-input" hidden>
                    Task name
                </label>

                <input
                    placeholder="Enter a task name"
                    id="label-input"
                    ref={inputRef}
                    name="label"
                    className="task-name"
                    size={10}
                />

                <label hidden className="label-textarea" htmlFor="note-textarea">
                    notes
                </label>

                <textarea name="note" placeholder="Task notes" rows={8} className="task-note" />

                <DatePicker name="expiration" />

                <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={{
                        inlineSize: "fit-content",
                        marginInline: "auto",
                        marginBlockStart: "1em",
                        borderRadius: "20px",
                        padding: "8px 32px"
                    }}>
                    {isSubmitting ? "Saving..." : "Save"}
                </Button>

                {data && !data?.ok && <Alert severity="error">{data?.message}</Alert>}
            </Form>
        </Paper>
    );
}
