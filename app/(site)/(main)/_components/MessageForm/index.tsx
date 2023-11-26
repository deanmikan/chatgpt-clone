import MessageBox from "./MessageBox";
import MessageFormHint from "./MessageFormHint";

interface MessageFormProps {}

export default function MessageForm({}: MessageFormProps) {
  const onboardingHints = [
    {
      title: "Help me pick",
      subtitle: "a gift for my dad who loves fishing",
    },
    {
      title: "Create a content calendar",
      subtitle: "for a TikTok account",
    },
    {
      title: "Write a blog post",
      subtitle: "about the best places to visit in Tokyo",
    },
    {
      title: "Give me ideas",
      subtitle: "for a new YouTube video",
    },
  ];
  return (
    <div className="w-full mx-4 lg:max-w-2xl lg:mx-auto xl:max-w-3xl">
      <form className="flex flex-col">
        <div className="grid grid-cols-2 gap-2 px-2 mb-4">
          {onboardingHints.map((hint) => (
            <MessageFormHint key={hint.title} {...hint} />
          ))}
        </div>

        <MessageBox />
      </form>

      <div className="relative px-2 py-2 text-center text-xs text-gray-600 dark:text-gray-300 md:px-[60px]">
        <span>
          MikanGPT can make mistakes. Consider checking important information.
        </span>
      </div>
    </div>
  );
}
