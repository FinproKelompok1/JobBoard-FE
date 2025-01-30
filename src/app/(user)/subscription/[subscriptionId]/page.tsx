export default function SubscriptionDetail({
  params,
}: {
  params: { subscriptionId: string };
}) {
  return (
    <main>
      <h1>Subscription Detail ID {params.subscriptionId}</h1>
    </main>
  );
}
