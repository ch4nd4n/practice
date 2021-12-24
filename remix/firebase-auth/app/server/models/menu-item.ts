import { mongoose, prop } from "@typegoose/typegoose";

export default class MenuItem {
  _id!: mongoose.Types.ObjectId;
  @prop({ type: () => String })
  public name!: string;
}
