export const Query = {
  me: (_, __, { currentUser }) => {
    return currentUser;
  },

  allTasks: (_, __, { db, currentUser }) => {
    return db.collection("tasks").find({ postedBy: currentUser.id }).toArray();
  },
};
