import { Document, Types } from "mongoose";

export interface ActivityLog extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  actionType: string;
  entityType: "Task" | "Project";
  entityId: Types.ObjectId;
}
