"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { HiInformationCircle } from "react-icons/hi2";

export default function ChatInfo() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <HiInformationCircle className="text-gray-500 hover:text-gray-700" size={20} />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content
          side="bottom"
          align="end"
          className="bg-gray-900 text-white text-sm rounded-lg px-3 py-2 shadow-xl z-50 max-w-xs"
        >
          This chatbot is powered by AI. Responses may not always be accurate.
          <Tooltip.Arrow className="fill-gray-900" />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
