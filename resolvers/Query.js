export const Query = {
  me: (_, __, { currentUser }) => {
    return currentUser;
  },

  allRegisteredTasks: async (_, __, { db, currentUser }) => {
    return await db
      .collection("tasks")
      .find({ postedBy: currentUser.id })
      .toArray();
  },

  allRegisteredShortTasks: async (_, __, { db, currentUser }) => {
    return await db
      .collection("shortTasks")
      .find({ postedBy: currentUser.id })
      .toArray();
  },

  allCategories: async (_, __, { db, currentUser }) => {
    return await db
      .collection("categories")
      .find({ postedBy: currentUser.id })
      .toArray();
  },
};
