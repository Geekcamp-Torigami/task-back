let { users } = require("./Mutation.js");

const Query = {
  totalUsers: () => 36,
  allUsers: () => users,
};

module.exports = Query;
