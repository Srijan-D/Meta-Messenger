import Pusher from "pusher";
import ClientPusher from "pusher-js";

//backend
export const serverPusher = new Pusher({
  appId: "",
  key: "",
  secret: "",
  cluster: "ap2",
  useTLS: true,
});

//frontend
export const clientPusher = new ClientPusher("", {
  cluster: "ap2",
  forceTLS: true,
});
