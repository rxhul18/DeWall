import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import listImage from "../assets/list.png";
import gridImage from "../assets/grid.png";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
export default function SolanaWallet({ mnemonic, walletType }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);
  const [listType, setListType] = useState("list");
  const notify = (meassage) => toast(meassage); 

  const addWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic); // mnemonicToSeed returns a promise
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    const privateKey = keypair.secretKey;
    // setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
    setPublicKeys([
      ...publicKeys,
      {
        publicKey: keypair.publicKey.toBase58(),
        privateKey: privateKey.toString(),
      },
    ]);
    setCurrentIndex(currentIndex + 1);
    notify(`Wallet ${currentIndex + 1} created`);
  };

  const clearWallet = () => {
      setPublicKeys([]);
      setCurrentIndex(0);
      notify('Wallet Cleared Successfully')
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-4xl pt-5 mb-6">
          {walletType} Wallet
        </h2>
        <div className="flex gap-4 h-10 items-center">
          <div className="flex items-center">
            {listType == "list" ? (
              <button onClick={() => setListType("grid")} title="List item">
                <img src={listImage} width={30} height={30} />{" "}
              </button>
            ) : (
              <button onClick={() => setListType("list")} title="Grid Item">
                <img src={gridImage} width={25} height={25} />{" "}
              </button>
            )}
          </div>
          <button
            onClick={addWallet}
            className="bg-white text-black py-2 px-5 font-light text-md rounded"
          >
            Add Wallet
          </button>{" "}
          <button
            onClick={clearWallet}
            className="bg-red-900 text-white py-2 px-5 font-light text-md rounded"
          >
            Clear wallet
          </button>
        </div>
      </div>
      <div
        className={`mt-4 grid ${
          listType == "list" ? "grid-cols-1" : "grid-cols-2"
        } gap-4 w-100 mb-9`}
      >
        {publicKeys.map((data, index) => (
          <div
            key={index}
            className="bg-black border-[0.9px] border-gray-800 pt-6 my-2 mb-0 rounded-xl shadow-lg w-[100%]"
          >
            <h2 className="text-3xl font-semibold px-6">Wallet {++index}</h2>
            <div className="mt-3 p-6 bg-[#181818] rounded-xl rounded-t-2xl">
              <h2 className="font-semibold text-xl mt-4">Public key</h2>
              <p className="font-light text-sm mt-1">{data.publicKey}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
