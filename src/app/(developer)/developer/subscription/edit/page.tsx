import DeveloperSideBar from "@/components/developer/developerSideBar";

export default function EditSubscription() {
  return (
    <main className="flex">
      <DeveloperSideBar />

      <div className="w-4/5 p-10">
        <h1 className="text-primary text-3xl font-bold">Edit Subscription</h1>
        <div>Form</div>
      </div>
    </main>
  );
}
