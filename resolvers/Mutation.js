let users = [];

const Mutation = {
  addUser: (_, args) => {
    console.log(args);
    const user = {
      githubLogin: args.githubLogin,
      name: args.name,
      avatar: args.avatar,
    };
    users.push(user);
    return user;
  },
};

module.exports = { Mutation, users };
