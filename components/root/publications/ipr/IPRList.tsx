export default function IPRList() {
  return (
    <section className="px-44">
      <div className="pt-24 pb-12">
        <p className="text-xl text-primary">Copyrights</p>
        <div className="mt-3">
          {copyrights.map((ipr) => (
            <div key={ipr.title} className="border-b border-gray-300 py-4">
              <a
                href={ipr.url}
                target="_blank"
                className="block max-w-3xl cursor-pointer text-xl font-medium hover:underline"
              >
                {ipr.title}
              </a>
              <div className="mt-2 flex items-center gap-2 text-gray-500">
                <p>
                  Copyrights - {ipr.code}, {ipr.date} ({ipr.status})
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-12 pb-24">
        <p className="text-xl text-primary">Patents</p>
        <div className="mt-3">
          {patents.map((ipr) => (
            <div key={ipr.title} className="border-b border-gray-300 py-4">
              <a
                href={ipr.url}
                target="_blank"
                className="block max-w-3xl cursor-pointer text-xl font-medium hover:underline"
              >
                {ipr.title}
              </a>
              <div className="mt-2 flex items-center gap-2 text-gray-500">
                <p>
                  Patent - {ipr.code}, {ipr.date} ({ipr.status})
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const copyrights = [
  {
    title:
      "Algoritma Interpretasi Dini Diabetes Melitus Tipe-2 Berbasis  Epidemiologi Akantosis Nigrikans Dengan Model Kecerdasan  Artifisial",
    url: "https://drive.google.com/file/d/1bf78wntfZS1wB_BLCbv_gIKEOwhS0xUE/view?usp=sharing",
    code: "EC002025170132",
    date: "4 November 2025",
    status: "Granted",
  },
  {
    title:
      "Algoritma Pendeteksian Otomatis ST-Elevasi pada 12-lead Sinyal Elektrokardiogram berbasis Deep Learning",
    url: "https://www.sciencedirect.com/science/article/pii/S2589004225005498",
    code: "EC002024199845",
    date: "2025",
    status: "Granted",
  },
  {
    title: "Algoritma Komputer AI-Garuda",
    url: "https://www.techscience.com/cmc/online/detail/22349",
    code: "EC002024187109",
    date: "2025",
    status: "Granted",
  },
];

const patents = [
  {
    title: "APLIKASI TeleOTIVA: TELEMEDISIN DAN OTOMATISASI IVA",
    url: "https://drive.google.com/file/d/1cBBTn5gxZfNM9qdzyK21XFKzWg0OWXy3/view?usp=sharing",
    code: "P00202508731",
    date: "4 November 2025",
    status: "Granted",
  },
  {
    title:
      "Metode Convolutional Neural Network pada Sistem Interpretasi Cerdas Ekokardiografi Janin berusia 18-22 Minggu",
    url: "https://www.sciencedirect.com/science/article/pii/S2589004225005498",
    code: "IDS000008374",
    date: "2025",
    status: "Granted",
  },
  {
    title:
      "Aplikasi TeleOTIVA untuk Pendeteksi Dini Lesi PRA-KANKER Serviks Otomatis Berbasis Kecerdasan Buatan",
    url: "https://www.techscience.com/cmc/online/detail/22349",
    code: "S00202404682",
    date: "2025",
    status: "Under Review",
  },
];
