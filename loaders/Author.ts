import { Author } from "../sections/types.ts";

/**
 * @title Author
 * @description Defines a blog post author.
 */
const loader = ({ author }: { author: Author }): Author => author;

export default loader;
