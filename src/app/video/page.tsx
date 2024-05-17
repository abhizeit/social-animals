"use client";

import React, { useRef, useEffect, useState, use } from "react";
import SimplePeer, { Instance } from "simple-peer";
import { Socket, io } from "socket.io-client";

const socketServer = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [socket, setSocket] = useState<Socket>();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [peerConnections, setPeerConnections] = useState<Instance[]>([]);
  const myPeerRef = useRef<Instance | null>();

  function createOffer(mediaStream: MediaStream) {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: mediaStream as MediaStream,
    });

    myPeerRef.current = peer;

    return peer;
  }

  function createAnswer(mediaStream: MediaStream) {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: mediaStream as MediaStream,
    });

    peer.on("close", () => {
      peer.destroy();
    });

    return peer;
  }

  useEffect(() => {
    if (mediaStream) {
      const skt = io(`${socketServer}/video`);

      setSocket(skt);

      skt.on("connected", ({ partnerId, roomId }) => {
        setRoomId(roomId);
      });

      skt.on("partner-left", () => {
        console.log("partner left");
        setRoomId(null);
        try {
          peerConnections.forEach((peer) => {
            peer.destroy();
          });
          setPeerConnections([]);
          myPeerRef.current?.destroy();
          console.log("peer Destroyed");
          myPeerRef.current = null;
        } catch (e: any) {
          console.log(e);
        }
      });

      skt.on("create-answer", ({ roomId, signal: incomingSignal }) => {
        const peer = createAnswer(mediaStream);
        setPeerConnections((prev) => [...prev, peer]);
        peer.signal(incomingSignal);
        peer.on("signal", (signal) => {
          skt.emit("answer", { roomId, signal });
        });
        peer.on("close", () => {
          peer.destroy();
          setPeerConnections([]);
        });
      });

      skt?.on("peer-response", ({ signal: returned_signal }) => {
        console.log("returned");
        myPeerRef.current?.signal(returned_signal);
      });
    }

    return () => {
      socket?.close();
    };
  }, [mediaStream]);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error: any) {
        console.error("Error accessing camera:", error);
      }
    };
    getVideo();
  }, []);

  useEffect(() => {
    if (roomId && mediaStream && socket) {
      const peer = createOffer(mediaStream);
      peer.on("signal", (signal) => {
        socket?.emit("offer", {
          roomId,
          signal,
        });
      });
      peer.on("close", () => {
        peer.destroy();
      });
    }
  }, [roomId, mediaStream, socket]);

  return (
    <>
      {peerConnections?.map((peer, i) => <Video key={i} peer={peer} />)}
      <div>
        <video
          className="m-auto"
          ref={videoRef}
          autoPlay
          muted
          width={640}
          height={480}
        />
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
      <video
        ref={ref}
        autoPlay
        muted
        width={640}
        height={480}
        className="m-auto"
      />
    </div>
  );
};
