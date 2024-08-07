const { ethers } = require('ethers');
const prompt = require('prompt-sync')();
const fs = require('fs');
const path = require('path');

function generateWallet() {
    const wallet = ethers.Wallet.createRandom();
    return {
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic.phrase
    };
}

const numberOfWallets = parseInt(prompt("Berapa address EVM yang akan di Generate: "), 10);

if (isNaN(numberOfWallets) || numberOfWallets <= 0) {
    console.log("Please enter a valid number greater than 0.");
} else {
    const wallets = [];
    for (let i = 0; i < numberOfWallets; i++) {
        wallets.push(generateWallet());
    }

    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    let addressContent = '';
    let walletContent = '';
    wallets.forEach((wallet, index) => {
        addressContent += `${wallet.address}\n`;
        walletContent += `Wallet ${index + 1}:\n`;
        walletContent += `Private Key: ${wallet.privateKey}\n`;
        walletContent += `Mnemonic: ${wallet.mnemonic}\n\n`;
    });

    fs.writeFileSync(path.join(outputDir, 'address.txt'), addressContent);
    
    fs.writeFileSync(path.join(outputDir, 'wallet.txt'), walletContent);

    console.log(`Generated ${numberOfWallets} wallets. Address disimpan di 'output/address.txt' dan detail setiap wallet di 'output/wallet.txt'.`);
}
