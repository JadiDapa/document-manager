import LeftHeader from "@/components/root/LeftHeader";
import BookList from "@/components/root/publications/books/BookList";

export default function Books() {
  return (
    <>
      <LeftHeader section="PUBLICATION" title="Books" />
      <BookList />
    </>
  );
}
