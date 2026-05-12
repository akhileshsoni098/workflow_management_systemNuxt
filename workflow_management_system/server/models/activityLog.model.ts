import mongoose from "mongoose";
import { ActivityLog } from "../types/activityLog.types";

const ObjectId = mongoose.Schema.Types.ObjectId;

const activityLogSchema = new mongoose.Schema<ActivityLog>(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    // api call se pata chalega ki user ne kya action perform kiya hai
    actionType: {
      type: String,
      required: true,
    },

    entityType: {
      type: String,
      enum: ["Task", "Project"],
      required: true,
    },
    // jo action perform hui uska id hoga chahe wo task ho ya project
    entityId: {
      type: ObjectId,
      required: true,
    },
  },
  { timestamps: true },
);

const ActivityLogModel = mongoose.model<ActivityLog>(
  "Activity_Logs",
  activityLogSchema,
);

export default ActivityLogModel;
