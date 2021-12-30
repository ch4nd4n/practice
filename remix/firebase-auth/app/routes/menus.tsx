import { Link, Outlet } from "remix";
import Layout from "~/components/layout";

export default function MenusRoute() {
  return (
    <Layout>
      <h1 className="text-2xl pb-4">Menu</h1>
      <nav className="flex space-x-3 pb-2 underline text-cyan-900">
        <Link to="./">List</Link>
        <Link to="./add">Add</Link>
      </nav>
      <Outlet />
    </Layout>
  );
}
