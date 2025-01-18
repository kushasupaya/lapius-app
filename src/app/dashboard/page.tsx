import {
  EmptyContent,
  MedicalServicesTable,
  SearchCard,
  SearchHistory,
} from "@/components/sections/dashboard/components";

export default function Home() {
  const showTable = true;

  return (
    <div>
      <div className="space-y-6">
        <div className="px-6 pt-6">
          <div className="rounded-lg p-4">
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-row gap-4">
                <div className="space-y-4">
                  <SearchCard />
                  <SearchHistory />
                </div>
                <div className="flex-grow h-screen">
                  {!showTable ? <EmptyContent /> : <MedicalServicesTable />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
