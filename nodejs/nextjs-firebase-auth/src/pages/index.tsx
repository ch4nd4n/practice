import LoginButton from "@/components/login-button";
import useApi from "@/hooks/useApi";
import { useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState();
  const getData = useApi("/api/user-detail");
  const handleFetchData = async () => {
    const result = await getData();
    setUserData(result);
  };

  return (
    <main>
      <h1>Login page</h1>
      <LoginButton />
      <div>
        <button onClick={handleFetchData}>Fetch Data</button>
        {userData && (
          <div>
            <code>{JSON.stringify(userData)}</code>
          </div>
        )}
      </div>
    </main>
  );
}
