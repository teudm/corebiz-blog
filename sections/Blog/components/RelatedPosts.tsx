import { type BlogPost } from "../../types.ts";
import { AppContext } from "../../../mod.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  /** @title Subtítulo */
  subtitle?: string;
  /** @title Título */
  title?: string;
  /**
   * @title Texto CTA
   * @description O texto que aparece no botão do card de post
   */
  CTAText?: string;
  /**
   * @title Integração
   * @description Não alterar
   */
  post: BlogPost | null;
}

export default function RelatedPostsSection(
  props: Awaited<ReturnType<typeof loader>>
) {
  if (!props) return null;

  const { relatedPosts, title, subtitle, CTAText } = props;

  if (!relatedPosts) return null;

  return (
    <div class="py-8 md:container overflow-hidden">
      <div class="max-md:container md:mb-10 mb-8">
        <p class="mb-2 text-caption uppercase">{subtitle}</p>
        <h3 class="text-h4Mobile md:text-h4 uppercase">{title}</h3>
      </div>
      <div class="gap-x-4 md:gap-x-10 flex overflow-auto max-md:px-6 scroll-smooth snap-x snap-mandatory">
        {relatedPosts.map(post => (
          <a href={`/blog/${post.slug}`} class="flex flex-col gap-4 snap-center max-md:min-w-full">
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
            <div class="flex flex-col gap-4 max-md:items-center">
              <div class="flex gap-2 text-caption uppercase max-md:justify-between max-md:2-full">
                <span>
                  {post.date
                    ? new Date(post.date).toLocaleDateString("pt-BR", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : ""}
                </span>
                <span>-</span>
                <span>{post.authors[0]?.name}</span>
              </div>
              <h2 class="text-h5Mobile md:text-h5 uppercase md:pr-6 max-md:text-center">
                {post.title}
              </h2>
              <button class="btn btn-ghost text-button uppercase pl-0 w-fit">
                {CTAText}
              </button>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export async function loader(
  {
    post,
    subtitle = "Leia mais",
    title = "Posts relacionados",
    CTAText = "Ver matéria",
  }: Props,
  _req: Request,
  ctx: AppContext
) {
  if (!post) return null;
  const categories = post.categories.map(item => item.slug);
  if (!categories || categories.length < 1) return null;
  const relatedPosts = (await ctx.invoke("blog/loaders/BlogRelatedPosts.ts", {
    count: 3,
    sortBy: "date_desc",
    slug: categories,
    excludePostSlug: post.slug,
  })) as BlogPost[] | null;
  return { relatedPosts, subtitle, title, CTAText };
}
