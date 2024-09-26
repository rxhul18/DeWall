import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import listImage from "../assets/list.png";
import gridImage from "../assets/grid.png";
import { useState } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const EthWallet = ({ mnemonic , walletType}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [listType, setListType] = useState("list");
  const notify = (meassage) => toast(meassage); 

  const addWallet = async () => {
    // Convert mnemonic to seed
    const seed = await mnemonicToSeed(mnemonic);
    // Derivation path for Ethereum wallets (BIP44)
    const derivationPath = `m/44'/60'/${currentIndex}'/0/0`;
    // Create an HD wallet node from the seed
    const hdNode = HDNodeWallet.fromSeed(seed);
    // Derive the wallet from the specific path
    const child = hdNode.derivePath(derivationPath);
    // Get the private key and create a wallet instance
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);

    // Update the current index and the list of addresses
    setCurrentIndex(currentIndex + 1);
    setAddresses([...addresses, wallet.address]);
    notify(`Wallet ${currentIndex + 1} created`);
  };

  const clearWallet = () => {
    setAddresses([]);
    setCurrentIndex(0);
  };

  return (
    // <div>
    //   <button onClick={addWallet}>Add ETH wallet</button>
      
    //   <div>
    //     {addresses.map((address, index) => (
    //       <div key={index}>
    //         Eth - {address}
    //       </div>
    //     ))}
    //   </div>
    // </div>
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
        } gap-4 w-100`}
      >
        {addresses.map((address, index) => (
          <div
            key={index}
            className="bg-black border-[0.9px] border-gray-800 pt-6 my-5 rounded-xl shadow-lg w-[100%]"
          >
            <h2 className="text-3xl font-semibold px-6">Wallet {++index}</h2>
            <div className="mt-3 p-6 bg-[#181818] rounded-xl rounded-t-2xl">
              <h2 className="font-semibold text-xl mt-4">Public key</h2>
              <p className="font-light text-sm mt-1">{address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EthWallet;