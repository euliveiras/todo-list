import Paper from "@mui/material/Paper";

type CategoryProps = {
    label: string;
    count: number;
};
export default function Category({ label, count }: CategoryProps) {
    return (
        <Paper elevation={1} className="categories__card" sx={{ borderRadius: "1em" }}>
            <p className="card__title">
                {count} {count === 1 ? "task" : "tasks"}
            </p>
            <p className="card__category-name">{label}</p>
            <span className="card__bar"></span>
        </Paper>
    );
}
