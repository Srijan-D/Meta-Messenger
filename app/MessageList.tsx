"use client";
import React, { useEffect } from "react";
import fetcher from "../utils/fetchMessages";
import useSWR from "swr";
import MessageComponent from "./MessageComponent";
import { clientPusher } from "../pusher";
import { Message } from "../typings";

type Props = {
  initialMessages: Message[];
};

function MessageList({ initialMessages }: Props) {
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");
    //subscribe to the messages channel
    //Before your web app can receive the event you publish, your web app needs to subscribe to the messages channel. Do this with pusher.subscribe
    channel.bind("new-message", async (data: Message) => {
      if (messages?.find((message) => message.id === data.id)) return;
      //if u r the sender no need to update the cache as the message
      if (!messages) mutate(fetcher); //causes error if messages is null
      else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          //optimisticData is the data that will be shown to the user before the data is actually fetched from the server and is used to make the UI feel more responsive to the user
          rollbackOnError: true,
          //rollbackOnError is used to rollback the optimisticData if there is an error
        });
      }
    });
    //now we need to close the connection and unsubscribe from the channel
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl mx-auto">
      {(messages || initialMessages)?.map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;
