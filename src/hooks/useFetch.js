import useSWR from "swr";
import fetcher from "../lib/fetcher";

const useCategory = (endpoint) => {
  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_API_URL}${endpoint}`,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default useCategory;
