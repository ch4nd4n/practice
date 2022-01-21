import { LoaderFunction, useLoaderData } from "remix";
import { requireUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const decodedClaims = await requireUserId(request);
  return { decodedClaims };
};

export default function DashboardIndex() {
  const actionData = useLoaderData();
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl">PersonalDashboard</h1>
      <p>
        Logged in as{" "}
        <span className="bg-red-200 italic ml-2">
          {actionData.decodedClaims.email}
        </span>
      </p>
      <form action="/logout" method="post">
        <button type="submit" className="button">
          Logout
        </button>
      </form>
    </div>
  );
}
