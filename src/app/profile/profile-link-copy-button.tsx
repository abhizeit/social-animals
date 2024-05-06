"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { copyToClipboard } from "@/lib/utils";
import { Share2 } from "lucide-react";

const ProfileLinkCopyButton = ({ uri }: { uri: string }) => {
  const { toast } = useToast();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className="border-2 border-white rounded-full h-10 w-10 flex justify-center items-center animate-spin ml-5"
            style={{ animationDuration: "4s" }}
          >
            <Share2
              strokeWidth={1}
              color="white"
              onClick={() => {
                copyToClipboard(uri)
                  .then(() => {
                    toast({
                      description: "Profile link copied.",
                    });
                  })
                  .catch((e: any) => {
                    console.log(e);
                  });
              }}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy profile link.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProfileLinkCopyButton;
