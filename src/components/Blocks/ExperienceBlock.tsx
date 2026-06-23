"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionTitle from "@/components/Ui/SectionTitle";
import ExperienceCard from "@/components/Ui/ExperienceCard";
import ImagePlaceholder from "@/components/Ui/ImagePlaceholder";
import HorizontalProgress from "@/components/Ui/HorizontalProgress";
import { experiences } from "@/data/experiences";

interface ExperienceBlockProps {
  isDesktop: boolean;
}

// Posições (em vw/vh) de cada card dentro da esteira de 300vw.
const CARD_POSITIONS = [
  { left: "5vw", top: "36vh", img: "18vw" },
  { left: "100vw", top: "13vh", img: "16vw" },
  { left: "158vw", top: "58vh", img: "12vw" },
  { left: "216vw", top: "16vh", img: "18vw" },
];

// Quadrados decorativos espalhados (collage).
const SQUARES = [
  { left: "72vw", top: "22vh", size: "11vw" },
  { left: "84vw", top: "62vh", size: "9vw" },
  { left: "150vw", top: "16vh", size: "8vw" },
  { left: "262vw", top: "54vh", size: "10vw" },
];

/**
 * EXPERIÊNCIAS — scroll lateral (desktop) / reels (mobile).
 * Ver geometria do hijack na doc do projeto: 400vh de altura, sticky no topo e
 * esteira de 300vw que desliza até -66.6% (segurando no fim para o overlap de
 * PROJETOS).
 */
export default function ExperienceBlock({ isDesktop }: ExperienceBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 0.66, 1], ["0%", "-66.6%", "-66.6%"]);

  if (!isDesktop) {
    return (
      <section id="experiencias" className="bg-dark">
        <div className="reels-panel relative flex h-svh flex-col justify-center px-6">
          <SectionTitle variant="filled" className="text-5xl">
            EXPERIÊNCIAS
          </SectionTitle>
        </div>
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="reels-panel relative flex h-svh flex-col justify-center gap-6 px-6"
          >
            <ImagePlaceholder className="h-48 w-full" />
            <div className="flex flex-col gap-3 text-cream">
              <h3 className="font-montserrat text-2xl font-extrabold">
                {exp.title}
              </h3>
              <p className="font-montserrat text-sm font-bold">{exp.period}</p>
              <p className="font-montserrat text-sm font-semibold leading-snug">
                <span className="font-extrabold">Descrição: </span>
                {exp.description}
              </p>
              <p className="font-montserrat text-sm font-semibold leading-snug">
                <span className="font-extrabold">Hard e Soft Skills: </span>
                {exp.skills}
              </p>
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section id="experiencias" ref={ref} className="relative h-[400vh] bg-dark">
      <div className="sticky top-0 h-screen overflow-hidden bg-dark">
        <motion.div style={{ x }} className="relative h-full w-[300vw]">
          {/* título */}
          <div className="absolute" style={{ left: "4vw", top: "6vh" }}>
            <SectionTitle variant="filled" className="text-[7rem] leading-none">
              EXPERIÊNCIAS
            </SectionTitle>
          </div>

          {/* texto flutuante (mural) */}
          <p
            className="absolute max-w-[15vw] font-montserrat text-sm font-bold leading-snug text-cream"
            style={{ left: "86vw", top: "20vh" }}
          >
            Descrição abrangente dessas fotos no mural: Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Pellentesque placerat fringilla
            odio, non facilisis risus malesuada eu.
          </p>

          {/* quadrados decorativos */}
          {SQUARES.map((s, i) => (
            <ImagePlaceholder
              key={i}
              className="absolute"
              style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
            />
          ))}

          {/* cards de experiência */}
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: CARD_POSITIONS[i].left, top: CARD_POSITIONS[i].top }}
            >
              <ExperienceCard experience={exp} imageSize={CARD_POSITIONS[i].img} />
            </div>
          ))}
        </motion.div>

        <HorizontalProgress progress={scrollYProgress} />
      </div>
    </section>
  );
}
