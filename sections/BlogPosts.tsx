import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { ComponentChildren, Fragment } from "preact";
import { BlogPost } from "./types.ts";
import { useId } from "preact/hooks";
import { useSection as useSection } from "@deco/deco/hooks";
export interface CTA {
  text?: string;
}
/** @title {{{title}}} */
export interface Post {
  url?: string;
  title?: string;
  author?: string;
  excerpt?: string;
  image?: ImageWidget;
  date?: string;
  readingTime?: string;
  tags?: string[];
}
export interface Props {
  ctaPagination?: CTA;
  ctaPost?: CTA;
  posts?: BlogPost[] | null;
  pagination?: {
    /**
     * @title First page
     * @description Leave it as 0 to start from the first page
     */
    page?: number;
    /** @title items per page */
    perPage?: number;
  };
}
function Container({ children }: { children: ComponentChildren }) {
  return (
    <div class="container md:py-20 py-6">
      <div class="space-y-8">{children}</div>
    </div>
  );
}

function Skeleton({ label = "Ver matéria" }: { label?: string }) {
  return (
    <div class="flex flex-col gap-4">
      <div class="skeleton w-full " style={{ aspectRatio: "384/400" }}></div>
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-6 w-full"></div>
      <button disabled class="btn btn-ghost text-button uppercase pl-0 w-fit">
        {label}
      </button>
    </div>
  );
}
export default function BlogPosts({
  ctaPagination = { text: "Carregar mais" },
  ctaPost = { text: "Ver matéria" },
  posts,
  pagination: { page = 0, perPage = 6 } = {},
}: Props) {
  const from = perPage * page;
  const to = perPage * (page + 1);
  // It's boring to generate ids. Let's autogen them
  const postList = useId();
  // Get the HTMX link for this section
  const fetchMoreLink = useSection({
    // Renders this section with the next page
    props: {
      pagination: { perPage, page: page + 1 },
    },
  });
  const ContainerComponent = page === 0 ? Container : Fragment;

  return (
    <ContainerComponent>
      <div class="gap-x-10 gap-y-10 md:gap-y-16 grid grid-cols-1 md:grid-cols-3">
        {posts?.slice(from, to).map((post) => (
          <a href={`/blog/${post.slug}`} class="flex flex-col gap-4">
            <Image
              width={384}
              height={400}
              class="object-fit w-full"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={post.image || ""}
              alt={post.image}
              decoding="async"
              loading="lazy"
            />
            <div class="flex flex-col gap-4">
              <div class="flex gap-2 text-caption uppercase">
                <span>
                  {post.date
                    ? new Date(`${post.date}T12:00:00`).toLocaleDateString(
                        "pt-BR",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )
                    : ""}
                </span>
                <span>-</span>
                <span>{post.authors[0]?.name}</span>
              </div>
              <h2 class="text-h5Mobile md:text-h5 uppercase md:pr-6">
                {post.title}
              </h2>
              <button class="btn btn-ghost text-button uppercase pl-0 w-fit">
                {ctaPost.text}
              </button>
            </div>
          </a>
        ))}
      </div>
      {posts && to < posts.length && (
        <div class="flex justify-center w-full" id={postList}>
          <button
            hx-get={fetchMoreLink}
            hx-swap="outerHTML"
            hx-target={`#${postList}`}
            aria-label={ctaPagination.text}
            class="btn btn-ghost border border-black"
          >
            <span class="inline text-xs uppercase font-medium [.htmx-request_&]:hidden tracking-[1px]">
              {ctaPagination.text}
            </span>
            <span class="loading loading-spinner hidden [.htmx-request_&]:block" />
          </button>
        </div>
      )}
    </ContainerComponent>
  );
}

export const LoadingFallback = ({
  ctaPost = { text: "Ver matéria" },
  pagination: { perPage = 6 } = {},
}: Props) => (
  <Container>
    <div class="gap-x-10 gap-y-10 md:gap-y-16 grid grid-cols-1 md:grid-cols-3">
      {Array.from({ length: perPage }).map((_) => (
        <Skeleton label={ctaPost.text} />
      ))}
    </div>
  </Container>
);
