import Paper from "@mui/material/Paper";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Form, Link } from "@remix-run/react";
import Button from "@mui/material/Button";

type TaskProps = {
    label: string;
    id: string;
};

export default function Task({ label, id }: TaskProps) {
    return (
        <Paper key={id} className="tasks__card" sx={{ boxShadow: "0", borderRadius: "1em" }}>
            <input id="task-checkbox" type="checkbox" name={label} className="card__checkbox" />

            <label htmlFor="task-checkbox" className="card__checkbox-label">
                {label}
            </label>

            <Form method="delete" className="btns-container">
                <input type="hidden" name="id" value={id} />
                <Link to={`/tasks/update/${id}`}>
                    <EditOutlinedIcon />
                </Link>
                <Button
                    sx={{
                        padding: "0",
                        minWidth: "0",
                        display: "grid",
                        placeContent: "center",
                    }}
                    variant="text"
                    type="submit"
                    className="delete-btn">
                    <DeleteOutlineOutlinedIcon />
                </Button>
            </Form>
        </Paper>
    );
}
