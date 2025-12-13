"use client";

import ResearchersCarousel from "./ResearchersCarousel";
import ResearcherCard from "./ResearcherCard";

export default function Researchers() {
  return (
    <div className="  px-44">
      <div className="my-40 flex flex-col items-center">
        <ResearcherCard
          name="Prof. Ir. Siti Nurmaini, M.T., Ph.D."
          title="Head of ISys Research Group"
          image="https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F68eaca5684d9f53c8ee3650470233c9d054b6469-493x506.png%3Ffit%3Dmax%26auto%3Dformat&w=256&q=75"
        />

        <div className="my-8 h-0.5 w-full bg-gray-200" />

        <ResearcherCard
          name="Dr. Firdaus, M.Kom."
          title="Secretary"
          image="https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F9b2dab29c94f27eede3ea5d0226ba77339cdb181-449x556.png%3Ffit%3Dmax%26auto%3Dformat&w=256&q=75"
        />

        <div className="my-8 h-0.5 w-full bg-gray-200" />

        {/* Members */}
        <ResearchersCarousel title="Members" items={members} />

        <div className="my-8 h-0.5 w-full bg-gray-200" />

        {/* External Collaborators */}
        <ResearchersCarousel title="External Collaborators" items={members} />

        <div className="my-8 h-0.5 w-full bg-gray-200" />

        {/* External Collaborators */}
        <ResearchersCarousel title="Research Assistants" items={members} />

        <div className="my-8 h-0.5 w-full bg-gray-200" />

        {/* External Collaborators */}
        <ResearchersCarousel title="Undergraduate Students" items={members} />

        <div className="my-8 h-0.5 w-full bg-gray-200" />

        {/* External Collaborators */}
        <ResearchersCarousel title="Graduate Students" items={members} />

        <div className="my-8 h-0.5 w-full bg-gray-200" />

        {/* External Collaborators */}
        <ResearchersCarousel title="Postgraduate Students" items={members} />
      </div>
    </div>
  );
}

const members = [
  {
    name: "Prof. Dr. Ir. Bambang Tutuko, M.T.",
    title: "Member",
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F51d000f4a5ffca6459bdffd29e3e72aa4d261070-441x565.png%3Ffit%3Dmax%26auto%3Dformat&w=256&q=75",
  },
  {
    name: "Prof. Dr. Erwin, S.Si., M.Si.",
    title: "Member",
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Fa3dfac34ca54e203a7ccbdcfc1d3ca4fe21e1949-433x577.png%3Ffit%3Dmax%26auto%3Dformat&w=256&q=75",
  },
  {
    name: "Ghita Athalina, B.Eng., M.Eng.",
    title: "Member",
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Fc6534b00a572f7df8f78e6da9a9509d526fe82eb-864x1184.jpg%3Ffit%3Dmax%26auto%3Dformat&w=256&q=75",
  },
  {
    name: "Prof. Dr. Ir. Bambang Tutuko, M.T.",
    title: "Member",
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F51d000f4a5ffca6459bdffd29e3e72aa4d261070-441x565.png%3Ffit%3Dmax%26auto%3Dformat&w=256&q=75",
  },
];
