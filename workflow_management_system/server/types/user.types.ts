import mongoose, { Types, Document } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "Admin" | "Manager" | "Employee";
  createdAt: Date;
}
