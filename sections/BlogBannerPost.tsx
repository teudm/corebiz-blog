import { Picture, Source } from "apps/website/components/Picture.tsx";
import { BlogPost } from "./types.ts";
import { clx } from "../utils/clx.ts";

export interface Props {
  title?: string;
  post: BlogPost | null;
  ctaLabel?: string;
}

export default function BlogBannerPost({ title = "Blog Breton", post, ctaLabel = "Ver matéria" }: Props) {
  if (!post) return null;
  const { title: postTitle, slug, image } = post;
  if (!image) return null;
  return (
    <div
      id="main-banner"
      class="relative block overflow-hidden w-full my-0 md:mb-4"
    >
      <div class="bg-black/10 w-full h-full pointer-events-none absolute" />
      <Picture preload>
        <Source
          media="(max-width: 767px)"
          fetchPriority="high"
          src={image}
          width={360}
          height={520}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority="high"
          src={image}
          width={1360}
          height={560}
        />
        <img
          class="w-full object-cover md:group-hover:scale-110 duration-3000 ease-in-out"
          loading="eager"
          src={image}
          alt={postTitle}
        />
      </Picture>
      <div
        class={clx(
          "absolute left-0 bottom-0",
          "px-4 pb-16 md:px-[141px] md:pb-[104px]",
          "flex flex-col",
          "h-fit w-full justify-end items-center",
          "bg-carousel-gradient",
        )}
      >
        <h1 class="mb-6 md:mb-4 md:text-h1 text-h1Mobile uppercase text-white text-center">
          {title}
        </h1>
        <span class="mb-6 text-h5 uppercase text-white text-center">
          {postTitle}
        </span>
        <a
          class="btn uppercase text-button w-fit px-[23px] font-medium"
          href={`/blog/${slug}`}
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  )
}