"use client";
import React, { useEffect } from "react";
import fetcher from "../utils/fetchMessages";
import useSWR from "swr";
import MessageComponent from "./MessageComponent";
import { clientPusher } from "../pusher";
import { Message } from "../typings";

function MessageList() {
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

  //useEffect for updating the list of messages
  useEffect(() => {
    const channel = clientPusher.subscribe("messages");
    //subscribe to the messages channel
    //Before your web app can receive the event you publish, your web app needs to subscribe to the messages channel. Do this with pusher.subscribe
    channel.bind("new-message", async (data: Message) => {
      mutate(fetcher, {
        optimisticData: [data, ...messages!],
        //optimisticData is the data that will be shown to the user before the data is actually fetched from the server and is used to make the UI feel more responsive to the user
        rollbackOnError: true,
        //rollbackOnError is used to rollback the optimisticData if there is an error
      });
    });
  }, [messages, mutate, clientPusher]);

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl mx-auto">
      {messages?.map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;
