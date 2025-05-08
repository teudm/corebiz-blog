import { Picture } from "apps/website/components/Picture.tsx";
import { type ImageWidget } from "apps/admin/widgets.ts";

/** @title Imagem Três Colunas */
export interface ImageThreeColumnSectionProps {
  imageOne: ImageWidget;
  imageTwo: ImageWidget;
  imageThree: ImageWidget;
}

export default function ImageThreeColumnSection({
  imageOne,
  imageTwo,
  imageThree,
}: ImageThreeColumnSectionProps) {
  if (!imageOne || !imageTwo || !imageThree) return null;

  return (
    <Picture class="flex max-lg:flex-wrap gap-4 mb-4 lg:px-4">
      <img src={imageOne} alt="Imagem 1" class="w-full lg:w-1/3" />
      <img src={imageTwo} alt="Imagem 2" class="w-full lg:w-1/3" />
      <img src={imageThree} alt="Imagem 3" class="w-full lg:w-1/3" />
    </Picture>
  );
}
