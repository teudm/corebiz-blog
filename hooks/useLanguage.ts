import { IS_BROWSER } from "$fresh/runtime.ts";
import { _lang } from "../mod.ts";

if (IS_BROWSER) {
  throw new Error(
    "This function can not be used inside islands. Move this to the outter component",
  );
}

export const useLanguage = () => _lang;
