import { useId } from "preact/hooks";
import { BlogPost } from "./types.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  post: BlogPost | null;
}

export default function Template({ post }: Props) {
  const id = useId();

  if (!post) return null;

  const { image, content = [] } = post;

  return (
    <div id={id}>
      {image && (
        <div id="main-banner" class="w-full">
          <Image
            className="w-full object-cover aspect-video max-h-[560px]"
            width={600}
            src={image}
          />
        </div>
      )}
      <div class="container">
        {content?.map(({ Component, props }) => {
          if (!Component || !props) {
            return null;
          }

          return (
            <div>
              <Component {...props} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
