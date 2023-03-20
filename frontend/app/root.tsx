import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import globalStyles from "./styles/global.css";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: globalStyles }];
};

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "todo-list",
    viewport: "width=device-width,initial-scale=1",
});

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
