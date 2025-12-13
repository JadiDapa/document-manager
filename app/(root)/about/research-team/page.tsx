import Researchers from "@/components/root/about/research-team/Researchers";
import MiddleHeader from "@/components/root/MiddleHeader";

export default function ResearchTeamPage() {
  return (
    <>
      <MiddleHeader
        section="AIMed CoE"
        title="Research Team"
        description="Meet the dedicated members of our research team, organized to foster collaboration and innovation."
      />
      <Researchers />
    </>
  );
}
