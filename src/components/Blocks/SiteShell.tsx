"use client";

import { useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Header from "@/components/Ui/Header";
import NavDrawer from "@/components/Blocks/NavDrawer";
import HomeBlock from "@/components/Blocks/HomeBlock";
import ExperienceBlock from "@/components/Blocks/ExperienceBlock";
import ProjectsBlock from "@/components/Blocks/ProjectsBlock";
import FooterBlock from "@/components/Blocks/FooterBlock";
import CircularProgress from "@/components/Ui/CircularProgress";

/**
 * Orquestrador de nível de página.
 * - Detém o estado da navegação (drawer) — persistente em todas as seções.
 * - Decide entre layout desktop (transições com scroll hijack/overlap) e
 *   mobile "reels" (painéis 100svh com scroll-snap).
 */
export default function SiteShell() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const mainRef = useRef<HTMLElement>(null);

  return (
    <>
      <Header isOpen={drawerOpen} onToggle={() => setDrawerOpen((v) => !v)} />
      <NavDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main
        ref={mainRef}
        className={
          isDesktop
            ? "relative"
            : "reels-scroll h-svh overflow-y-auto overflow-x-hidden"
        }
      >
        <HomeBlock isDesktop={isDesktop} />
        <ExperienceBlock isDesktop={isDesktop} />
        <section className="h-svh max-h-[20vh]"></section>
        <ProjectsBlock isDesktop={isDesktop} />
        <FooterBlock />
      </main>

      {/* anel de progresso fixo — segue a página inteira */}
      <div className="fixed bottom-6 right-6 z-30">
        <CircularProgress
          key={isDesktop ? "win" : "main"}
          containerRef={isDesktop ? undefined : mainRef}
        />
      </div>
    </>
  );
}
