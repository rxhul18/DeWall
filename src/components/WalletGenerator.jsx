import { useState } from "react";
import { generateMnemonic } from "bip39";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import SolanaWallet from "./SolanaWallet";
import EthWallet from "./EthWallet";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const WalletGenerator = () => {

    const notify = (meassage) => toast(meassage); 
    const [mnemonic, setMnemonic] = useState("");
    const [walletType, setWalletType] = useState("");
    const wordArray = mnemonic.split(" ");

  return (
    <main className="flex w-full h-full justify-center">
        <div className="container">
            <h1 className="text-4xl mt-14 font-semibold">DeWall supports multiple blockchains</h1>
            <h2 className="text-lg mt-2 text-gray-300">{`${mnemonic == '' ? "Click to get started by creating Secret Recovery" :"Secret Recovery"}`}</h2>

            {mnemonic == "" ?
            <button onClick={async function() {
                const mn = await generateMnemonic();
                setMnemonic(mn)
                notify("Secret Recovery Phrase Created")
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
                <button className="bg-white font-light text-black px-6 py-2 rounded-md" onClick={()=>{
                    setWalletType('Solana')
                    notify("Solana Wallet Selected")
                }}>Solana</button>
                <button className="bg-white font-light text-black px-6 py-2 rounded-md" onClick={()=>{
                    setWalletType('Ethereum')
                    notify("Ethereum Wallet Selected")
                    }}>Ethereum</button>
            </div>:null}
                
            {walletType == 'Solana' && <SolanaWallet mnemonic={mnemonic} walletType={walletType}/>}
            {walletType == 'Ethereum' && <EthWallet mnemonic={mnemonic} walletType={walletType}/>}
        </div>
        <ToastContainer 
        theme="dark"
        position="bottom-right"
        hideProgressBar={false}
        />
    </main>
  )
}

export default WalletGenerator