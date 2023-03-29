import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { json } from "@remix-run/node";
import { Form, Link, useFetcher, useLoaderData, useSubmit } from "@remix-run/react";

import DatePicker from "~/components/shared/DatePicker";
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
import { format, parse } from "date-fns";

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
    const urlParams = new URLSearchParams(request.url.split("?")[1]);
    const { expiration } = Object.fromEntries(urlParams);

    const url = new URL(`${process.env.API_ADDRESS}/tasks/${process.env.OWNER_ID}`);

    expiration && url.searchParams.append("expiration", expiration);

    const response = await fetch(url, {
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
        tasksDate: expiration ?? new Date(),
    });
};

export default function IndexRoute() {
    const data = useLoaderData<typeof loader>();
    const submit = useSubmit();

    const handleFilter = (e: Date | null) => {
        submit({ _action: "filter", expiration: e?.toISOString() ?? "" });
    };
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

                <section className="tasks">
                    <span className="tasks__filter">
                        <h2 className="tasks__label">
                            {format(new Date(data.tasksDate), "dd/MMM/yyyy")}
                        </h2>

                        <Form>
                            <DatePicker
                                name="expiration"
                                label="Search task date"
                                minDate={new Date("2023, 03, 28")}
                                onChange={handleFilter}
                            />
                        </Form>
                    </span>
                    <Tasks key="tasks-group" data={data.tasks} />
                </section>

                <Link to="/tasks/new" className="add-task-button">
                    <AddOutlinedIcon />
                </Link>
                <Outlet />
            </StyledPaper>
        </main>
    );
}
