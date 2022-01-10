import { mongoose, prop } from "@typegoose/typegoose";

/**
 * Typegoose Model representing MenuItem
 */
export default class MenuItem {
  _id?: mongoose.Types.ObjectId;
  @prop({ type: () => String })
  public name!: string;

  @prop({ type: Number })
  public price?: number;
}
