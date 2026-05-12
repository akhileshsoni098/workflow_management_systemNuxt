import { Document, Types } from "mongoose";

export interface Task extends Document {
  _id: Types.ObjectId;
  projectId: Types.ObjectId;
  title: string;
  description: string;
  assignedUser: Types.ObjectId;
  priority: "Low" | "Medium" | "High";
  status: "Todo" | "In Progress" | "Review" | "Completed";
  dueDate: Date;
}
