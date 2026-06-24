"use client";

import { motion } from "motion/react";
import type { Project } from "@/data/projects";
import ImagePlaceholder from "./ImagePlaceholder";

interface ProjectCardProps {
  project: Project;
}

// Canto inferior esquerdo "dobrado" via clip-path original.
const FOLDED_CORNER =
  "polygon(0 0, 100% 0, 100% 100%, 2.5rem 100%, 0 calc(100% - 2.5rem))";

export default function ProjectCard({ project }: ProjectCardProps) {
  // Variantes para alternar a opacidade de forma limpa no hover
  const imageVariants = {
    initial: { opacity: 1 },
    hover: { opacity: 0 },
  };

  const descriptionVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1 },
  };

  return (
    <motion.article
      initial="initial"
      whileHover="hover"
      animate="initial"
      className="group relative flex min-h-[15rem] flex-col justify-between bg-white/[0.04] cursor-pointer"
      style={{ clipPath: FOLDED_CORNER }}
    >
      {/* CAMADA INICIAL: A imagem cobre todo o card com o título sobreposto */}
      <motion.div
        variants={imageVariants}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="absolute inset-0 flex flex-col justify-end"
      >
        {/* A imagem agora ocupa 100% da altura e largura do card */}
        <ImagePlaceholder className="absolute inset-0 h-full w-full" />
        
        {/* Gradiente escuro no rodapé para garantir contraste e legibilidade do texto branco (IHC) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        
        {/* Título sobreposto em branco no rodapé */}
        <p className="relative z-10 font-montserrat text-base text-white p-8 self-end">
          {project.title}
        </p>
      </motion.div>

      {/* CAMADA DE HOVER: Revela a descrição original com o fundo escuro do card */}
      <motion.div
        variants={descriptionVariants}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 flex flex-col justify-between p-8 bg-[#151515]"
      >
        <p className="max-w-xs font-montserrat text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        
        <p className="self-end font-montserrat text-base text-cream">
          {project.title}
        </p>
      </motion.div>
    </motion.article>
  );
}