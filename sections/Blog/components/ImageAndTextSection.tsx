// deno-lint-ignore-file react-no-danger
import { Picture } from "apps/website/components/Picture.tsx";
import { type ImageWidget } from "apps/admin/widgets.ts";
import { type HTMLWidget } from "apps/admin/widgets.ts";

/** @title Imagem e Texto */
export interface ImageAndTextSectionProps {
  image: ImageWidget;
  text: HTMLWidget;
}

export default function ImageAndTextSection({
  image,
  text,
}: ImageAndTextSectionProps) {
  if (!image || !text) return null;

  return (
    <div class="flex max-lg:flex-wrap items-center gap-4 mb-4 lg:px-4">
      <Picture class="w-full lg:w-1/2">
        <img class="w-full" src={image} alt="Imagem 1" />
      </Picture>
      <div
        class="w-full lg:w-1/2 deco-blog-imageandtext-richtext py-8 lg:py-0 px-4 lg:px-0"
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <style>{`
      .deco-blog-imageandtext-richtext * {
        font-size: 15px !important;
        font-style: normal !important;
        font-weight: 300 !important;
        line-height: 1.5rem !important;
        letter-spacing: 0.9px !important;
      }
    `}</style>
    </div>
  );
}
