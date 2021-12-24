import { LoaderFunction, useLoaderData } from "remix";
import Layout from "~/components/layout";
import MenuItem from "~/server/models/menu-item";
import { getMenuItems } from "~/server/services/menu-item-service";

export let loader: LoaderFunction = async () => {
  const items = await getMenuItems();
  return items;
};

export default function TodosIndex() {
  let menuItems = useLoaderData();
  return (
    <Layout>
      <h1>Menu Items</h1>
      {menuItems &&
        menuItems.map((t: MenuItem) => (
          <div key={t._id.toString()}>{t.name}</div>
        ))}
    </Layout>
  );
}
