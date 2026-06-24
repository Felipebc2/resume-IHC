"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionTitle from "@/components/Ui/SectionTitle";
import ExperienceCard from "@/components/Ui/ExperienceCard";
import ImagePlaceholder from "@/components/Ui/ImagePlaceholder";
import { experiences } from "@/data/experiences";

interface ExperienceBlockProps {
  isDesktop: boolean;
}

const CARD_POSITIONS = [
  { left: "5vw", top: "36vh", img: "18vw" },
  { left: "82vw", top: "13vh", img: "16vw" },
  { left: "90vw", top: "58vh", img: "12vw" },
  { left: "127vw", top: "39vh", img: "18vw" },
];

const SQUARES = [
  { left: "50vw", top: "22vh", size: "11vw" },
  { left: "47vw", top: "62vh", size: "9vw" },
  { left: "67vw", top: "55vh", size: "8vw" },
  { left: "132vw", top: "8vh", size: "10vw" },
];

export default function ExperienceBlock({ isDesktop }: ExperienceBlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 0.66, 1], ["0%", "-33.33%", "-33.33%"]);

  // 2. Medição exclusiva para a entrada visual da seção (Fade-In)
  const { scrollYProgress: fadeInProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const opacity = useTransform(fadeInProgress, [0, 1], [0, 1]);

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

  // RENDER DESKTOP (Sem o vazio na margem direita)
  return (
    <section id="experiencias" ref={ref} className="relative h-[300vh] bg-dark">
      <motion.div 
        style={{ opacity }} 
        className="sticky top-0 h-screen overflow-hidden bg-dark"
      >
        <motion.div style={{ x }} className="relative h-full w-[220vw]">
          {/* título */}
          <div className="absolute" style={{ left: "4vw", top: "6vh" }}>
            <SectionTitle variant="filled" className="text-[7rem] leading-none">
              EXPERIÊNCIAS
            </SectionTitle>
          </div>

          {/* texto flutuante (mural) */}
          <p
            className="absolute max-w-[15vw] font-montserrat text-sm font-bold leading-snug text-cream"
            style={{ left: "62vw", top: "27vh" }}
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
      </motion.div>
    </section>
  );
}