import { useUser } from "@/firebase/user-context";

export function useApi(url: string) {
  const { authUser } = useUser();
  const getData = async () => {
    try {
      const accesstoken = await authUser?.getIdToken();
      if (accesstoken) {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            accesstoken,
          },
        });
        const result = await res.json();
        return result;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return getData;
}
export default useApi;
