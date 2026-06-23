"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import SectionTitle from "@/components/Ui/SectionTitle";
import ProjectCard from "@/components/Ui/ProjectCard";
import VerticalProgress from "@/components/Ui/VerticalProgress";
import { projects } from "@/data/projects";

interface ProjectsBlockProps {
  isDesktop: boolean;
}

/**
 * PROJETOS — sobe sobrepondo as Experiências (desktop) via `-mt-[100vh]` + z-20.
 * Trilho de progresso vertical na lateral esquerda e grid de cards.
 */
export default function ProjectsBlock({ isDesktop }: ProjectsBlockProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={ref}
      id="projetos"
      className={`relative flex bg-dark ${
        isDesktop ? "z-20 -mt-[100vh]" : "reels-panel"
      }`}
    >
      {/* trilho de progresso (lateral esquerda, fixo enquanto rola) */}
      <div className="sticky top-0 hidden h-screen w-16 shrink-0 items-center justify-center md:flex">
        <VerticalProgress progress={scrollYProgress} />
      </div>

      {/* conteúdo */}
      <div className="flex-1 px-8 pb-28 pt-28">
        <SectionTitle
          variant="outline"
          className="mb-16 text-center text-6xl md:text-8xl"
        >
          PROJETOS
        </SectionTitle>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
