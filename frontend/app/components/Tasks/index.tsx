import Task from "./Task";

import type { ActionArgs } from "@remix-run/node";

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

export async function action({ request }: ActionArgs) {
    console.log(request);

    return null;
}
export default function Tasks({ data }: TasksProps) {
    return (
        <section className="tasks">
            <h2 className="tasks__label">Today tasks</h2>
            <div className="tasks__cards">
                {data.map((task) => (
                    <Task
                        label={task.label}
                        id={task.id}
                        key={task.id}
                    />
                ))}
            </div>
        </section>
    );
}
