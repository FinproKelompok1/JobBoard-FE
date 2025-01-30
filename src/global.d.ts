declare interface Window {
  snap: {
    embed: (transactionToken: string, options: { embedId: string }) => void;
    pay: (transactionToken: string) => void;
  };
}
