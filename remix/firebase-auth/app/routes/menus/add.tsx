import { Form, redirect } from "remix";
import { createMenuItem } from "~/server/services/menu-item-service";

export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const price = formData.get("price") as any;
  if (name) {
    await createMenuItem({ name, price });
    return redirect("./menus");
  }
  return null;
};

export default function MenuAdd() {
  return (
    <Form method="post" action="./" className="max-w-xs">
      <label className="block pb-5">
        <span className="block text-sm font-medium text-gray-700">
          Menu Item Name
        </span>
        <input
          type="text"
          name="name"
          className="form-input"
          placeholder="Ex. Roti/Naan"
        />
      </label>
      <label className="block pb-5">
        <span className="block text-sm font-medium text-gray-700">
          Price(in paise)
        </span>
        <input
          type="number"
          placeholder="Ex. 10000 for Rs 100"
          name="price"
          className="form-input"
        />
      </label>
      <button type="submit" className="btn rounded pr-4 pl-4">
        Save
      </button>
    </Form>
  );
}
