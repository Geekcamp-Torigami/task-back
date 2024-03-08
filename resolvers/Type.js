import { DateTimeResolver } from "graphql-scalars";

export const Type = {
  User: {
    registeredTasks: async (_, __, { currentUser, db }) => {
      return await db
        .collection("tasks")
        .find({ postedBy: currentUser.id })
        .toArray();
    },
    registeredShortTasks: async (_, __, { currentUser, db }) => {
      return await db
        .collection("shortTasks")
        .find({ postedBy: currentUser.id })
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
