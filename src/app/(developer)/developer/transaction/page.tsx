import DeveloperSideBar from "@/components/developer/developerSideBar";

export default function TransactionList() {
  return (
    <main className="flex">
      <DeveloperSideBar />

      <div className="w-4/5 p-10">
        <h1 className="text-primary text-3xl font-bold">Transaction List</h1>
        <div>Transaction List</div>
      </div>
    </main>
  );
}
