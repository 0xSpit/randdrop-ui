import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { ChainProps } from "../pages";
import { CheckResponse } from "../pages/api/check";
import { ClaimInfo } from "./chainCards";

type ChainListProps = {
  chains: ChainProps[];
};

const UserStaturContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex space-x-2 items-center">{children}</div>
);

const formatWinningAmount = (winningAmount: string) => {
  return `${winningAmount.slice(0, -6) + "." + winningAmount.slice(-6, -3)}`;
};

export default function ChainList({ chains }: ChainListProps) {
  const userStatusBasedOnResponse = (checkResponse?: CheckResponse) => {
    if (!checkResponse) {
      return (
        <UserStaturContainer>
          <QuestionMarkCircleIcon
            className="h-5 w-5 text-blue-400"
            aria-hidden="true"
          />
          <div>Checking</div>
        </UserStaturContainer>
      );
    }

    switch (checkResponse.userStatus) {
      case "already_lost":
        return (
          <UserStaturContainer>
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            <div>Already lost</div>
          </UserStaturContainer>
        );
      case "already_won":
        return (
          <UserStaturContainer>
            <CheckCircleIcon
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
            <div>
              You won {formatWinningAmount(checkResponse.winning_amount!)} $NOIS
            </div>
          </UserStaturContainer>
        );
      case "not_eligible":
        return (
          <UserStaturContainer>
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            <div>Not eligible</div>
          </UserStaturContainer>
        );
      case "ready":
        return (
          <UserStaturContainer>
            <CheckCircleIcon
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
            <div>Ready</div>
          </UserStaturContainer>
        );
      case "waiting_randomness":
        return (
          <UserStaturContainer>
            <QuestionMarkCircleIcon
              className="h-5 w-5 text-blue-400"
              aria-hidden="true"
            />
            <div>Waiting randomness</div>
          </UserStaturContainer>
        );
      default:
        return (
          <UserStaturContainer>
            <ExclamationTriangleIcon
              className="h-5 w-5 text-yellow-400"
              aria-hidden="true"
            />
            <div>Claim not open</div>
          </UserStaturContainer>
        );
    }
  };

  return (
    <div className="divide-y divide-gray-500 px-4 sm:px-16">
      {chains.map((chain) => (
        <div
          key={chain.name}
          className="flex flex-col sm:flex-row justify-between py-5 items-center"
        >
          <div className="flex flex-row sm:flex-col gap-x-4 pr-6 w-full sm:w-auto">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={chain.logo}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <div className="font-semibold leading-6 text-gray-100">
                <div>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {chain.name}
                </div>
              </div>
              <div className="mt-1 flex text-xs leading-5 text-gray-400">
                <div className="relative truncate hover:underline font-mono">
                  {chain.client?.walletAddress ?? "Not connected"}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-4 sm:w-1/2 sm:flex-none mt-4 sm:mt-0">
            <div className="flex space-x-2">
              {userStatusBasedOnResponse(chain.checkResponse)}
            </div>
            <div>
              {chain.checkResponse ? (
                <ClaimInfo
                  client={chain.client}
                  checkResponse={chain.checkResponse}
                  refetch={chain.refetch}
                />
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
