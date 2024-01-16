"use client";
import type { NextPage } from "next";
import Head from "next/head";
import { useMemo } from "react";
// import { useMultiKeplr, useMultiWallet } from '../hooks/useKeplr'
import { useQuery } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { BlockchainAddressInput } from "../components/blockchain-address-input";
import { Button } from "../components/button";
import { StatusDisplay } from "../components/display-result";
import { NoisFooter } from "../components/footer";
import {
  ChainSigningClient,
  useAllMultiClients,
} from "../contexts/userClients";
import { fetchUserStatus } from "../hooks/fetchUserStatus";
import noisLogo from "../public/nois_logo.png";
import { routeNewTab } from "../services/misc";
import { SupportedChain, useUserStore } from "../store/userStore";
import { ChainType, CheckResponse } from "./api/check";

export const AirdropLiveStatus: { [K in ChainType]: boolean } = {
  injective: true,
  juno: true,
  stargaze: true,
  aura: true,
  osmosis: false,
};

export type ChainProps = {
  name: string;
  status: string;
  refetch: any;
  client: ChainSigningClient | undefined;
  checkResponse: CheckResponse | undefined;
  walletLoading: boolean;
  logo: string;
};

const Home: NextPage = () => {
  const { address, setAddress, chain, setChain } = useUserStore();
  const [userIsChecking, setUserIsChecking] = useState(false);

  const {
    walletType,
    junoClient,
    injectiveClient,
    stargazeClient,
    auraClient,
    osmosisClient,
    loading: walletLoading,
    nickname,
    handleConnectAll,
    disconnectAll,
  } = useAllMultiClients();

  // True if any client is connected
  const walletIsConnected = useMemo(() => {
    return !(
      !junoClient &&
      !injectiveClient &&
      !auraClient &&
      !osmosisClient &&
      !stargazeClient
    );
  }, [junoClient, injectiveClient, auraClient, osmosisClient, stargazeClient]);

  const {
    data: junoData,
    status: junoStatus,
    fetchStatus: junoFetchStatus,
    refetch: junoRefetch,
  } = useQuery(
    ["juno", junoClient?.walletAddress],
    () =>
      fetchUserStatus({ walletAddr: junoClient!.walletAddress, chain: "juno" }),
    {
      enabled: !!(junoClient && AirdropLiveStatus["juno"]),
      refetchInterval: (data) => {
        if (data && data.userStatus === "waiting_randomness") {
          return 5_000;
        } else {
          return false;
        }
      },
    }
  );

  const {
    data: osmosisData,
    status: osmosisStatus,
    fetchStatus: osmosisFetchStatus,
    refetch: osmosisRefetch,
  } = useQuery(
    ["osmosis", osmosisClient?.walletAddress],
    () =>
      fetchUserStatus({
        walletAddr: osmosisClient!.walletAddress,
        chain: "osmosis",
      }),
    {
      enabled: !!(osmosisClient && AirdropLiveStatus["osmosis"]),
      refetchInterval: (data) => {
        if (data && data.userStatus === "waiting_randomness") {
          return 5_000;
        } else {
          return false;
        }
      },
    }
  );

  const {
    data: injectiveData,
    status: injectiveStatus,
    fetchStatus: injectiveFetchStatus,
    refetch: injectiveRefetch,
    isError: injectiveIsError,
  } = useQuery(
    ["injective", address],
    () =>
      fetchUserStatus({
        walletAddr: address,
        chain: "injective",
      }),
    {
      enabled:
        !!address && chain === SupportedChain.injective && userIsChecking,
      refetchInterval: (data) => {
        if (data && data.userStatus === "waiting_randomness") {
          return 5_000;
        } else {
          return false;
        }
      },
    }
  );

  const {
    data: auraData,
    status: auraStatus,
    fetchStatus: auraFetchStatus,
    refetch: auraRefetch,
  } = useQuery(
    ["aura", auraClient?.walletAddress],
    () =>
      fetchUserStatus({ walletAddr: auraClient!.walletAddress, chain: "aura" }),
    {
      enabled: !!(auraClient && AirdropLiveStatus["aura"]),
      refetchInterval: (data) => {
        if (data && data.userStatus === "waiting_randomness") {
          return 5_000;
        } else {
          return false;
        }
      },
    }
  );

  const {
    data: stargazeData,
    status: stargazeStatus,
    fetchStatus: stargazeFetchStatus,
    refetch: stargazeRefetch,
  } = useQuery(
    ["stargaze", stargazeClient?.walletAddress],
    () =>
      fetchUserStatus({
        walletAddr: stargazeClient!.walletAddress,
        chain: "stargaze",
      }),
    {
      enabled: !!(stargazeClient && AirdropLiveStatus["stargaze"]),
      refetchInterval: (data) => {
        if (data && data.userStatus === "waiting_randomness") {
          return 5_000;
        } else {
          return false;
        }
      },
    }
  );

  const handleCheckEligibility = useCallback(async () => {
    setUserIsChecking(true);
    await injectiveRefetch();
    setUserIsChecking(false);
  }, []);

  const buttonLabel = useMemo(() => {
    if (!address || address === "") return "Input address to check eligibility";
    if (!chain) return "Chain not supported for this address";
    return "Check eligibility";
  }, [address, chain]);

  const isLoading = useMemo(() => {
    return (
      injectiveStatus === "loading" ||
      auraStatus === "loading" ||
      junoStatus === "loading" ||
      stargazeStatus === "loading" ||
      osmosisStatus === "loading"
    );
  }, [auraStatus, junoStatus, stargazeStatus, osmosisStatus]);

  const isFetching = useMemo(() => {
    return (
      injectiveFetchStatus === "fetching" ||
      auraFetchStatus === "fetching" ||
      junoFetchStatus === "fetching" ||
      stargazeFetchStatus === "fetching" ||
      osmosisFetchStatus === "fetching"
    );
  }, [
    injectiveFetchStatus,
    auraFetchStatus,
    junoFetchStatus,
    stargazeFetchStatus,
    osmosisFetchStatus,
  ]);

  return (
    <div className="flex flex-col min-h-screen p-2 bg-nois-blue text-nois-white/90">
      <Head>
        <title>Nois Randdrop Checker by 0xSpit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Analytics />
      {/* Connect Wallet Header */}
      <div className="flex justify-between px-12 w-full border-b border-nois-white/10 ">
        <div
          onClick={() => routeNewTab("https://twitter.com/NoisRNG")}
          className="flex md:relative overflow-hidden hover:cursor-pointer "
        >
          <Image
            src={noisLogo}
            alt="Nois"
            //unoptimized
            className="scale-75 w-24 h-24"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      <main className="flex flex-col justify-start items-center w-full  flex-grow">
        <div className="w-full flex flex-col  justify-center items-center bgx-nois-blue overflow-y-auto">
          <div className="flex flex-col p-4 justify-around h-full w-full items-center">
            <div className="max-w-7xl text-center lg:mx-0 lg:flex-auto py-16 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Nois Randdrop
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Paste your wallet address to see if you're eligible
              </p>
              <BlockchainAddressInput />
              {injectiveIsError && (
                <div className="text-red-500">
                  Error fetching data. Please try again later.
                </div>
              )}
              <Button
                isLoading={isFetching}
                disabled={!address || address === ""}
                onClick={handleCheckEligibility}
                text={buttonLabel}
              />
              {injectiveData?.userStatus && (
                <StatusDisplay status={injectiveData?.userStatus} />
              )}
            </div>
          </div>
        </div>
      </main>
      <NoisFooter />
    </div>
  );
};

export default Home;
