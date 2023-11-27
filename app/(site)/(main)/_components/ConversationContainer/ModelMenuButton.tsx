import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettingsStore } from "@/store/settings";
import { Model } from "@/types";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { models } from "../../_constants/models";

interface ModelMenuButtonProps {}

export default function ModelMenuButton({}: ModelMenuButtonProps) {
  const selectedModelId = useSettingsStore((state) => state.selectedModelId);
  const setSelectedModelId = useSettingsStore(
    (state) => state.setSelectedModelId
  );
  const handleSelect = (model: any) => {
    console.log("model", model.id);

    setSelectedModelId(model.id);
  };

  const selectedModel = models.find((model) => model.id === selectedModelId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {selectedModel && (
          <button className="flex items-center gap-1 px-3 py-2 text-lg font-medium cursor-pointer group rounded-xl hover:bg-gray-50 radix-state-open:bg-gray-50 ">
            <div className="font-semibold">
              {selectedModel.name}{" "}
              <span className="text-gray-500">{selectedModel.version}</span>
            </div>

            <FaAngleDown className="text-sm text-gray-400" />
          </button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {models.map((model, index) => (
          <React.Fragment key={model.id}>
            <DropdownMenuItem
              className="w-full h-full px-5 py-2.5 text-sm cursor-pointer hover:bg-black/5 group"
              onClick={() => handleSelect(model)}
            >
              <div className="flex items-start justify-between gap-6 grow">
                <div>
                  <div className="flex gap-2 ">
                    <span className="text-lg">{model.icon}</span>
                    <div>
                      {model.modelDisplayName}
                      <div className="font-light text-gray-400">
                        {model.description}
                      </div>
                      {model.limit && (
                        <span className="text-gray-400">{model.limit}</span>
                      )}
                    </div>
                  </div>
                </div>
                {model.id == selectedModelId && <FaCircleCheck />}
              </div>
            </DropdownMenuItem>
            {index !== models.length - 1 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
