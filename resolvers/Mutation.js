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
      isCompleted: args.input.isCompleted,
      priority: args.input.priority,
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

  //短期的タスクの管理
  registerShortTask: async (_, args, { db, currentUser }) => {
    if (!currentUser) {
      throw new Error("only an authorized user can add a task");
    }

    const newShortTask = {
      postedBy: currentUser.id,
      name: args.input.name,
      category: args.input.category,
      expirationDate: args.input.expirationDate,
      isCompleted: args.input.isCompleted,
      priority: args.input.priority,
    };

    const { insertedId } = await db
      .collection("shortTasks")
      .insertOne(newShortTask);
    newShortTask.id = insertedId;
    return newShortTask;
  },

  removeAllTasks: async (_, __, { db, currentUser }) => {
    if (!currentUser) {
      throw new Error("only an authorized user can add a task");
    }

    await db.collection("tasks").deleteMany({ postedBy: currentUser.id });
  },

  //各タスクの削除mutation
  removeEachTask: async (_, args, { db, currentUser }) => {
    if (!currentUser) {
      throw new Error("only an authorized user can add a task");
    }
    console.log(args.input);
    await db.collection("tasks").deleteOne({ id: args.input.id });
  },
};
