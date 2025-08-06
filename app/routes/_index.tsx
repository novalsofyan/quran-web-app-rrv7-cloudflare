import type { Route } from "./+types/_index";
import Hero from "~/components/Hero";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Qur'an Web App" }, { name: "description", content: "Qur'an Web by Lucid Dreamworks Dev ✨." }];
}

export default function Home() {
  return (
    <div className="pt-16 mb-4 grow flex justify-center items-center box-border">
      <Hero />
    </div>
  );
}
