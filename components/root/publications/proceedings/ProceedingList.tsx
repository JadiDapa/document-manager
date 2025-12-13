export default function ProceedingList() {
  return (
    <section className="px-44 py-24">
      <p className="text-xl text-primary">List of International Conferences</p>
      <div className="mt-3">
        {proceedings.map((pcd) => (
          <div key={pcd.title} className="border-b border-gray-300 py-4">
            <a
              href={pcd.url}
              target="_blank"
              className="block max-w-3xl cursor-pointer text-xl font-medium hover:underline"
            >
              {pcd.title}
            </a>
            <div className="mt-2 flex items-center gap-2 text-gray-500">
              <p>{pcd.publication}</p>-<p>{pcd.year}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const proceedings = [
  {
    title:
      "Experimented Multi-Objective Teaching-Leaming-Based Optimization for Medical Data Analysis",
    url: "https://ieeexplore.ieee.org/abstract/document/10652159",
    publication:
      "2024 International Conference on Data Science and Its Applications (ICoDSA)",
    year: "2024",
  },
  {
    title:
      "Deep Learning for Fetal QRS-complex Classification in Noninvasive Fetal Electrocardiogram",
    url: "https://ieeexplore.ieee.org/abstract/document/10277016",
    publication:
      "2023 International Conference on Data Science and Its Applications (ICoDSA)",
    year: "2023",
  },

  {
    title:
      "Yolact-based Approach for Real-Time Fetal Heart SegmentationYolact-based Approach for Real-Time Fetal Heart Segmentation",
    url: "https://ieeexplore.ieee.org/abstract/document/10277564",
    publication:
      "2023 International Conference on Data Science and Its Applications (ICoDSA)",
    year: "2023",
  },
  {
    title:
      "A Deep Learning Approach for Automated Prediction of Cardiac Arrest from Vital Sign Data of Intensive Care Unit Patients",
    url: "https://ieeexplore.ieee.org/abstract/document/10277367  ",
    publication:
      "2023 International Conference on Data Science and Its Applications (ICoDSA) - 2023",
    year: "2023",
  },
];
