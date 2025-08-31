import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
import icLogo from "../assets/ic.svg";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <main className="dark">
      <div className="flex flex-col gap-14 items-center w-[400px]">
        <div className="flex gap-10 mt-20">
          <a
            href="https://internetcomputer.org"
            target="_blank"
            rel="noreferrer"
          >
            <img src={icLogo} alt="ICP logo" className="h-20" />
          </a>
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} alt="Vite logo" className="h-20" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} alt="React logo" className="h-20" />
          </a>
        </div>
        <h1>Running SQLite on ICP</h1>
        <div className="text-center text-white">
          A fullstack application using the latest of the greatest. SQLite
          in the backend canister plus these frameworks in the frontend:
          React + TypeScript + Vite + Tailwind + Shadcn/UI + Tanstack
          Query/Router.
        </div>
        <div className="text-center text-white">
          Fork it on GitHub: <a href="https://github.com/kristoferlund/ic-sqlite-react-demo" target="_blank" rel="noreferrer" className="underline">ic-sqlite-react-demo</a>
        </div>
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </main>
  ),
});
