"use client";

import Link from "next/link";
import Anthropic from "@/components/icons/anthropic";
import DeepSeek from "@/components/icons/deepseek";
import Gemini from "@/components/icons/gemini";
import Grok from "@/components/icons/grok";
import MistralAI from "@/components/icons/mistral";
import OpenAI from "@/components/icons/open-ai";
import { Button } from "@/components/ui/button";
import ClaudeAI from "./icons/claude";



const AI_PROVIDERS = [
  {
    name: "Anthropic",
    Icon: Anthropic,
    fillClass: "fill-black dark:fill-white",
  },
  { name: "OpenAI", Icon: OpenAI, fillClass: "fill-black dark:fill-white" },
  { name: "DeepSeek", Icon: DeepSeek, fillClass: "" },
  { name: "Gemini", Icon: Gemini, fillClass: "" },
  {
    name: "Mistral AI",
    Icon: MistralAI,
    fillClass: "fill-black dark:fill-white",
  },
  { name: "Grok", Icon: Grok, fillClass: "fill-black dark:fill-white" },
  { name: "Claude", Icon: ClaudeAI, fillClass: "fill-black dark:fill-white" },
];

export default function HeroSection() {
return (
    <section className="relative mx-2 mt-1 mb-4 flex min-h-[calc(100vh-5.5rem)] w-full items-center justify-center overflow-hidden rounded-xl py-6 sm:mx-4 sm:py-10">
      {/* Large "Sonae" text in background - vertical on right side */}
      <div
        className="-right-24 pointer-events-none absolute bottom-12 origin-bottom-right"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="select-none font-bold text-[12rem] text-black/3 tracking-tighter sm:text-[14rem] md:text-[16rem] lg:text-[18rem] dark:text-white/3">          
          Super
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full px-4">
        {/* Centered content */}
        <div className="space-y-8 text-center">
          {/* Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center text-black/70 text-md tracking-tighter dark:text-white/70">
              {/* Agents built for developers.              */}
              Agencia de Viajes en Monterrey
            </div>
          </div>

          <h1 className="font-semibold text-4xl tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Agencia de Viajes, <br />
            al Alcance,{" "}
            <span className="text-red-500/85 dark:text-red-500/85">
              para tí.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base text-black/60 tracking-tighter sm:text-lg md:text-xl dark:text-white/60">
            Experience the next generation of AI-powered eyewear. Seamlessly
            blending cutting-edge technology with sophisticated style.
          </p>

          <div className="flex items-center justify-center gap-4 pt-2">
            <Button
              asChild
              className="group relative h-9 overflow-hidden rounded-lg bg-black px-8 text-white tracking-tighter transition-all duration-300 hover:bg-black/90 sm:h-10 sm:px-4 dark:bg-white dark:text-black dark:hover:bg-white/90"
              size="lg"
            >
              <Link href="/login">
                <span className="group-hover:-translate-y-full relative inline-block transition-transform duration-300 ease-in-out">
                  <span className="block opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                    Get Started for Free
                  </span>
                  <span className="absolute top-full left-0 block opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Get Started for Free
                  </span>
                </span>
              </Link>
            </Button>
            <Button
              asChild
              className="h-9 rounded-lg border border-black/10 border-solid px-8 text-black tracking-tighter transition-all duration-300 hover:bg-black/5 sm:h-10 sm:px-4 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
              size="lg"
              variant="ghost"
            >
              <Link href="/#pricing">VIEW PRICING</Link>
            </Button>
            
          </div>

          <div className="flex items-center justify-center gap-8 pt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="-space-x-3 flex">
                <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white shadow-md transition-all hover:z-10 hover:scale-110 dark:border-black">
                  <div className="flex h-full w-full items-center justify-center bg-black dark:bg-white">
                    <span className="font-semibold text-white text-xs dark:text-black">
                      JD
                    </span>
                  </div>
                </div>
                <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white shadow-md transition-all hover:z-10 hover:scale-110 dark:border-black">
                  <div className="flex h-full w-full items-center justify-center bg-black dark:bg-white">
                    <span className="font-semibold text-white text-xs dark:text-black">
                      SA
                    </span>
                  </div>
                </div>
                <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white shadow-md transition-all hover:z-10 hover:scale-110 dark:border-black">
                  <div className="flex h-full w-full items-center justify-center bg-black dark:bg-white">
                    <span className="font-semibold text-white text-xs dark:text-black">
                      MK
                    </span>
                  </div>
                </div>
                <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-black/20 border-dashed bg-white shadow-md transition-all hover:z-10 hover:scale-110 dark:border-white/20 dark:bg-black">
                  <span className="font-semibold text-black text-xs dark:text-white">
                    +9
                  </span>
                </div>
              </div>
              <span className="text-black/50 tracking-tight dark:text-white/50">
                <span className="font-medium text-black/70 dark:text-white/70">
                  2.5k+
                </span>{" "}
                developers
              </span>
            </div>
            <div className="h-4 w-px bg-black/10 dark:bg-white/10" />
            <div className="flex items-center gap-1.5">
              <div className="flex">
                <svg
                  className="h-4 w-4 fill-black dark:fill-white"
                  viewBox="0 0 20 20"
                >
                  <title>5.0 star rating</title>
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg
                  className="h-4 w-4 fill-black dark:fill-white"
                  viewBox="0 0 20 20"
                >
                  <title>5.0 star rating</title>
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg
                  className="h-4 w-4 fill-black dark:fill-white"
                  viewBox="0 0 20 20"
                >
                  <title>5.0 star rating</title>
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg
                  className="h-4 w-4 fill-black dark:fill-white"
                  viewBox="0 0 20 20"
                >
                  <title>5.0 star rating</title>
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <svg
                  className="h-4 w-4 fill-black dark:fill-white"
                  viewBox="0 0 20 20"
                >
                  <title>5.0 star rating</title>
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              </div>
              <span className="text-black/50 tracking-tight dark:text-white/50">
                5.0 rating
              </span>
            </div>
          </div>

          {/* AI Providers Section */}
          <div className="space-y-6 pt-16">
            <div className="flex flex-col items-center gap-2">
              <span className="font-medium text-black/40 text-xs uppercase tracking-wider dark:text-white/40">
                Integrated AI Models
              </span>
              <div className="h-px w-12 bg-linear-to-r from-transparent via-black/20 to-transparent dark:via-white/20" />
            </div>

            <div className="mx-auto flex max-w-full items-center justify-center gap-3 overflow-x-auto sm:gap-4">
              {AI_PROVIDERS.map((provider) => (
                <div
                  className="group flex cursor-pointer flex-col items-center gap-3 rounded-xl border border-black/15 border-dashed px-16 py-6 transition-all duration-300 hover:border-black/30 hover:bg-black/2 dark:border-white/15 dark:hover:border-white/30 dark:hover:bg-white/2"
                  key={provider.name}
                >
                  <provider.Icon
                    className={`h-9 w-9 transition-transform duration-300 group-hover:scale-110 ${provider.fillClass}`}
                  />
                  <span className="font-medium text-black/50 text-xs tracking-tight transition-colors group-hover:text-black/70 dark:text-white/50 dark:group-hover:text-white/70">
                    {provider.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
