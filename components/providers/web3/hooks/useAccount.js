import { useEffect } from "react";
import useSWR from "swr";

const adminAddresses = {
  "0xA66dBecb1b38cAb1e92806FcEc26ba2156c27b0D": true,
};

export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      if (!account) {
        throw new Error(
          "Cannot retrieve an account. Please refresh the browser."
        );
      }

      return account;
    }
  );

  useEffect(() => {
    const mutator = (accounts) => mutate(accounts[0] ?? null);
    provider?.on("accountsChanged", mutator);

    return () => {
      provider?.removeListener("accountsChanged", mutator);
    };
  }, [provider]);

  return {
    isAdmin: (data && adminAddresses[data]) ?? false,
    mutate,
    data,
    ...rest,
  };
};
