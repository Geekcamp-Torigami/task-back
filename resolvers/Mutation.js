import mongoose from "mongoose"

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
      priority: args.input.priority,
      isCompleted: false,
    };

    const { insertedId } = await db
      .collection("shortTasks")
      .insertOne(newShortTask);
    newShortTask.id = insertedId;
    return newShortTask;
  },

  removeAllTasks: async (_, args, { db, currentUser }) => {
    if (!currentUser) {
      throw new Error("only an authorized user can add a task");
    }
    if (args.input) {
      await db
        .collection("shortTasks")
        .deleteMany({ postedBy: currentUser.id });
    } else {
      await db.collection("tasks").deleteMany({ postedBy: currentUser.id });
    }
  },

  //各タスクの削除mutation
  removeEachTask: async (_, args, { db, currentUser }) => {
    if (!currentUser) {
      throw new Error("only an authorized user can add a task");
    }
    await db.collection("tasks").deleteOne({ id: args.input.id });
  },

  changeCompleted: async (_, args, { db, currentUser }) => {
    if (!currentUser) {
      throw new Error("only an authorized user can add a task");
    }
    if (args.input.isShort) {
      // shorttaskの中から探す
      const result = await db
        .collection("shortTasks")
        .updateOne(
          { _id: new mongoose.Types.ObjectId(args.input.id) },
          { $set: { isCompleted: args.input.isComplete } }
        );
    } else {
      //alltasksの中から探す
      await db
        .collection("tasks")
        .updateOne(
          { _id: new mongoose.Types.ObjectId(args.input.id) },
          { $set: { isCompleted: args.input.isComplete } }
        );
    }
  },
};
