import { getModelForClass } from "@typegoose/typegoose";
import MenuItem from "../models/menu-item";

const MenuItemModel = getModelForClass(MenuItem);
export async function getMenuItems(): Promise<MenuItem[]> {
  const items = await MenuItemModel.find();
  return items ? items : [];
}

export async function createMenuItem(data: MenuItem): Promise<MenuItem> {
  console.log({ data });
  const persistedObj = await MenuItemModel.create(data);
  return persistedObj;
}
