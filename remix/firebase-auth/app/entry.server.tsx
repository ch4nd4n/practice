import { renderToString } from "react-dom/server";
import { RemixServer } from "remix";
import type { EntryContext } from "remix";
import { connect } from "mongoose";

// Establish MongoDB connection once server boots up
connect(process.env.MONGODB_URL as string)
  .then((data) => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log({ mongoErr: err });
  });

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
