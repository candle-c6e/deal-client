const fetcher = async (url) => {
  return fetch(url, { credentials: "include" }).then((res) => res.json());
};

export default fetcher;
