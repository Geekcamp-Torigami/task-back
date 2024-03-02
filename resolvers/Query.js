import { users } from "./Mutation.js";
export const Query = {
  totalUsers: () => 36,
  allUsers: () => users,
};
