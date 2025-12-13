import MiddleHeader from "@/components/root/MiddleHeader";
import InfrastructureRooms from "@/components/root/about/infrastructure/InfrastructureRooms";
import InfrastructureItems from "@/components/root/about/infrastructure/InfrastructureItems";

export default function InfrastructureTeamPage() {
  return (
    <>
      <MiddleHeader
        section="AIMed CoE"
        title="Infrastructure"
        description="ISysRG has the infrastructure to support and provide the platform of research. The infrastructure is as follows:"
      />
      <InfrastructureRooms />
      <InfrastructureItems />
    </>
  );
}
