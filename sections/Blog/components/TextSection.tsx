// deno-lint-ignore-file react-no-danger
import { HTMLWidget } from "apps/admin/widgets.ts";

/** @title Bloco de texto */
export interface TextSectionProps {
  /** @title Conteúdo */
  content: HTMLWidget;
}

export default function TextSectionBlog({ content }: TextSectionProps) {
  if (!content) return null;

  return (
    <div class="container text-section-blog">
      <div class="max-w-[800px] m-auto py-10 md:py-20">
        <div
          class="deco-blog-textsection-richtext"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <style>{`
      .deco-blog-textsection-richtext * {
        font-size: 15px !important;
        font-weight: 300 !important;
        line-height: 24px !important;
        letter-spacing: 0.9px !important;
      }
    `}</style>
    </div>
  );
}
