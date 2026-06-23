"use client";

import SocialIcons from "@/components/Ui/SocialIcons";
import CodeBackground from "@/components/Ui/CodeBackground";
import HeroContent from "@/components/Ui/HeroContent";

interface HomeBlockProps {
  isDesktop: boolean;
}

/** HOME — hero de apresentação. */
export default function HomeBlock({ isDesktop }: HomeBlockProps) {
  return (
    <section
      id="home"
      className={`relative h-svh overflow-hidden bg-dark ${
        isDesktop ? "" : "reels-panel"
      }`}
    >
      <SocialIcons className="absolute left-6 top-6 z-20" />

      <CodeBackground />
      <HeroContent isDesktop={isDesktop} />

      {/* atribuição (canto inferior esquerdo) */}
      <a
        href="#"
        className="absolute bottom-6 left-6 z-20 font-montserrat text-sm text-muted underline-offset-4 hover:underline"
      >
        ® Template made by Me
      </a>
    </section>
  );
}
