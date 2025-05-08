import { Picture } from "apps/website/components/Picture.tsx";
import { type ImageWidget } from "apps/admin/widgets.ts";

/** @title Imagem Duas Colunas */
export interface ImageTwoColumnSectionProps {
  imageOne: ImageWidget;
  imageTwo: ImageWidget;
}

export default function ImageTwoColumnSection({
  imageOne,
  imageTwo,
}: ImageTwoColumnSectionProps) {
  if (!imageOne || !imageTwo) return null;

  return (
    <Picture class="flex flex-wrap w-full mb-4 lg:px-4">
      <img
        src={imageOne}
        alt="Imagem 1"
        class="w-full lg:w-1/2 lg:pr-2 mb-4 lg:mb-0"
      />
      <img src={imageTwo} alt="Imagem 2" class="w-full lg:w-1/2 lg:pl-2" />
    </Picture>
  );
}
