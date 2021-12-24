import { getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";
import MenuItem from "../models/menu-item";

export async function getMenuItems() {
  await mongoose.connect(process.env.MONGODB_URL as string);
  const MenuItemModel = getModelForClass(MenuItem);
  return await MenuItemModel.find();
}
