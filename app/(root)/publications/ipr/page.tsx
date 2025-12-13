import LeftHeader from "@/components/root/LeftHeader";
import IPRList from "@/components/root/publications/ipr/IPRList";

export default function IPR() {
  return (
    <>
      <LeftHeader
        section="PUBLICATION"
        title="Intellectual Property Rights (IPR)
"
      />
      <IPRList />
    </>
  );
}
