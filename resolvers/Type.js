import { DateTimeResolver } from "graphql-scalars";

export const Type = {
  User: {
    registeredTasks: (parent, _, { db }) => {
      return db.collection("tasks").find({ postedBy: parent.id }).toArray();
    },
    registeredShortTasks: (parent, _, { db }) => {
      return db
        .collection("shortTasks")
        .find({ postedBy: parent.id })
        .toArray();
    },
  },
  Task: {
    id: (parent) => parent.id || parent._id,
  },
  ShortTask: {
    id: (parent) => parent.id || parent._id,
  },

  DateTime: DateTimeResolver,
};
