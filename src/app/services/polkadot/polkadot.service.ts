import { Injectable } from '@angular/core';
import { web3Accounts, web3Enable, web3FromAddress, web3FromSource } from '@polkadot/extension-dapp';
import { Keyring } from '@polkadot/keyring';
import { stringToHex, stringToU8a, u8aToHex } from '@polkadot/util';
import { cryptoWaitReady, decodeAddress, signatureVerify } from '@polkadot/util-crypto';
import { TransferModel, WalletAccountsModel } from 'src/app/models/polkadot.model';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { AppSettings } from 'src/app/app-settings';

@Injectable({
  providedIn: 'root'
})
export class PolkadotService {

  constructor(
    private appSettings: AppSettings
  ) { }

  wsProvider = new WsProvider(this.appSettings.wsProviderEndpoint);

  async getWeb3Accounts(): Promise<WalletAccountsModel[]> {
    let walletAccounts: WalletAccountsModel[] = [];
    const extensions = await web3Enable('humidefi');

    if (extensions.length > 0) {
      const accounts = await web3Accounts();
      if (accounts.length > 0) {
        for (let i = 0; i < accounts.length; i++) {
          walletAccounts.push({
            address: accounts[i].address,
            metaGenesisHash: accounts[i].meta.genesisHash,
            metaName: accounts[i].meta.name,
            metaSource: accounts[i].meta.source,
            type: accounts[i].type
          });
        }
      }
    }

    return walletAccounts;
  }

  async signAndVerify(walletAccount: WalletAccountsModel): Promise<boolean> {
    const injector = await web3FromSource(String(walletAccount.metaSource));
    const signRaw = injector?.signer?.signRaw;

    if (!!signRaw) {
      await cryptoWaitReady();

      const message: string = 'Please sign before you proceed. Thank you!';
      const { signature } = await signRaw({
        address: walletAccount.address,
        data: stringToHex(message),
        type: 'bytes'
      });

      let publicKey = decodeAddress(walletAccount.address);
      let hexPublicKey = u8aToHex(publicKey);

      let { isValid } = signatureVerify(message, signature, hexPublicKey);

      return isValid;
    }

    return false;
  }

  async generateKeypair(address: string): Promise<string> {
    const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
    const hexPair = keyring.addFromAddress(address);

    return hexPair.address;
  }

  async getBalance(keypair: string): Promise<string> {
    const api = await ApiPromise.create({ provider: this.wsProvider });
    const { nonce, data: balance } = await api.query.system.account(keypair);

    return (parseFloat(balance.free.toString()) / 1000000000000).toString();
  }

  async transfer(data: TransferModel): Promise<void> {
    const api = await ApiPromise.create({ provider: this.wsProvider });

    const extensions = await web3Enable('humidefi');
    const accounts = await web3Accounts();
    const injector = await web3FromAddress(data.keypair);

    let amount: number = data.amount * 1000000000000;

    api.setSigner(injector.signer);
    api.tx.balances.transfer(data.recipient, amount).signAndSend(data.keypair, ({ events = [], status }) => {
      console.log('Transaction status:', status.type);

      if (status.isInBlock) {
        console.log('Included at block hash', status.asInBlock.toHex());
        console.log('Events:');

        events.forEach(({ event: { data, method, section }, phase }) => {
          console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
        });
      } else if (status.isFinalized) {
        console.log('Finalized block hash', status.asFinalized.toHex());
      }
    });
  }
  blocks: any[] = [];

  async test(): Promise<any> {
    const api = await ApiPromise.create({ provider: this.wsProvider });
    // console.log(api.genesisHash.toHex());
    // console.log(api.consts.babe.epochDuration.toNumber());
    // console.log(api.consts.balances.existentialDeposit.toNumber());
    // console.log(api.consts.transactionPayment.transactionByteFee.toNumber());

    // ApiPromise
    //   .create({ provider: this.wsProvider })
    //   .then((api) =>
    //     console.log(api.genesisHash.toHex())
    //   );

    // const api = ApiPromise.create({ provider: this.wsProvider });
    // console.log((await api).isReady);

    // The actual address that we will use
    // const ADDR = '5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE';

    // Retrieve the last timestamp
    // const now = await api.query.timestamp.now();

    // // Retrieve the account balance & nonce via the system module
    // const { nonce, data: balance } = await api.query.system.account(ADDR);

    // Retrieve last block timestamp, account nonce & balances
    // const [now, { nonce, data: balance }] = await Promise.all([
    //   api.query.timestamp.now(),
    //   api.query.system.account(ADDR)
    // ]);

    // console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);

    // Retrieve the chain name
    const chain = await api.rpc.system.chain();
    // Retrieve the latest header
    // const lastHeader = await api.rpc.chain.getHeader();
  

    await api.rpc.chain.subscribeNewHeads(async (lastHeader) => {

      let timestamp;
      await api.query.timestamp.now((moment) => {
        timestamp = `${moment}`;
        console.log(`The last block has a timestamp of ${this.convertMsToTime(moment)}`);
      });

      this.blocks.push({
        block: `${lastHeader.number}`,
        hash: `${lastHeader.hash}`,
        timestamp: timestamp,
        metadata: `${lastHeader}`,
      });
    });
    console.log(this.blocks)
    return this.blocks;



    // // Subscribe to the new headers
    // await api.rpc.chain.subscribeNewHeads((lastHeader) => {
    //   console.log(`'block number:' #${lastHeader.number}`);
    //   console.log(`'hash'#${lastHeader.hash}`);
    //   console.log(`'extrinsicsRoot' #${lastHeader.extrinsicsRoot}`);
    //   console.log(lastHeader);
    //   // console.log(`'hash'#${lastHeader.}`);
    //   console.log(new Date());
    //   // console.log('hash:',lastHeader.hash);
    //   // console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
    // });
    // let count = 0;

    // // Subscribe to the new headers
    // const unsubHeads = await api.rpc.chain.subscribeNewHeads((lastHeader) => {
    //   console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);

    //   if (++count === 10) {
    //     unsubHeads();
    //   }
    // });

    // const unsub = await api.derive.chain.subscribeNewHeads((lastHeader) => {
    //   // console.log(`#${lastHeader.number} was authored by ${lastHeader.author}`);
    //   // console.log(`'hash'#${lastHeader.hash}`);
    // });
    // const _unsub = await api.query.timestamp.now((moment) => {
    //   console.log(`The last block has a timestamp of ${this.convertMsToTime(moment)}`);
    // });
  }


  padTo2Digits(num: any) {
    return num.toString().padStart(2, '0');
  }

  convertMsToTime(milliseconds: any) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;

    return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}:${this.padTo2Digits(
      seconds,
    )}`;
  }
}

