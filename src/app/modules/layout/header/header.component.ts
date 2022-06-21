import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { WalletAccountsModel } from 'src/app/models/polkadot.model';
import { PolkadotService } from 'src/app/services/polkadot/polkadot.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  titleName: string = "";
  menuItems: MenuItem[] = [];
  loadingRoute: boolean = true;

  constructor(
    private router: Router,
    private polkadotService: PolkadotService,
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.loadingRoute = true;
      }

      if (event instanceof NavigationEnd) {
        switch (event.url) {
          case '/dapp':
            this.titleName = "Home";

            this.menuItems = [
              { label: 'Home' }
            ];
            break;
          case '/dapp/dashboard':
            this.titleName = "Home";

            this.menuItems = [
              { label: 'Home' }
            ];
            break;
          case '/dapp/portfolio':
            this.titleName = "Portfolio";
            this.menuItems = [
              { label: 'Home' },
              { label: 'Portfolio' }
            ];
            break;
          case '/dapp/load-bridge':
            this.titleName = "Bridge";
            this.menuItems = [
              { label: 'Home' },
              { label: 'Bridge' }
            ];
            break;
          case '/dapp/load-purchase':
            this.titleName = "Purchase";
            this.menuItems = [
              { label: 'Home' },
              { label: 'Purchase' }
            ];
            break;
          case '/dapp/swap':
            this.titleName = "Swap";
            this.menuItems = [
              { label: 'Home' },
              { label: 'Swap' }
            ];
            break;
          case '/dapp/stake':
            this.titleName = "Stake";
            this.menuItems = [
              { label: 'Home' },
              { label: 'Stake' }
            ];
            break;
          case '/dapp/transfer':
            this.titleName = "Transfer";
            this.menuItems = [
              { label: 'Home' },
              { label: 'Transfer' }
            ];
            break;
          case '/dapp/withdraw':
            this.titleName = "Withdraw";
            this.menuItems = [
              { label: 'Home' },
              { label: 'Withdraw' }
            ];
            break;
          default:
            break;
        }

        setTimeout(() => {
          this.loadingRoute = false;
        }, 500);
      }

      if (event instanceof NavigationError) {
        setTimeout(() => {
          this.loadingRoute = false;
        }, 500);
      }
    });
  }

  walletName: string = "";
  displayChangeAccountDialog: boolean = false;

  web3Wallets: WalletAccountsModel[] = [];
  selectedWallet: WalletAccountsModel = new WalletAccountsModel();

  changeAccount(): void {
    this.displayChangeAccountDialog = true;

    this.web3Wallets = [];
    this.selectedWallet = new WalletAccountsModel();

    this.getWeb3Accounts();
  }

  async getWeb3Accounts(): Promise<void> {
    let web3Accounts: Promise<WalletAccountsModel[]> = this.polkadotService.getWeb3Accounts();
    let data = (await web3Accounts);

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        this.web3Wallets.push({
          address: data[i].address,
          metaGenesisHash: data[i].metaGenesisHash,
          metaName: data[i].metaName,
          metaSource: data[i].metaSource,
          type: data[i].type
        });
      }
    }
  }

  onWalletSelect(event: any): void {
    this.signAndVerify();
  }

  async signAndVerify(): Promise<void> {
    let signAndVerify: Promise<boolean> = this.polkadotService.signAndVerify(this.selectedWallet);
    let verified = (await signAndVerify);
    if (verified == true) {
      this.generateKeypair();
    }
  }

  async generateKeypair(): Promise<void> {
    let generateKeypair: Promise<string> = this.polkadotService.generateKeypair(this.selectedWallet.address);
    let keypair = (await generateKeypair);
    if (keypair != "") {
      localStorage.setItem("wallet-meta-name", String(this.selectedWallet.metaName));
      localStorage.setItem("wallet-keypair", keypair);

      this.getWalletInfo();

      this.displayChangeAccountDialog = false;
    }
  }

  getWalletInfo(): void {
    this.walletName = localStorage.getItem("wallet-meta-name") || "";
  }

  ngOnInit(): void {
    this.getWalletInfo();
  }
}
