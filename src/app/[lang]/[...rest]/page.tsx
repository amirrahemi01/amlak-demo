import { notFound } from "next/navigation";

// Unknown paths inside a locale render the localized 404
export default function CatchAll() {
  notFound();
}
