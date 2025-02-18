export default function LoadingState() {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6 h-64" />
      ))}
    </div>
  );
}