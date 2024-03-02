let users = [];

export const Mutation = {
  addUser: (_, args) => {
    const user = {
      githubLogin: args.githubLogin,
      name: args.name,
      avatar: args.avatar,
    };
    users.push(user);
    return user;
  },
};

export { users };
