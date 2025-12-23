import MobilePageHeader from "@/components/dashboard/MobilePageHeader";
import PageHeader from "@/components/dashboard/PageHeader";
import LatestDocuments from "@/components/root/home/LatestDocuments";
import LatestItem from "@/components/root/home/LatestItem";
import LatestSection from "@/components/root/home/LatestSection";

export default function DashboardPage() {
  return (
    <main className="bg-white md:rounded-2xl overflow-hidden  w-full lg:p-6 p-4 min-h-screen border space-y-8">
      {/* PAGE HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <PageHeader
          title="Dashboard Overview"
          subtitle="Selamat datang di dashboard FileGear!"
          hidden
        />
        <MobilePageHeader title="Dashboard Overview" />
      </div>
      <div className="space-y-8">
        <LatestSection />
        <LatestItem />
        <LatestDocuments />
      </div>
    </main>
  );
}
