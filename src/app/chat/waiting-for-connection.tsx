import { SatelliteDish } from "lucide-react";
import React from "react";

function WaitingForConnection() {
  return (
    <div className="flex h-full items-center justify-center">
      <div>
        <SatelliteDish
          size={64}
          strokeWidth={1}
          className="animate-bounce"
          style={{ animationDuration: "2s" }}
        />
        {/* <p>connecting</p> */}
      </div>
    </div>
  );
}

export default WaitingForConnection;
