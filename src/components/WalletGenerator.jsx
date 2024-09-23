import { useState } from "react";
import { generateMnemonic } from "bip39";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

const WalletGenerator = () => {

    const [mnemonic, setMnemonic] = useState("");
    const [walletType, setWalletType] = useState("");
    const wordArray = mnemonic.split(" ");

  return (
    <main className="flex w-full h-full justify-center">
        <div className="container">
            <h1 className="text-4xl mt-14 font-semibold">DeWall supports multiple blockchains</h1>
            <h2 className="text-lg mt-2 text-gray-300">Choose a blockchain to get started</h2>

            {mnemonic == "" ?
            <button onClick={async function() {
                const mn = await generateMnemonic();
                setMnemonic(mn)
                }} className="bg-white font-light text-black px-6 py-2 rounded-md my-5">
                Create Seed Phrase
            </button>
            :
            <div className="bg-black border-[0.9px] border-gray-800 p-6 rounded-lg shadow-lg w-[100%] mx-auto my-8">
                
                <Disclosure>
                    <div className="flex justify-between ">
                        <DisclosureButton className="pt-2 pb-5 text-4xl font-semibold min-w-100" >Your Sceret Pharse</DisclosureButton>
                        <DisclosureButton className="pt-2 pb-5 text-4xl font-semibold min-w-100" >+</DisclosureButton>
                    </div>
                    <DisclosurePanel className="text-gray-500">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {wordArray.map((word, index) => (
                            <div key={index} className="bg-gray-950 p-4 text-center font-normal text-white border-gray-700 border-[1px] rounded-md">
                                {word}
                            </div>
                            ))}
                        </div>
                    </DisclosurePanel>
                </Disclosure>
            </div>
            }

            {walletType == "" && mnemonic!== "" ? <div className="flex gap-2 mt-5">
                <button className="bg-white font-light text-black px-6 py-2 rounded-md" >Solana</button>
                <button className="bg-white font-light text-black px-6 py-2 rounded-md">Ethereum</button>
            </div>:""}
        </div>
    </main>
  )
}

export default WalletGenerator