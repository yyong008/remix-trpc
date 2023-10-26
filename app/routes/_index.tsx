import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { appRouter } from "~/trpc/router";

export const loader = async () => {
  // const caller = appRouter.createCaller({})
  // const u = await caller.users.create({ email: 'a@t.com', password: 'rtdfgtre'})
  return {
    title: "Remix App",
    // ...u
  };
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const data = useLoaderData()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <span className="text-green-500">{JSON.stringify(data)}</span>
      <ul>
        <li
          className="text-green-400"
        >
          <a
            className="text-yellow-500"
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
