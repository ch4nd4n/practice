import { getFirebaseUser } from "@/middleware/firebase";
import { NextPageContext } from "next";
import qs from "querystring";
import { User } from "firebase/auth";

export default function Dashboard(user: User) {
  return (
    <>
      <h1>Dashboard</h1>
      <p>Logged in as {user.email}</p>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const cookies = qs.decode(context.req?.headers?.cookie ?? "");
  if (cookies && cookies.token) {
    const token = getStringValue(cookies?.token);
    const user = await getFirebaseUser(token);
    return {
      props: user,
    };
  }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

function getStringValue(value: string | string[]): string {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}
