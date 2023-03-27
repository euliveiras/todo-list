import { Button } from "@mui/material";
import { Form, useNavigation } from "@remix-run/react";
import DatePicker from "~/components/shared/DatePicker";
import BackButton from "~/components/shared/BackButton";
import type { RefObject } from "react";

type TaskFormProps = {
    inputRef: RefObject<HTMLInputElement>;
    data?: {
        label?: string;
        note?: string;
        expiration?: string;
    };
    children?: React.ReactNode;
};

export default function TaskForm({ data, inputRef, children }: TaskFormProps) {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <>
            <Form replace className="form" method="post">
                <BackButton to="/" />
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
                        padding: "8px 32px",
                    }}>
                    {isSubmitting ? "Saving..." : "Save"}
                </Button>

                {children}
            </Form>
        </>
    );
}
