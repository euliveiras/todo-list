import Paper from "@mui/material/Paper";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link, useFetcher } from "@remix-run/react";

type TaskProps = {
    label: string;
    id: string;
};
export default function Task({ label, id }: TaskProps) {
    const fetcher = useFetcher();
    const handleDelete = () => {
        fetcher.submit({ id, label }, { method: "delete" });
    };

    return (
        <Paper className="tasks__card" sx={{ boxShadow: "0", borderRadius: "1em" }}>
            <input type="checkbox" name={label} />
            <p>{label}</p>
            <span className="btns-container">
                <input type="hidden" value={id} />
                <Link to={`/tasks/update/${id}`}>
                    <EditOutlinedIcon />
                </Link>
                <DeleteOutlineOutlinedIcon onClick={handleDelete} />
            </span>
        </Paper>
    );
}
