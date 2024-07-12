import { useSearchParams } from "next/navigation";

function useQuery() {
  const searchParams = useSearchParams().toString();

  const params = new URLSearchParams(searchParams);

  function removeQuery(key: string, value?: string) {
    params.delete(key, value);
  }

  function updateQuery(key: string, value?: string) {
    if (!key) return;
    params.delete(key);

    if (value) {
      return `${key}=${value}${params.size > 0 ? `&${params}` : ""}`;
    } else {
      return `${params.size > 0 ? `${params}` : ""}`;
    }
  }

  return { updateQuery, removeQuery };
}

export default useQuery;
