import { EthRates } from "@components/web3";
import { Breadcrumbs } from "@components/ui/common";
import { useAccount, useWalletInfo } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";

const LINKS = [
  {
    href: "/marketplace",
    value: "Buy",
  },
  {
    href: "/marketplace/courses/owned",
    value: "My Courses",
  },
  {
    href: "/marketplace/courses/manage",
    value: "Manage Courses",
    requireAdmin: true,
  },
];

export default function Header() {
  const { network, account } = useWalletInfo();
  const { requireInstall } = useWeb3();

  return (
    <>
      <div className="pt-4 shadow-lg">
        <section className="text-white bg-indigo-600 rounded-lg">
          <div className="p-8">
            <h1 className="truncate">Hello, {account?.data}</h1>
            <h2 className="subtitle mb-5 text-xl">
              I hope you are having a great day!
            </h2>

            <div className="md:flex justify-between items-center">
              <div className="sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
                  >
                    Learn how to purchase
                  </a>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                {network.hasInitialResponse && !network.isSupported && (
                  <div className="bg-red-400 p-4 rounded-lg">
                    <div>Connected to wrong network</div>
                    <div>
                      Connect to: {` `}
                      <strong className="text-2xl">{network.target}</strong>
                    </div>
                  </div>
                )}
                {requireInstall && (
                  <div className="bg-yellow-500 p-4 rounded-lg">
                    Cannot connect to network. Please install Metamask.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="mt-4">
        <EthRates />
      </div>
      <div className="flex flex-row-reverse p-4 sm:px-6 lg:px-8">
        <Breadcrumbs isAdmin={account.isAdmin} items={LINKS} />
      </div>
    </>
  );
}
