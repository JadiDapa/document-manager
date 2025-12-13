export default function MassMediaList() {
  return (
    <section className="  px-44 py-24">
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
              <p>
                {journal.publisher} - {journal.date}
              </p>
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
      "Kolaborasi PT INTENS dan UNSRI, Sukses Hilirisasi Riset Menjadi Produk Inovasi AI TeleOTIVA",
    url: "https://www.msn.com/id-id/berita/other/kolaborasi-pt-intens-dan-unsri-sukses-hilirisasi-riset-menjadi-produk-inovasi-ai-teleotiva/ar-AA1QgjYb",
    publisher: "msn",
    date: "November 5, 2025",
  },
  {
    title:
      "BINAR : Telemedisin dan Otomatisasi Inspeksi Visual Asam Asetat (TeleOTIVA) ",
    url: "https://www.youtube.com/watch?v=JssRjU1qYxE",
    publisher: "Youtube",
    date: "January 30, 2025",
  },

  {
    title:
      "Pembukaan Kegiatan Bakti Sosial Skrining Kanker Serviks Berbasis Artificial Intelligence Tele-OTIVA (Penelitian Multisenter Sumbagsel) + IVA-HPV ",
    url: "https://www.techscience.com/cmc/online/detail/22349",
    publisher: "Instagram ",
    date: "September 23, 2025",
  },
];
