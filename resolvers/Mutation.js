export const Mutation = {
  registerTask: async (_, args, { db, currentUser }) => {
    if (!currentUser) {
      throw new Error("only an authorized user can add a task");
    }

    const newTask = {
      postedBy: currentUser.id,
      name: args.input.name,
      category: args.input.category,
      limitDate: args.input.limitDate,
      isTemporary: args.input.isTemporary,
      isCompleted: args.input.isCompleted,
    };

    const newCategory = {
      postedBy: currentUser.id,
      category: args.input.category,
    };

    const { insertedId } = await db.collection("tasks").insertOne(newTask);
    await db.collection("categories").insertOne(newCategory);
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
