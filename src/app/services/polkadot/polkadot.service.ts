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

  wsProvider;

  constructor(
    private appSettings: AppSettings
  ) {
    let network = localStorage.getItem('network');
    if (network == 'Testnet') {
      this.wsProvider = new WsProvider(this.appSettings.testNetWSProviderEndpoint);
    } else if (network == 'Devnet') {
      this.wsProvider = new WsProvider(this.appSettings.devnetWSProviderEndpoint);
    }
  }

  

  async blocks(): Promise<any> {

    let blockArray: any[] = [];

    const api = await ApiPromise.create({ provider: this.wsProvider });

    await api.rpc.chain.subscribeNewHeads(async (lastHeader) => {
      let signature;
      let extrinsics = await (await api.rpc.chain.getBlock(`${lastHeader.hash}`)).block.extrinsics;
      signature = `${extrinsics[0].signer}`;
      let timestamp;
      await api.query.timestamp.now((moment) => {
        timestamp = `${moment}`;
      });

      let signedBlock = await api.rpc.chain.getBlock(`${lastHeader.hash}`);

      const apiAt = await api.at(signedBlock.block.header.hash);
      const allRecords = await apiAt.query.system.events();


      let extrinsic = JSON.parse(`${allRecords}`);
      let weight = extrinsic[0].event.data[0].weight;

      let _extrinsics: any[] = [];
      // map between the extrinsics and events
      // source document https://polkadot.js.org/docs/api/cookbook/blocks/
      // network monitoring https://polkadot.js.org/

      let events: any[] = [];
      signedBlock.block.extrinsics.forEach(async ({ method: { method, section } }, index) => {

        let data: any;
        const _events = allRecords
          .filter(({ phase }) =>
            phase.isApplyExtrinsic &&
            phase.asApplyExtrinsic.eq(index)
          )
          .map(({ event }) => data = { name: `${event.section}.${event.method}`, data: JSON.parse(`${event.data}`) }
          );

        events.push(_events);
      });

      let index = 0;
      for (var i = 0; i < events.length; i++) {

        for (var e = 0; e < events[i].length; e++) {

          if (events[i][e].name == 'system.ExtrinsicSuccess') weight = events[i][e].data[0].weight;
          _extrinsics.push(
            {
              id: ++index,
              extrinsic: events[i][e].name,
              data: events[i][e].data
            })
        }
      }

      _extrinsics.sort((a, b) => b.id - a.id);
      blockArray.push({
        timestamp: timestamp,
        block: `${lastHeader.number}`,
        hash: `${lastHeader.hash}`,
        extrinsics: _extrinsics,
        weight: weight,
        signature: signature,
      });

      blockArray.sort((a, b) => b.block - a.block);
    });

    return blockArray;
  }
}

