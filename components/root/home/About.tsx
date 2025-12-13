import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default async function AboutSection() {
  const about = await getAboutContent(); // Server fetch

  return (
    <section className="w-full  px-6 py-20 lg:px-44">
      {/* TITLE */}
      <h2 className="mb-6 text-center text-3xl font-bold text-primary lg:mb-12 lg:text-4xl">
        {about.title}
      </h2>

      {/* TOP SECTION */}
      <div className="mb-20 flex flex-col items-center gap-6 lg:flex-row lg:gap-20">
        {/* LEFT IMAGE */}
        <div>
          <div className="relative size-80 overflow-hidden rounded-lg lg:size-[350px]">
            <Image
              src={about.image_1}
              alt={about.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        {/* RIGHT TEXT */}
        <div>
          <p className="mb-6 text-sm leading-relaxed text-gray-700 lg:text-xl">
            {about.description_1}
          </p>

          <p className="mb-6 text-sm leading-relaxed text-gray-600 lg:text-base">
            {about.description_2}
          </p>

          {/* LINKS */}
          <div className="flex gap-10 font-medium text-primary">
            <a
              href={about.link_1.href}
              className="flex items-center gap-2 hover:opacity-70"
            >
              {about.link_1.label} <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={about.link_2.href}
              className="flex items-center gap-2 hover:opacity-70"
            >
              {about.link_2.label} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* SDG SECTION */}
      <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">
        {/* LEFT TEXT BLOCK */}
        <div className="max-w-md">
          <p className="mb-6 text-xl leading-relaxed font-medium text-gray-800">
            {about.sdg_text_1}
          </p>

          <p className="text-sm leading-relaxed text-gray-500">
            {about.sdg_text_2}
          </p>
        </div>

        {/* RIGHT SDG CARDS */}
        <div className="flex justify-center gap-4 lg:justify-start lg:gap-6">
          {/* SDG 3 */}
          <div className="relative size-40 overflow-hidden rounded-lg shadow-md lg:size-80">
            <Image
              src={about.sdg_image_1}
              alt="SDG 3 Good Health & Well-being"
              fill
              className="object-cover"
            />
          </div>

          {/* SDG 9 */}
          <div className="relative size-40 overflow-hidden rounded-lg shadow-md lg:size-80">
            <Image
              src={about.sdg_image_2}
              alt="SDG 9 Industry Innovation Infrastructure"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

async function getAboutContent() {
  return {
    title: "About Us",
    image_1:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Facf175eacda29173c113713e0b4a511f2cfba7b7-1024x1024.jpg&w=1920&q=75",
    description_1:
      "The AIMed Center of Excellence primarily involves developing software, applications, and systems to support medical interpretation, with a focus on medical signal and image processing, medical pattern recognition, and medical record data mining techniques.",
    description_2:
      "The AIMed Center of Excellence creates intelligent systems across various fields, including computer systems, biomedicine, natural language processing, and others.",
    link_1: { label: "Research Team", href: "/about/research-team" },
    link_2: { label: "Infrastructure", href: "/about/infrastructure" },
    sdg_text_1:
      "The AIMed Center of Excellence supports SDG 3 (Good Health and Well-being) by developing AI-driven solutions better disease detection and healthcare delivery.",
    sdg_text_2:
      "It also contributes to SDG 9 (Industry, Innovation andInfrastructure) by fostering technological innovation throughresearch in intelligent systems, promoting sustainable healthcareinfrastructure, and collaborating with industry to accelerate theadoption of cutting-edge technologies.",
    sdg_image_1:
      "https://isysrg.com/_next/image?url=%2Fassets%2Fimages%2FE_WEB_03.png&w=640&q=75",
    sdg_image_2:
      "https://isysrg.com/_next/image?url=%2Fassets%2Fimages%2FE_WEB_09.png&w=640&q=75",
  };
}
