import mongoose from "mongoose";
import { utcToZonedTime } from "date-fns-tz";
import { formatISO } from "date-fns";
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
      isCompleted: false,
    };

    const { insertedId } = await db.collection("tasks").insertOne(newTask);

    if (args.input.category) {
      const newCategory = {
        postedBy: currentUser.id,
        label: args.input.category,
      };
      await db.collection("categories").insertOne(newCategory);
    }
    newTask.id = insertedId;
    return newTask;
  },

  //短期的タスクの管理
  registerShortTask: async (_, args, { db, currentUser }) => {
    if (!currentUser) {
      throw new Error("only an authorized user can add a task");
    }
    const isoDateString = args.input.expirationDate;
    // ISO形式の日付文字列をDateオブジェクトに変換
    const dateObject = new Date(isoDateString);
    // 日本時間に変換
    const japanTimeDateObject = utcToZonedTime(dateObject, "Asia/Tokyo");
    // 日本時間のISO形式文字列に変換
    const japanTimeISO = formatISO(japanTimeDateObject);
    const newShortTask = {
      postedBy: currentUser.id,
      name: args.input.name,
      category: args.input.category,
      expirationDate: japanTimeISO,
      priority: args.input.priority,
      isCompleted: false,
    };
    const { insertedId } = await db
      .collection("shortTasks")
      .insertOne(newShortTask);
    newShortTask.id = insertedId;
    if (args.input.category) {
      const newCategory = {
        postedBy: currentUser.id,
        label: args.input.category,
      };
      await db.collection("categories").insertOne(newCategory);
    }
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

  removeAllCategories: async (_, args, { db, currentUser }) => {
    if (!currentUser) {
      throw new Error("only an authorized user can add a task");
    }
    await db.collection("categories").deleteMany({ postedBy: currentUser.id });
  },

  //各タスクの削除mutation
  removeEachTask: async (_, args, { db, currentUser }) => {
    if (!currentUser) {
      throw new Error("only an authorized user can add a task");
    }
    if (args.input.isShort) {
      await db
        .collection("shortTasks")
        .deleteOne({ _id: new mongoose.Types.ObjectId(args.input.id) });
    } else {
      await db
        .collection("tasks")
        .deleteOne({ _id: new mongoose.Types.ObjectId(args.input.id) });
    }
  },

  changeCompleted: async (_, args, { db, currentUser }) => {
    if (!currentUser) {
      throw new Error("only an authorized user can add a task");
    }
    if (args.input.isShort) {
      // shorttaskの中から探す
      await db
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
