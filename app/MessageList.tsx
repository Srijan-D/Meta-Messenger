"use client";
import React, { useEffect } from "react";
import fetcher from "../utils/fetchMessages";
import useSWR from "swr";
import MessageComponent from "./MessageComponent";
import { clientPusher } from "../pusher";
import { Message } from "../typings";

function MessageList() {
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

 

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl mx-auto">
      {messages?.map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;
