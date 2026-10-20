export default function loader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  return `${src.split("?")[0]}?w=${width}&q=${quality || 70}&auto=format&fit=crop`;
}
