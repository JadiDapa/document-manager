export default function JournalList() {
  return (
    <section className="px-44 py-24">
      <p className="text-xl text-primary">List Of International Journal</p>
      <div className="mt-3">
        {journals.map((journal) => (
          <div key={journal.title} className="border-b border-gray-300 py-4">
            <a
              href={journal.url}
              target="_blank"
              className="block max-w-3xl cursor-pointer text-xl font-medium hover:underline"
            >
              {journal.title}
            </a>
            <div className="mt-2 flex items-center gap-2 text-gray-500">
              <p>{journal.publication}</p>-<p>{journal.year}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const journals = [
  {
    title:
      "iCOR: End-to-End Electrocardiography Morphology Classification Combining Multi-Layer Filter and BiLSTM",
    url: "https://www.mdpi.com/1999-4893/18/4/236",
    publication: "Algorithms, MDPI",
    year: "2025",
  },
  {
    title:
      "Computer-aided assessment for enlarged fetal heart with deep learning model",
    url: "https://www.sciencedirect.com/science/article/pii/S2589004225005498",
    publication: "iScience",
    year: "2025",
  },

  {
    title:
      "A Modified Deep Residual-Convolutional Neural Network for Accurate Imputation of Missing Data",
    url: "https://www.techscience.com/cmc/online/detail/22349",
    publication: "Computers, Material & Contunia",
    year: "2025",
  },
  {
    title:
      "An improved electrocardiogram arrhythmia classification performance with feature optimization",
    url: "https://bmcmedinformdecismak.biomedcentral.com/articles/10.1186/s12911-024-02822-7",
    publication: "BMC Medical Informatics and Decision Making",
    year: "2024",
  },
];
