import { MessageSquareMore } from "lucide-react";
import React from "react";

function WaitingScreen() {
  return (
    <div className="flex h-full items-center justify-center">
      <MessageSquareMore
        size={64}
        strokeWidth={1}
        className="animate-bounce"
        style={{ animationDuration: "2s" }}
      />
    </div>
  );
}

export default WaitingScreen;
