import { LiveReload, LoaderFunction, useLoaderData } from "remix";
import mongoose from "mongoose";
import Todo from "./models/Todo";

mongoose.connect(
  "mongodb://root:example@localhost:27017/chandan_vercel_dev?authSource=admin",
  (error) => {
    if (!error) return console.info("Mongo connected");
    console.error(error);
  }
);
export let loader: any = async () => {
  return await Todo.find({});
};

const TodoList = (todos: any) => {
  return (
    <ul>
      {todos.map((todo: any) => (
        <li key={todo._id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default function App() {
  const data = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Remix: Todo</title>
      </head>
      <body>
        <h1>Mongo Todo List</h1>
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
        {data && TodoList(data)}
      </body>
    </html>
  );
}
