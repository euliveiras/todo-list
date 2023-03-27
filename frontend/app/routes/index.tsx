import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import indexCss from "../styles/index.css";
import categoriesCss from "../styles/categories.css";
import categoriesCardCss from "../styles/categories-cards.css";
import type { LinksFunction, LoaderArgs, ActionArgs } from "@remix-run/node";
import Categories from "~/components/Categories";
import { Outlet } from "@remix-run/react";
import Tasks from "~/components/Tasks";
import tasksCss from "../styles/tasks.css";
import tasksCardsCss from "../styles/tasks-cards.css";
import StyledPaper from "~/components/shared/StyledPaper";

type ITasks = {
    id: string;
    category: string;
    label: string;
    additionalInfo?: string;
    createdAt: string;
    ownerId: string;
    expiration: string;
};

type JSONResponse = {
    data: Array<ITasks>;
    errors?: Array<{ message: string }>;
};

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: indexCss },
        { rel: "stylesheet", href: categoriesCss },
        { rel: "stylesheet", href: categoriesCardCss },
        { rel: "stylesheet", href: tasksCss },
        { rel: "stylesheet", href: tasksCardsCss },
    ];
};

export const action = async ({ request }: ActionArgs) => {
    const method = request.method;
    const body = await request.formData();
    const data = Object.fromEntries(body);

    if (method === "DELETE") {
        await fetch(`${process.env.API_ADDRESS}/tasks/${data.id}`, { method });
    }

    if (method === "PATCH") {
        await fetch(`${process.env.API_ADDRESS}/tasks/${data.id}`, { method });
    }
    return null;
};

export const loader = async ({ request }: LoaderArgs) => {
    const response = await fetch(`${process.env.API_ADDRESS}/tasks/${process.env.OWNER_ID}`, {
        method: "GET",
    });

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
            <StyledPaper
                elevation={1}
                className="content"
                sx={{
                    backgroundColor: "whitesmoke",
                }}>
                <header>
                    <h1>What's up!</h1>
                </header>

                <Categories data={data.categories} />

                <Tasks data={data.tasks} />

                <Link to="/tasks/new" className="add-task-button">
                    <AddOutlinedIcon />
                </Link>
                <Outlet />
            </StyledPaper>
        </main>
    );
}
