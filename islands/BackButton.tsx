export default function BackButton({ text = "Voltar" }: { text?: string }) {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      class="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
    >
      {text}
    </button>
  );
}
