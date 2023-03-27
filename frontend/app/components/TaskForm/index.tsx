import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Form, useNavigation } from "@remix-run/react";
import DatePicker from "~/components/shared/DatePicker";
import BackButton from "~/components/shared/BackButton";
import { useEffect, useRef } from "react";

type TaskFormProps = {
    data?: {
        id?: string;
        label?: string;
        note?: string;
        expiration?: string;
        category?: string;
    };
    children?: React.ReactNode;
    error?: Boolean;
};

export default function TaskForm({ data, children, error }: TaskFormProps) {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (error) {
            inputRef.current?.focus();
        }
    });

    return (
        <>
            <Form replace className="task__form" method="post">
                <BackButton to="/" />
                {data?.id && <input defaultValue={data?.id} hidden name="taskId" />}
                <label className="task__form-label" htmlFor="label-input" hidden>
                    Task name
                </label>

                <input
                    placeholder="Enter a task name"
                    defaultValue={data?.label}
                    id="label-input"
                    ref={inputRef}
                    name="label"
                    className="task__form-name"
                    size={10}
                />

                <label hidden className="task-form__textarea" htmlFor="note-textarea">
                    notes
                </label>

                <textarea
                    name="note"
                    defaultValue={data?.note}
                    placeholder="Task notes"
                    rows={8}
                    className="task__form-note"
                />

                <span className="task__form-expiration-category-span">
                    <DatePicker name="expiration" expiration={data?.expiration} />

                    <FormControl
                        sx={{
                            inlineSize: "200px",
                        }}>
                        <InputLabel id="category-label">Category</InputLabel>

                        <Select
                            labelId="category-label"
                            id="category"
                            label="Category"
                            name="category"
                            defaultValue={data?.category ?? "Personal"}>
                            <MenuItem value="Personal">Personal</MenuItem>
                            <MenuItem value="Business">Business</MenuItem>
                        </Select>
                    </FormControl>
                </span>

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
