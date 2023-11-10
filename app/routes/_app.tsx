import { type MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex-col md:flex">
      <header className="border-b flex h-16 justify-between items-center px-4">
        <div className="container mx-auto flex gap-2 items-center">
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        </div>
      </header>
      <main className="container mx-auto flex-1 pt-6 px-4">
        <Outlet />
      </main>
    </div>
  );
}
