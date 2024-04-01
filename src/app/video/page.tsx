"use client";

import { Button } from "@/components/ui/button";
import { Move3D } from "lucide-react";
import React, { useRef, useEffect, useState, use } from "react";
import SimplePeer, { Instance } from "simple-peer";
import { Socket, io } from "socket.io-client";
import { Stream } from "stream";

const socketServer = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;

export default function Page() {
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const [hasCameraAccess, setHasCameraAccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const [socket, setSocket] = useState<Socket>();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [peerConnections, setPeerConnections] = useState<Instance[]>([]);
  const peersRef = useRef<Instance[]>([]);

  useEffect(() => {
    const skt = io(`${socketServer}/video`);

    setSocket(skt);

    skt.on("connected", ({ partnerId, roomId }) => {
      setIsConnected(true);
      setRoomId(roomId);
    });

    skt.on("partner-left", () => {
      setIsConnected(false);
      setRoomId(null);
    });

    skt.on("user-joining-peer", ({ roomId, signal: incomingSignal }) => {
      const peer = new SimplePeer({
        initiator: false,
        trickle: false,
        stream: mediaStream as MediaStream,
      });
      setPeerConnections((prev) => [...prev, peer]);
      peer.on("signal", (signal) => {
        skt.emit("returning-signal", { roomId, signal });
      });
      peer.signal(incomingSignal);
    });

    skt?.on("receiving-returned-signal", ({ signal: returned_signal }) => {
      console.log("return signal");
      const myPeer = peersRef.current[0];
      console.log(myPeer);
      myPeer.signal(returned_signal);
    });

    return () => {
      skt.close();
    };
  }, []);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setHasCameraAccess(true);
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error: any) {
        setErrorMessage(error.message);
        console.error("Error accessing camera:", error);
      }
    };
    getVideo();
  }, []);

  useEffect(() => {
    if (roomId && mediaStream && socket) {
      const peer = new SimplePeer({
        initiator: true,
        trickle: false,
        stream: mediaStream as MediaStream,
      });
      peersRef.current.push(peer);
      peer.on("signal", (signal) => {
        socket?.emit("peer-signal", {
          roomId,
          signal,
        });
      });
    }
  }, [roomId, mediaStream, socket]);

  return (
    <>
      {peerConnections?.map((peer, i) => (
        <Video key={i} peer={peer} />
      ))}
      <div>
        <div className="border-2 border-yellow-400">
          <video ref={videoRef} autoPlay muted width={640} height={480} />
        </div>
      </div>
    </>
  );
}

const Video = ({ peer }: { peer: Instance }) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    console.log(peer);
    peer.on("stream", (stream) => {
      console.log("streaming");
      if (ref.current) {
        console.log("current ref is available", stream);
        ref.current.srcObject = stream;
        console.log("refhere", ref.current);
      }
    });
  }, [peer]);

  return (
    <div>
      <div className="border-2 border-yellow-400 h-screen">
      <video ref={ref} autoPlay muted width={640} height={480} />
      </div>
    </div>
  );
};
