import React from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

function page() {
  return (
    <div>
      <h1>Welcome to Meta Messenger</h1>
      {/* messages */}
      {/* message input */}
      <MessageList />
      <MessageInput />
    </div>
  );
}

export default page;
