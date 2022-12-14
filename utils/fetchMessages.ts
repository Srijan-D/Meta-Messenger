import { Message } from "../typings";
//importing the Message interface from typings.ts

const fetcher = async () => {
  
  const res = await fetch("/api/getMessages");
  //api endpoint to get messages from upstash
  const data = await res.json();
  const messages: Message[] = data.messages;
  //messages is an array of Message type
  return messages;
};
export default fetcher;
