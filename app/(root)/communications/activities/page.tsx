import ActivityList from "@/components/root/communications/activities/ActivityList";
import LeftHeader from "@/components/root/LeftHeader";

export default function Activity() {
  return (
    <>
      <LeftHeader section="COMMUNICATION" title="Activities" />
      <ActivityList />
    </>
  );
}
