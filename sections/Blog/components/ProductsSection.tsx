import { Picture } from "apps/website/components/Picture.tsx";
import { type ImageWidget } from "apps/admin/widgets.ts";

/** @title Produtos */
export interface Product {
  image: ImageWidget;
  productName: string;
  designerName: string;
}

/** @title Seção de Produtos */
export interface ProductSectionProps {
  /** @title Título */
  title: string;

  /** @title Subtítulo */
  subtitle: string;

  /** @title Produtos */
  products: Product[];
}

export default function ProductSection({
  title,
  subtitle,
  products,
}: ProductSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <div class="py-8 max-md:px-2 md:container">
      <div class="max-md:hidden md:mb-6">
        <p class="mb-2 text-caption uppercase">
          {subtitle}
        </p>
        <h3 class="text-h4Mobile md:text-h4 uppercase">
          {title}
        </h3>
      </div>

      <div class="flex overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6">
        {products.map(({ image, productName, designerName }, index) => (
          <div
            key={index}
            class="snap-start shrink-0 basis-full sm:basis-1/2 md:basis-1/3 px-2 first:pl-0 last:pr-0 flex flex-col"
          >
            <Picture>
              <img src={image} alt={productName} class="w-full mix-blend-multiply" />
            </Picture>
            <p class="mt-2 text-base not-italic font-semibold leading-6 tracking-[3.84px] uppercase">
              {productName}
            </p>
            <p class="text-[10px] not-italic font-normal leading-4 tracking-[0.8px]">
              {designerName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
