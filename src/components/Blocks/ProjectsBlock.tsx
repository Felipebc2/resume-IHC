"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import SectionTitle from "@/components/Ui/SectionTitle";
import ProjectCard from "@/components/Ui/ProjectCard";
import { projects } from "@/data/projects";

interface ProjectsBlockProps {
  isDesktop: boolean;
}

/**
 * PROJETOS — sobe sobrepondo as Experiências (desktop) via `-mt-[100vh]` + z-20.
 * O título fica fixo no TOPO da página (com sticky), enquanto o grid de cards rola por baixo.
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
      className={`relative bg-dark flex flex-col ${
        isDesktop ? "z-20 -mt-[100vh] px-12 lg:px-24" : "reels-panel px-8"
      }`}
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 10vh)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15vh)",
      }}
    >
      {/* CONTAINER DO TÍTULO: Agora fica no topo (flex-col) e gruda ao atingir o topo da tela no desktop */}
      <div 
        className={`w-full bg-dark/90 backdrop-blur-sm ${
          isDesktop ? "sticky top-0 pt-28 pb-8 z-30" : "pt-28 mb-16"
        }`}
      >
        <SectionTitle
          variant="outline"
          className="text-center text-6xl md:text-8xl"
        >
          PROJETOS
        </SectionTitle>
      </div>

      {/* CONTAINER DOS CARDS: Rola normalmente abaixo do título */}
      <div className="w-full pb-28 pt-4">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}