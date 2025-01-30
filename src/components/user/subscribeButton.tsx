import { useState } from "react";

export default function SubscribeButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
    } catch (error) {}
  };

  return <div></div>;
}
