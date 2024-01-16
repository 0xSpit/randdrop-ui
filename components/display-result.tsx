import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { ParticipationStatus } from "../pages/api/check";

type StatusDisplayProps = {
  status: ParticipationStatus;
};

export const StatusDisplay: React.FC<StatusDisplayProps> = ({ status }) => {
  switch (status) {
    case "ready":
      return (
        <div className="flex items-center text-green-600">
          <CheckCircleIcon className="w-5 h-5 mr-2" />
          You are ready to participate!
        </div>
      );
    case "not_eligible":
      return (
        <div className="flex items-center text-red-400">
          <XCircleIcon className="w-5 h-5 mr-2" />
          Sorry, you are not eligible.
        </div>
      );
    case "already_won":
      return (
        <div className="flex items-center text-green-400">
          <CheckCircleIcon className="w-5 h-5 mr-2" />
          Congratulations, you've already won!
        </div>
      );
    case "already_lost":
      return (
        <div className="flex items-center text-gray-300">
          <ExclamationCircleIcon className="w-5 h-5 mr-2" />
          Sorry fren, you lost
        </div>
      );
    case "waiting_randomness":
      return (
        <div className="flex items-center text-yellow-600">
          <ClockIcon className="w-5 h-5 mr-2" />
          Waiting for randomness...
        </div>
      );
    default:
      return (
        <div className="flex items-center text-gray-600">
          <QuestionMarkCircleIcon className="w-5 h-5 mr-2" />
          Status unknown
        </div>
      );
  }
};
