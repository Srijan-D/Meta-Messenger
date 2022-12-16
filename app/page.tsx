import React from "react";
import { Message } from "../typings";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { unstable_getServerSession } from "next-auth/next";
import { Providers } from "./providers";
//Creating server side
//then we swap it with what users sees on the client side to make it more quick
async function page() {
  const data = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`
  ).then((res) => res.json());
  const messages: Message[] = data.messages;
  const session = await unstable_getServerSession();

  // console.log(data);
  return (
    <Providers session={session}>
      <main>
        {/* messages */}
        {/* message input */}
        <MessageList initialMessages={messages} />
        <MessageInput session={session} />
      </main>
    </Providers>
  );
}

export default page;
