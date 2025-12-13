export default function BookList() {
  return (
    <section className="px-44 py-24">
      <p className="text-xl text-primary">List Of Books</p>
      <div className="mt-3">
        {books.map((journal) => (
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
                Publisher: {journal.publisher} | ISBN: {journal.ISBN} | Year:
                {journal.year}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const books = [
  {
    title: "Pengolahan Citra Medis Berbasis Kecerdasan Artifisial",
    url: "https://isysrg.com/books#",
    publisher: "UNSRI Press",
    ISBN: "978-623-399-163-6",
    year: "2023",
  },
  {
    title: "Pengenalan Deep Learning dan Implementasinya",
    url: "https://isysrg.com/books#",
    publisher: "UNSRI Press",
    ISBN: "978-979-587-995-4",
    year: "2021",
  },
];
