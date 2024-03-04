"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Howl } from "howler";

const socketServer = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;

export default function Page() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chatMessages, setChatMessages] = useState<
    { message: string; type: string }[]
  >([]);
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const sound = new Howl({
    src: ["/sounds/goat.mp3"],
  });

  const sendMessage = (formdata: FormData) => {
    const message = formdata.get("message");
    socket?.emit("new-message", { message, roomId });
    setChatMessages((prev) => [
      ...prev,
      { message: message as string, type: "user" },
    ]);
  };

  useEffect(() => {
    const skt = io(socketServer as string, {
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });
    setSocket(skt);

    skt.on("server-message", (msg: string) => {
      setChatMessages((prev) => [...prev, { message: msg, type: "server" }]);
      sound.play();
    });

    skt.on("connected", ({ partnerId, roomId }) => {
      setIsConnected(true);
      setRoomId(roomId);
    });

    skt.on("msg-rcvd", (msg) => {
      alert("server" + msg);
    });

    skt.on("partner-left", () => {
      setIsConnected(false);
      setRoomId(null);
    });

    return () => {
      skt.close();
    };
  }, []);

  return (
    <div
      className="scrollbar-none sm:scrollbar-none lg:scrollbar-none md:scrollbar-none"
      style={{ height: "88vh" }}
    >
      <div id="messages" className="h-5/6 overflow-y-scroll scrollbar-thin">
        {chatMessages?.map((msg, i) => (
          <p
            key={i}
            style={{
              textAlign: msg.type == "user" ? "right" : "left",
              border:
                msg.type === "user" ? "0.5px solid gray" : "0.5px solid green",
              borderRadius: "10px",
              padding: "5px",
              fontSize: "16px",
              margin: "10px",
            }}
          >
            {msg.message}
          </p>
        ))}
      </div>
      <div className="bottom-0 width-full z-10  p-2 backdrop-filter backdrop-blur-sm ">
        <form
          action={sendMessage}
          className="flex flex-row  items-center gap-5 "
        >
          <Input name="message" className="border-none" />
          <Button disabled={!isConnected} type="submit" size={"sm"}>
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
