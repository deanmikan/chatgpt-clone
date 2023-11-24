export interface PromptCompletionExample {
  prefix: string;
  completions: string[];
}

export const PROMPT_COMPLETION_EXAMPLES: PromptCompletionExample[] = [
  {
    prefix: "Help me pick",
    completions: [
      "an outfit that will look good on camera",
      "a gift for my dad who loves fishing",
    ],
  },
  {
    prefix: "Write a text",
    completions: [
      "asking a friend to be my plus-one at a wedding",
      "that goes with a kitten gif for a friend having a rough day",
    ],
  },
  {
    prefix: "Summarize this article",
    completions: ["into three key points", "as a table of pros and cons"],
  },
  {
    prefix: "Help me debug",
    completions: [
      "why the linked list appears empty after I've reversed it",
      "a Python script automating daily reports",
    ],
  },
  {
    prefix: "Brainstorm names",
    completions: [
      "for my fantasy football team",
      "for an orange cat we're adopting from the shelter",
    ],
  },
  {
    prefix: "Write a thank-you note",
    completions: [
      "to my interviewer",
      "to our babysitter for the last-minute help",
    ],
  },
  {
    prefix: "Give me ideas",
    completions: [
      "for what to do with my kids' art",
      "for a customer loyalty program in a small bookstore",
    ],
  },
  {
    prefix: "Plan a trip",
    completions: [
      "to see the northern lights in Norway",
      "to experience Seoul like a local",
    ],
  },
  {
    prefix: "Draft an email",
    completions: [
      "to request a quote from local plumbers",
      "requesting a deadline extension for my project",
    ],
  },
  {
    prefix: "Recommend a dish",
    completions: [
      "to bring to a potluck",
      "to impress a date who's a picky eater",
    ],
  },
  {
    prefix: "Improve my post",
    completions: [
      "for hiring a store associate",
      "for selling a used vacuum in good condition",
    ],
  },
  {
    prefix: "Suggest fun activities",
    completions: [
      "for a family of 4 to do indoors on a rainy day",
      "for a team-building day with remote employees",
    ],
  },
];
