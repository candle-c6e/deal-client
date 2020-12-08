const fetchApi = async (url, params) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
    ...params,
  });
  const { success, data } = await response.json();
  return { success, data };
};

export default fetchApi;
