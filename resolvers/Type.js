export const Type = {
  User: {
    addedTasks: (parent, _, { db }) => {
      console.log("tasks", db.collection("tasks"));
      return db.collection("tasks").find({ postedBy: parent.id }).toArray();
    },
  },
  Task: {
    id: (parent) => parent.id || parent._id,
  },
};
