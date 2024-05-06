"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Howl } from "howler";
import WaitingScreen from "./waiting-screen";
import { wrap } from "module";
import WaitingForConnection from "./waiting-for-connection";

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
    const skt = io(`${socketServer}/text` as string);

    setSocket(skt);

    skt.on("connection-succesful", (socketId: string) => {
      setIsConnected(true);
    });

    skt.on("server-message", (msg: string) => {
      setChatMessages((prev) => [...prev, { message: msg, type: "server" }]);
      sound.play();
    });

    skt.on("connected", ({ partnerId, roomId }) => {
      setRoomId(roomId);
    });

    skt.on("msg-rcvd", (msg) => {
      alert("server" + msg);
    });

    skt.on("partner-left", () => {
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
      {!isConnected ? (
        <WaitingForConnection />
      ) : !roomId ? (
        <WaitingScreen />
      ) : (
        <>
          <div id="messages" className="h-5/6 overflow-y-scroll scrollbar-thin">
            {chatMessages?.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  justifyContent: msg.type == "user" ? "right" : "left",
                }}
              >
                <p
                  style={{
                    color: msg.type === "user" ? "#18181b" : "#FAFAFA",
                    padding: "10px",
                    fontSize: "14px",
                    margin: "5px",
                    backgroundColor:
                      msg.type === "user" ? "#FAFAFA" : "#27272A",
                    whiteSpace: "wrap",
                    lineHeight: "1rem",
                    borderRadius: "5px",
                  }}
                >
                  {msg.message}
                </p>
              </div>
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
        </>
      )}
    </div>
  );
}
