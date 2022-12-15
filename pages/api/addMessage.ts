// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { serverPusher } from "../../pusher";
import redis from "../../redis";
import { Message } from "../../typings";

type Data = {
  message: Message;
};
type errorData = {
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | errorData>
) {
  if (req.method !== "POST") {
    res.status(405).json({ body: " Method not allowed" });
    return;
  }
  const { message } = req.body;

  const newMessage = {
    ...message,
    created_at: new Date(),
    //replacing timestamp of user  with the timestamp of the server
  };
  //push to redis
  //setting a hash value
  await redis.hset("messages", message.id, JSON.stringify(newMessage));
  //Pusher
  serverPusher.trigger("messages", "new-message", newMessage);
  res.status(200).json({ message: newMessage });
}
