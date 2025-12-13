import PartnerCarousel from "./PartnerCarousel";

export default async function PartnersSectionl() {
  const contents = await getPartnerContents();

  return (
    <section className="flex w-full flex-col items-center  px-4 py-16 lg:px-40">
      <h2 className="mb-10 text-3xl font-bold text-primary">
        {contents.title}
      </h2>

      <PartnerCarousel partners={contents.partners} />
    </section>
  );
}

async function getPartnerContents() {
  return {
    title: "Our Partners",
    description:
      "Explore a curated collection of medical imaging and signal datasets designed to support research in medical interpretation and analysis.",
    partners: [
      {
        name: "PT Intens",
        image:
          "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Ff283a7ee46ef1822c9bb4f18be4a5cba23a84e8c-429x159.png%3Ffit%3Dmax%26auto%3Dformat&w=640&q=75",
      },
      {
        name: "RSUP Muhammad Hoesin",
        image:
          "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Fa41d66ad12a594b60d81c8df44f801f88c631c08-481x454.png%3Ffit%3Dmax%26auto%3Dformat&w=640&q=75",
      },
      {
        name: "RS Bakti Timah Pangkal Pinang",
        image:
          "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F0c141a5fb9892e5cc862d526785ebe6cd46b572a-900x400.png%3Ffit%3Dmax%26auto%3Dformat&w=640&q=75",
      },
      {
        name: "Humic Engineering, Telkom University",
        image:
          "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Fd6640a5ec1d952cf24762b4bc1d84e971835104c-114x116.png%3Ffit%3Dmax%26auto%3Dformat&w=640&q=75",
      },
      {
        name: "Dinas Kesehatan",
        image:
          "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Ff6a9824df0d726d81143848383f9cc4670f67555-500x500.png%3Ffit%3Dmax%26auto%3Dformat&w=640&q=75",
      },
    ],

    button: {
      text: "Explore more datasets",
      link: "/datasets",
    },
  };
}
