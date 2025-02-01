import DeveloperSideBar from "@/components/developer/developerSideBar";

export default function AssessmentResult() {
  return (
    <main className="flex">
      <DeveloperSideBar />

      <div className="p-10">
        <h1 className="text-primary text-3xl font-bold">Assessment Result</h1>
        <div>Assessment Result Table</div>
      </div>
    </main>
  );
}
