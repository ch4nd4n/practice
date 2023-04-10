export function useApi(url: string) {
  const getData = async () => {
    try {
      const res = await fetch(url);
      const result = await res.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return getData;
}
export default useApi;
