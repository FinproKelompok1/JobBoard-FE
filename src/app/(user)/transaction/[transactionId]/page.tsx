export default function TransactionDetail({
  params,
}: {
  params: { transactionId: string };
}) {
  return (
    <main>
      <h1>Transaction Detail ID {params.transactionId}</h1>
    </main>
  );
}
