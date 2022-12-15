import React from "react";
import { Message } from "../typings";
import Image from "next/image";

type Props = {
  message: Message;
};

function MessageComponent({ message }: Props) {
  const isUser = false;
  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          height={10}
          width={50}
          alt="Profile Picture"
          src={message.profilePic}
          className="rounded-full mx-2"
        />
      </div>
      <div>
        <p
          className={`text-[0.7rem] px-[2px] pb-[2px] ${
            isUser ? "text-blue-400 text-right" : "text-red-400 text-left"
          }`}
        >
          {message.username}
        </p>
        <div className="flex flex-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white ${
              isUser ? "bg-blue-500 ml-auto order-2" : "bg-red-400 "
            }`}
          >
            <p>{message.message}</p>
          </div>
          <p className={`text-[0.65rem] italic px-2 text-gray-300 mt-auto ${isUser && "text-right"}`}>
            {new Date(message.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageComponent;
