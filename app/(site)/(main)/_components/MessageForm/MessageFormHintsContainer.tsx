import MessageFormHint from "./MessageFormHint";

interface MessageFormHintsContainerProps {}

export default function MessageFormHintsContainer({}: MessageFormHintsContainerProps) {
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
    <div className="grid grid-cols-2 gap-2 px-2 mb-4">
      {onboardingHints.map((hint) => (
        <MessageFormHint key={hint.title} {...hint} />
      ))}
    </div>
  );
}
