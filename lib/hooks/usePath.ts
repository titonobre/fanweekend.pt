import { useRouter } from "next/router";

export default function usePath(path: string) {
  return `${useRouter().basePath}${path}`;
}
