export const usersListKey = (
  query: {
    page?: number;
    limit?: number;
    name?: string;
  }
) => {

  const {
    page = 1,
    limit = 10,
    name = "all",
  } = query;

  return `users:name:${name}:page:${page}:limit:${limit}`;
};