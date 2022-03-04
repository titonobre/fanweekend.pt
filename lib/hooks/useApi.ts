import usePath from "./usePath";

export default function useApi(path: string) {
  return usePath(`/api${path}`);
}
