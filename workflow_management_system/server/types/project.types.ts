import { Document, Types } from "mongoose";
import { IUser } from "./user.types";

export interface Project extends Document {

  _id: Types.ObjectId;

  name: string;

  description?: string;

  createdBy: string | IUser;

  assignedUsers: ( string | IUser)[];
}


// export interface ProjectInput extends Document {
//   name: string;

//   description?: string;

//   assignedUsers: string[];
// }