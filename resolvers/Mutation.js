export const Mutation = {
  addTask: async (_, args, { db, currentUser }) => {
    if (!currentUser) {
      throw new Error("only an authorized user can add a task");
    }

    const newTask = {
      postedBy: currentUser.id,
      name: args.input,
    };
    const { insertedId } = await db.collection("tasks").insertOne(newTask);
    newTask.id = insertedId;
    return newTask;
  },
};
