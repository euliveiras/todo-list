import Task from "./Task";

type TasksProps = {
    data: {
        additionalInfo?: string;
        category: string;
        createdAt: string;
        expiration: string;
        id: string;
        label: string;
        ownerId: string;
    }[];
};

export default function Tasks({ data }: TasksProps) {
    return (
        <div className="tasks__cards">
            {data.map((task) => (
                <Task label={task.label} id={task.id} key={task.id} />
            ))}
        </div>
    );
}
