export const Query = {
  me: (_, __, { currentUser }) => {
    return currentUser;
  },
};
