import { Component, OnInit } from '@angular/core';

interface SourceNetwork {
  name: string,
}

@Component({
  selector: 'app-load-bridge',
  templateUrl: './load-bridge.component.html',
  styleUrls: ['./load-bridge.component.scss']
})
export class LoadBridgeComponent implements OnInit {

  sourceNetworks: SourceNetwork[];

  walletMetaName: string = "";
  walletKeyPair: string = "";

  constructor() {
    this.sourceNetworks = [
      { name: 'Acala' }
    ];
  }

  ngOnInit(): void {
    this.walletMetaName = localStorage.getItem("wallet-meta-name") || "";
    this.walletKeyPair = localStorage.getItem("wallet-keypair") || "";
  }

}
