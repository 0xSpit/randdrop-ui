import React from "react";
import { SupportedChain, useUserStore } from "../store/userStore";

export const BlockchainAddressInput: React.FC = () => {
  const { address, setAddress, setChain } = useUserStore();

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = event.target.value;
    setAddress(newAddress);

    if (newAddress.startsWith("inj")) {
      setChain(SupportedChain.injective);
    } else if (newAddress.startsWith("ju")) {
      setChain(SupportedChain.juno);
    } else if (newAddress.startsWith("star")) {
      setChain(SupportedChain.stargaze);
    } else if (newAddress.startsWith("au")) {
      setChain(SupportedChain.aura);
    } else if (newAddress.startsWith("osm")) {
      setChain(SupportedChain.osmosis);
    }
  };

  return (
    <div className="my-4">
      <label
        htmlFor="address"
        className="block text-sm font-medium leading-6 text-white"
      >
        Address
      </label>
      <div className="mt-2">
        <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 w-full">
          <input
            type="text"
            name="address"
            id="address"
            autoComplete="address"
            className="flex-1 border-0 bg-transparent py-1.5 pl-2 text-white focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Enter blockchain address"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
      </div>
    </div>
  );
};
