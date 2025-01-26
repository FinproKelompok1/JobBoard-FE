export default function DeveloperPage() {
  return (
    <main className="py-10">
      <section className="container mx-auto">
        <h1 className="font-bold text-3xl">Developer Dashboard</h1>
      </section>

      {/* Container for sidebar and main content */}
      <section className="container mx-auto flex gap-5 mt-10">
        {/* Sidebar */}
        <aside className="w-1/5 border border-gray-300 p-5 rounded-lg">
          <div className="flex flex-col gap-5 text-gray-500">
            <ol className="font-bold">Subscription</ol>
            <li className="list-none">Create Subscription</li>
            <li className="list-none">Edit Subscription</li>
            <li className="list-none">See Subscription</li>
            <ol className="font-bold text-gray-500"> Assessment </ol>
            <li className="list-none">Create Assessment</li>
            <li className="list-none">Assessment Result</li>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 border border-gray-300 p-5 rounded-lg">
          <div>Main section</div>
        </section>
      </section>
    </main>
  );
}
