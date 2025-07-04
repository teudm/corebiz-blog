import { useId } from "preact/hooks";
import { BlogPost } from "./types.ts";
import { useSection, useScript } from "@deco/deco/hooks";
import Image from "apps/website/components/Image.tsx";
import { useLanguage } from "../hooks/useLanguage.ts";
import constants from "../constants/translate.ts";

export interface Props {
  post: BlogPost | null;
}

export default function Template({ post }: Props) {
  if (!post) return null;

  const id = useId();

  const { image, title, date, authors, content = [] } = post;

  const lang = useLanguage();

  const raw = new Date(`${date}T12:00:00`);
  const formattedDate = new Date(raw).toLocaleDateString(lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div id={id}>
      {image && (
        <div id="main-banner" class="w-full mb-4">
          <Image
            className="w-full object-cover aspect-video max-h-[560px]"
            width={600}
            src={image}
          />
        </div>
      )}

      <div class="blog-breton">
        <button
          type="button"
          class="hidden md:flex btn btn-ghost no-animation text-[11px] not-italic font-medium leading-6 tracking-[2.64px] uppercase"
          hx-on:click={useScript(() => {
            event?.stopPropagation();
            const hostname = globalThis.window.location.hostname
            const lastUrl = document.referrer;
            if (lastUrl && new URL(lastUrl).hostname === hostname) {
              globalThis.window.history.back();
            }
            else {
              globalThis.window.location.href = "/"
            }
          })}
        >
          <img
            alt={constants[lang]["back-button"]}
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDE4TDkgMTJMMTUgNiIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="
          />
          {constants[lang]["back-button"]}
        </button>
        <p class="w-full text-center text-[10px] not-italic font-normal leading-4 tracking-[2.4px] uppercase mb-2">
          {formattedDate?.toUpperCase()} - {authors[0]?.name}
        </p>
        <h1 class="w-full max-w-[800px] text-[22px] text-center font-semibold leading-8 tracking-[1.76px] uppercase mx-auto my-0 px-4 text-black">
          {title}
        </h1>

        {content?.map((props) => {
          const section = useSection({
            props: {
              ...props,
            },
          });

          return <div hx-get={section} hx-trigger="load" hx-swap="innerHTML" />;
        })}
      </div>
    </div>
  );
}
