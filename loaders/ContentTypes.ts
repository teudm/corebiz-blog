import { AppContext } from "../mod.ts";

interface Props {
  term?: string;
}

/**
 * Loader para fornecer opções dinâmicas de tipos de conteúdo
 */
export default function ContentTypesLoader(
  props: Props,
  req: Request,
  ctx: AppContext,
) {
  console.log("teste >>>>>>>>>>>>>>>>>");

  // Permitir CORS
  Object.entries(req).map(([name, value]) => {
    ctx.response.headers.set(name, value);
  });

  // Opções disponíveis para o select
  const contentTypes = [
    { key: "text", label: "📝 Texto" },
    { key: "image", label: "🖼️ Imagem" },
    { key: "video", label: "🎥 Vídeo" },
  ];

  // Filtra os valores se houver um termo de busca
  return contentTypes.filter((type) => type.label.includes(props.term || ""));
}
