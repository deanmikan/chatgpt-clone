import { PROMPT_COMPLETION_EXAMPLES } from "./constants";

interface AuthExamplesAnimationProps {}

export default function AuthExamplesAnimation({}: AuthExamplesAnimationProps) {
  // TODO: Add nice animations

  const example =
    PROMPT_COMPLETION_EXAMPLES[
      Math.floor(Math.random() * PROMPT_COMPLETION_EXAMPLES.length)
    ];
  const completion = example.completions[0];

  return (
    <div
      className="flex flex-col text-[32px] leading-[1.2] md:text-[40px]"
      aria-hidden="true"
    >
      <div className="absolute left-0 top-1/2 flex w-full flex-col px-5 transition-[transform,opacity] duration-500 md:pl-6 md:pr-8 lg:pl-8 lg:pr-10 opacity-100 translate-y-[calc(-50%-1em-16px)]">
        <div className="relative font-bold">{example.prefix}</div>
        <div className="relative">
          <div
            key={completion}
            className="absolute left-0 top-0 max-w-[650px] transition-opacity duration-300"
          >
            {completion.split(" ").map((word) => (
              <span
                key={word}
                className="inline transition-opacity duration-300"
              >
                {" "}
                {word}
              </span>
            ))}{" "}
            <span className="inline-block font-circle delay-[300ms]">
              <span> </span>●
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
