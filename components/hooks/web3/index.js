import { useRouter } from "next/router";
import { useWeb3 } from "@components/providers";
import { useEffect } from "react";

const { useHooks } = require("@components/providers/web3");

const _isEmpty = (data) => {
  return (
    data == null ||
    data === "" ||
    (Array.isArray(data) && data.length === 0) ||
    (data.constructor === Object && Object.keys(data).length === 0)
  );
};

const enhanceHook = (swrRes) => {
  const { data, error } = swrRes;
  const hasInitialResponse = !!(data || error);
  const isEmpty = hasInitialResponse && _isEmpty(data);

  return {
    ...swrRes,
    isEmpty,
    hasInitialResponse,
  };
};

export const useNetwork = () => {
  const swrRes = enhanceHook(useHooks((hooks) => hooks.useNetwork)());
  return {
    network: swrRes,
  };
};

export const useAccount = () => {
  const swrRes = enhanceHook(useHooks((hooks) => hooks.useAccount)());
  return {
    account: swrRes,
  };
};

export const useManagedCourses = (...args) => {
  const swrRes = enhanceHook(
    useHooks((hooks) => hooks.useManagedCourses)(...args)
  );

  return {
    managedCourses: swrRes,
  };
};

export const useAdmin = ({ redirectTo }) => {
  const { account } = useAccount();
  const { requireInstall } = useWeb3();

  const router = useRouter();

  useEffect(() => {
    if (
      requireInstall ||
      (account.hasInitialResponse && !account.isAdmin) ||
      account.isEmpty
    ) {
      router.push(redirectTo);
    }
  }, [router]);

  const swrRes = enhanceHook(useHooks((hooks) => hooks.useAccount)());
  return {
    account: swrRes,
  };
};

export const useWalletInfo = () => {
  const { account } = useAccount();
  const { network } = useNetwork();

  const hasConnectedWallet = !!(account.data && network.isSupported);

  const isConnecting =
    !account.hasInitialResponse && !network.hasInitialResponse;

  return { account, network, hasConnectedWallet, isConnecting };
};

export const useOwnedCourses = (...args) => {
  const swrRes = enhanceHook(
    useHooks((hooks) => hooks.useOwnedCourses)(...args)
  );

  return {
    ownedCourses: swrRes,
  };
};
