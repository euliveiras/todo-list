import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import indexCss from "../styles/index.css";
import categoriesCss from "../styles/categories.css";
import categoriesCardCss from "../styles/categories-cards.css";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import Categories from "~/components/Categories";
import { Outlet } from "@remix-run/react";

type Tasks = {
    id: string;
    category: string;
    label: string;
    additionalInfo?: string;
    createdAt: Date;
    ownerId: string;
    expiration: Date;
};

type JSONResponse = {
    data: Array<Tasks>;
    errors?: Array<{ message: string }>;
};

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: indexCss },
        { rel: "stylesheet", href: categoriesCss },
        { rel: "stylesheet", href: categoriesCardCss },
    ];
};

export const loader = async ({ request }: LoaderArgs) => {
    const response = await fetch(
        "http://localhost:3000/tasks/3ac4f5a9-44cd-464f-8897-9cec1f0e5ebf",
        { method: "GET" }
    );

    const { data }: JSONResponse = await response.json();

    const categories = data?.reduce((acc, curr) => {
        const index = acc.findIndex((i) => i.label === curr.category);
        if (index === -1) {
            acc.push({ label: curr.category, count: 1 });
        } else {
            acc[index].count += 1;
        }
        return acc;
    }, [] as Array<{ label: string; count: number }>);

    return json({
        categories,
        tasks: data,
    });
};

export default function IndexRoute() {
    const data = useLoaderData<typeof loader>();

    return (
        <main className="container">
            <Paper elevation={1} className="content">
                <header>
                    <h1>What's up!</h1>
                </header>

                <Categories data={data.categories} />

                <section className="tasks">
                    <h2 className="tasks__label">Today tasks</h2>
                    <div className="tasks__cards">
                        <div className="tasks__card">
                            <label>
                                <input type="checkbox" />
                                Click me
                            </label>
                        </div>
                    </div>
                </section>
                <Button variant="contained" className="add-task-button">
                    <AddOutlinedIcon />
                </Button>
                <Outlet />
            </Paper>
        </main>
    );
}
