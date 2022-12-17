"use client";

import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";
import { unstable_getServerSession } from "next-auth/next";
import { Session } from "inspector";

type Props = {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
};

function MessageInput({ session }: Props) {
  // console.log(session);

  //destructuring the session object
  // const { user } = session;
  // //destructuring the user object
  // let { name, email, image } = user;
  // // console.log(name, email, image);
  // //stringifying each of the properties of the user object
  // name = JSON.stringify(user.name);
  // email = JSON.stringify(user.email);
  // image = JSON.stringify(user.image);
  // console.log(name, email, image);

  /*session:{
    user:{
      name:
    }
  }
  */

  const [input, setInput] = useState("");
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    if (!session) return;

    const messageInput = input;
    const id = uuid();
    setInput("");
    const message: Message = {
      id,
      message: messageInput,
      created_at: Date.now(),
      username: session.user.name!,
      profilePic: session.user.image!,
      email: session.user.email!,
      // random:"asda"  random property will not be accepted by the Message type as it is not defined in the Message type in .d.ts file
    };
    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }), //making an object so that we can access it using req.body.message in the api route
      }).then((res) => res.json());
      // console.log(data);
      return [data.message, ...messages!];
    };
    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      className="flex fixed bottom-0 px-10 py-3 space-x-2 w-full bg-white"
      onSubmit={addMessage}
    >
      <input
        type="text"
        disabled={!session}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className="
      flex-1 rounded border focus:outline-none border-gray-300 px-5 py-2  focus:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed
      "
      />
      <button
        disabled={!input}
        type="submit"
        className=" bg-blue-500 hover:bg-blue-700 px-4 text-white rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed "
      >
        Send
      </button>
    </form>
  );
}

export default MessageInput;
