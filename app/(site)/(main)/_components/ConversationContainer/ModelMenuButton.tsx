import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { LuSparkles } from "react-icons/lu";
import { TbBolt } from "react-icons/tb";

interface ModelMenuButtonProps {}

export default function ModelMenuButton({}: ModelMenuButtonProps) {
  const models = [
    {
      key: "mikangpt4",
      name: "MikanGPT 4",
      modelName: "GPT-4",
      description: "With DALL·E, browsing and analysis",
      messagesLimit: 40,
      hoursLimit: 3,
      icon: <LuSparkles />,
      active: true,
    },
    {
      key: "mikangpt3.5",
      name: "MikanGPT 3.5",
      modelName: "GPT-3.5",
      description: "Great for everyday tasks",
      messagesLimit: null,
      hoursLimit: null,
      icon: <TbBolt />,
      active: false,
    },
  ];

  const handleSelect = (model: any) => {
    // Handle the selection logic here
    console.log("Selected model:", model);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 px-3 py-2 text-lg font-medium cursor-pointer group rounded-xl hover:bg-gray-50 radix-state-open:bg-gray-50 ">
          <div className="font-semibold">
            MikanGPT <span className="text-gray-500">4</span>
          </div>

          <FaAngleDown className="text-sm text-gray-400" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {models.map((model, index) => (
          <React.Fragment key={model.key}>
            <DropdownMenuItem
              className="w-full h-full px-5 py-2.5 text-sm cursor-pointer hover:bg-black/5 group"
              onClick={() => handleSelect(model)}
            >
              <div className="flex items-start justify-between gap-6 grow">
                <div>
                  <div className="flex gap-2 ">
                    <span className="text-lg">{model.icon}</span>
                    <div>
                      {model.modelName}
                      <div className="font-light text-gray-400">
                        {model.description}
                      </div>
                      <span className="text-gray-400">
                        Limit {model.messagesLimit} messages /{" "}
                        {model.hoursLimit} hours
                      </span>
                    </div>
                  </div>
                </div>
                {model.active && <FaCircleCheck />}
              </div>
            </DropdownMenuItem>
            {index !== models.length - 1 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
