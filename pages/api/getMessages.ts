import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";
import { Message } from "../../typings";

type Data = {
  messages: Message[];
};

type ErrorData = {
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) 

{
  if (req.method !== "GET") {
    res.status(405).json({ body: " Method not allowed" });
    return;
  }
  
  const messagesRes = await redis.hvals("messages");//Fetching on the basis of the ids that is associated with each message 
  
  const messages: Message[] = messagesRes
  
    .map((message) => JSON.parse(message)) //in the redis database it is quite clear that the values are being stored in JSON format hence parsing is required before we can get all the messages stored 
    .sort((a, b) => b.created_at - a.created_at);   
  
  //sorting the messages based on the timeline

    res.status(200).json({ messages });
}
