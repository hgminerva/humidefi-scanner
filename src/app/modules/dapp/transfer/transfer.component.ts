import { Component, OnInit } from '@angular/core';
import { TransferModel } from 'src/app/models/polkadot.model';
import { PolkadotService } from 'src/app/services/polkadot/polkadot.service';

interface SourceNetwork {
  name: string,
}

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  sourceNetworks: SourceNetwork[];

  walletMetaName: string = "";
  walletKeyPair: string = "";
  walletBalance: string = "";

  transferData: TransferModel = new TransferModel();

  constructor(
    private polkadotService: PolkadotService
  ) {
    this.sourceNetworks = [
      { name: 'Acala' }
    ];
  }

  async getBalance(): Promise<void> {
    let balance: Promise<string> = this.polkadotService.getBalance(this.walletKeyPair);
    this.walletBalance = (await balance);
  }

  async transfer(): Promise<void> {
    this.transferData.keypair = this.walletKeyPair;
    this.polkadotService.transfer(this.transferData);
  }

  ngOnInit(): void {
    this.walletMetaName = localStorage.getItem("wallet-meta-name") || "";
    this.walletKeyPair = localStorage.getItem("wallet-keypair") || "";

    this.getBalance();
  }
}
