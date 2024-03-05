export const Query = {
  me: (_, __, { currentUser }) => {
    return currentUser;
  },

  allRegisteredTasks: (_, __, { db, currentUser }) => {
    return db.collection("tasks").find({ postedBy: currentUser.id }).toArray();
  },
};
