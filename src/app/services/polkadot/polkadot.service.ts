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

  blockArray: any[] = [];

  async blocks(): Promise<any> {
    const api = await ApiPromise.create({ provider: this.wsProvider });

    await api.rpc.chain.subscribeNewHeads(async (lastHeader) => {


      // get the api and events at a specific block
      const apiAt = await api.at(`${lastHeader.hash}`);
      const allRecords = await apiAt.query.system.events();
      let extrinsic = JSON.parse(`${allRecords}`);
      let weight = extrinsic[0].event.data[0].weight;
      console.log(`${lastHeader.hash}`)

      // const [phase,[index, data]] = allRecords;
      // console.log(data);
      let signature;
      let extrinsics = await (await api.rpc.chain.getBlock(`${lastHeader.hash}`)).block.extrinsics;
      signature = `${extrinsics[0].signer}`;

      let _extrinsics;
      let signedBlock = await api.rpc.chain.getBlock(`${lastHeader.hash}`);
      // the hash for each extrinsic in the block
      signedBlock.block.extrinsics.forEach((ex, index) => {
        // console.log(index, ex.hash.toHex());
        _extrinsics = ex.hash.toHex();
      });

      let timestamp;
      await api.query.timestamp.now((moment) => {
        timestamp = `${moment}`;
      });

      this.blockArray.push({
        timestamp: timestamp,
        block: `${lastHeader.number}`,
        hash: `${lastHeader.hash}`,
        extrinsics: _extrinsics,
        weight: weight,
        signature: signature,
      });

      this.blockArray.sort((a, b) => b.block - a.block);
    });

    return this.blockArray;
  }

}

