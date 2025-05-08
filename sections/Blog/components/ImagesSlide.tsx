import { useId } from "preact/hooks";
import { type ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "../../../utils/clx.ts";
import Slider from "../../../utils/Slider.tsx";
import Icon from "../../../utils/Icon.tsx";

export interface ImageSlideImageProps {
  image: ImageWidget;
  alt: string;
}

export interface ImageSlideProps {
  images: ImageSlideImageProps[];
}

export default function ImagesSlide({ images }: ImageSlideProps) {
  /**
   * Rendered when a not found is returned by any of the loaders run on this page
   */
  if (!images) return null;

  const sliderImages = images;

  if (!sliderImages || sliderImages.length === 0) return null;

  const id = useId();

  return (
    <>
      <div
        id={id}
        class={clx(
          "grid",
          "grid-rows-[1fr_32px_1fr_64px]",
          "grid-cols-[32px_1fr_32px] min-h-min",
          "sm:grid-cols-[88px_1fr_88px]",
          "w-full text-black mb-4"
        )}
      >
        <div class="col-span-full row-span-full flex">
          <Slider class="carousel carousel-center w-full gap-1 md:gap-4 md:px-4">
            {sliderImages.map((image, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item",
                  "w-[calc(100%-24px)] md:w-[calc(100%-112px)]",
                  "first:w-[calc(100%-12px)] md:first:w-[calc(100%-56px)]",
                  "last:w-[calc(100%-12px)] md:last:w-[calc(100%-56px)]"
                )}
              >
                <img
                  class="w-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  src={image?.image}
                  alt={image?.alt}
                />
              </Slider.Item>
            ))}
          </Slider>
        </div>
        <div class="hidden md:flex items-center justify-end z-10 col-start-1 row-start-2">
          <Slider.PrevButton
            class="btn btn-neutral hover:bg-white btn-circle btn-sm w-[48px] h-[48px] disabled:opacity-0"
            disabled={false}
          >
            <Icon id="chevron-left" size={32} />
          </Slider.PrevButton>
        </div>

        <div class="hidden md:flex items-center justify-start z-10 col-start-3 row-start-2">
          <Slider.NextButton
            class="btn btn-neutral hover:bg-white btn-circle btn-sm w-[48px] h-[48px] disabled:opacity-0"
            disabled={false}
          >
            <Icon id="chevron-right" size={32} />
          </Slider.NextButton>
        </div>
        <Slider.JS rootId={id} />
      </div>
    </>
  );
}
