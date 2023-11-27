import { LuSparkles } from "react-icons/lu";
import { TbBolt } from "react-icons/tb";

import { Model } from "@/types";

export const models: Model[] = [
  {
    id: "mikangpt4",
    model: "gpt-4-1106-preview",
    name: "MikanGPT",
    version: "4",
    modelDisplayName: "GPT-4",
    description: "With DALL·E, browsing and analysis",
    limit: "Limit 40 messages / 3 hours",
    icon: <LuSparkles />,
  },
  {
    id: "mikangpt3.5",
    model: "gpt-3.5-turbo-1106",
    name: "MikanGPT",
    version: "3.5",
    modelDisplayName: "GPT-3.5",
    description: "Great for everyday tasks",
    icon: <TbBolt />,
  },
];
