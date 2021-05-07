export default () => {
  const token = window.localStorage.getItem('token');
  if (!token) {
    const error = new Error('Unauthorized');
    throw error;
  }
  const payload = {
    headers: {
      authorization: token,
    },
  };
  return payload;
};
