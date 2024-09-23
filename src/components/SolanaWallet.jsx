import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export default function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  const addWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic); // mnemonicToSeed returns a promise
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    
    setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div>
      <button 
        onClick={addWallet}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Wallet
      </button>
      <div className="mt-4">
        {publicKeys.map((p, index) => (
          <div key={index} className="mb-2 p-2 bg-gray-100 rounded border">
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}