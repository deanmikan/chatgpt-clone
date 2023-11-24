import AuthExamplesAnimation from "@/components/auth/AuthExamplesAnimation";

import dynamic from "next/dynamic";

const AuthForm = dynamic(() => import("@/components/auth/AuthForm"), {
  ssr: false,
});

interface AuthPageProps {}

export default function AuthPage({}: AuthPageProps) {
  return (
    <div
      className="flex min-h-full w-screen flex-col sm:supports-[min-height:100dvh]:min-h-[100dvh] md:grid md:grid-cols-2 lg:grid-cols-[60%_40%]"
      style={{
        backgroundColor: "rgb(255, 255, 219)",
      }}
    >
      <div className="relative hidden flex-1 flex-col justify-center px-5 pt-8 text-[#FE7600] dark:text-[#D292FF] md:flex md:px-6 md:py-[22px] lg:px-8">
        <nav className="left-0 top-8 flex w-full px-6 sm:absolute md:top-[22px] md:px-6 lg:px-8">
          <h1 aria-label="ChatGPT by OpenAI">
            <div className="flex cursor-default items-center text-[20px] font-bold leading-none lg:text-[22px]">
              <div>
                <span>MikanGPT</span>
                <span className="text-3xl leading-none">●</span>
              </div>
            </div>
          </h1>
        </nav>

        <AuthExamplesAnimation />
      </div>

      <div className="relative flex grow flex-col items-center justify-between bg-white px-5 py-8 text-black dark:bg-black dark:text-white sm:rounded-t-[30px] md:rounded-none md:px-6">
        <nav className="flex w-full justify-start px-6 pb-8 md:hidden md:px-6 lg:px-8">
          <h1 aria-label="ChatGPT by OpenAI">
            <div className="flex cursor-default items-center text-[20px] font-bold leading-none lg:text-[22px]">
              <div>
                <span>MikanGPT</span>
                <span className="text-3xl leading-none">●</span>
              </div>
            </div>
          </h1>
        </nav>

        <div className="relative flex w-full grow flex-col items-center justify-center">
          <h2 className="text-center font-bold text-[20px] leading-[1.2] md:text-[32px] md:leading-8">
            Get started
          </h2>
          <div className="mt-5 w-full max-w-[440px]">
            <AuthForm />
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-center ">
          {/* TODO: Add personal logo */}
          <div className="flex justify-center text-[#cdcdcd] md:mb-3">
            <span className="h-[22px] w-auto">Dean Mikan</span>
          </div>
          <div className="py-3 text-xs">
            <a href="#" className="mx-3 text-gray-500" rel="noreferrer">
              Terms of use
            </a>
            <span className="text-gray-600">|</span>
            <a href="#" className="mx-3 text-gray-500" rel="noreferrer">
              Privacy policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
