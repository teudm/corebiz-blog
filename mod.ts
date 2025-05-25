import manifest, { Manifest } from "./manifest.gen.ts";
import { PreviewContainer } from "./utils/preview.tsx";
import { type App, type FnContext } from "@deco/deco";

export type Language = "pt-BR" | "en-US" | "es-ES";

export type State = {
  language: Language;
};

export let _lang: Language = "pt-BR";

export type AppContext = FnContext<State, Manifest>;
/**
 * @title Corebiz Blog
 * @description Manage your posts.
 * @category Corebiz
 * @logo https://raw.githubusercontent.com/Breton-cx/apps/main/weather/logo.png
 */
export default function App(state: State): App<Manifest, State> {
  _lang = state.language || "pt-BR";
  return { manifest, state };
}
export const preview = () => {
  return {
    Component: PreviewContainer,
    props: {
      name: "Deco Blog",
      owner: "deco",
      description: "Manage your posts, categories and authors.",
      logo: "https://raw.githubusercontent.com/deco-cx/apps/main/weather/logo.png",
      images: [],
      tabs: [],
    },
  };
};
