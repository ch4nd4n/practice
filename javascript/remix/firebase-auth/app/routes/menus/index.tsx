import { LoaderFunction, useLoaderData } from "remix";
import MenuItem from "~/server/models/menu-item";
import { getMenuItems } from "~/server/services/menu-item-service";

export let loader: LoaderFunction = async (): Promise<MenuItem[]> => {
  return await getMenuItems();
};

export default function TodosIndex() {
  let menuItems = useLoaderData();
  return (
    <div>
      <h1 className="text-xl">Menu Items</h1>
      <table className="table-auto">
        <thead>
          <th className="p-2">Name</th>
          <th className="p-2">price</th>
        </thead>
        <tbody>
          {menuItems &&
            menuItems.map((t: MenuItem, index: number) => (
              <tr key={t._id ? t._id.toString() : index}>
                <td className="p-2">{t.name}</td>
                <td className="p-2">{t.price ? t.price / 100 : "NA"}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
