export const Mutation = {
  registerTask: async (_, args, { db, currentUser }) => {
    if (!currentUser) {
      throw new Error("only an authorized user can add a task");
    }

    const newTask = {
      postedBy: currentUser.id,
      name: args.input.name,
      limitDate: args.input.limitDate,
    };
    const { insertedId } = await db.collection("tasks").insertOne(newTask);
    newTask.id = insertedId;
    return newTask;
  },

  removeAllTasks: async (_, __, { db, currentUser }) => {
    if (!currentUser) {
      throw new Error("only an authorized user can add a task");
    }

    await db.collection("tasks").deleteMany({ postedBy: currentUser.id });
  },
};
