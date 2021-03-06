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
          case '/':
            this.titleName = "Home";

            this.menuItems = [
              { label: 'Home' },
              { label: 'Blocks' }
            ];
            break;
          case '/scanner':
            this.titleName = "Home";

            this.menuItems = [
              { label: 'Home' },
              { label: 'Blocks' }
            ];
            break;
          case '/scanner/blocks':
            this.titleName = "Blocks";
            this.menuItems = [
              { label: 'Home' },
              { label: 'Blocks' }
            ];
            break;
          case '/scanner/accounts':
            this.titleName = "Accounts";
            this.menuItems = [
              { label: 'Home' },
              { label: 'Accounts' }
            ];
            break;
          case '/scanner/validators':
            this.titleName = "Validators";
            this.menuItems = [
              { label: 'Home' },
              { label: 'Validators' }
            ];
            break;
          case '/scanner/scripts':
            this.titleName = "Accounts";
            this.menuItems = [
              { label: 'Home' },
              { label: 'Accounts' }
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

  selected_network: any = "testnet";
  isComponentShown: boolean = false;
  networks: any[] = [{
    name: 'testnet',
    icon: 'testnet-icon'
  },
  {
    name: 'devnet',
    icon: 'devnet-icon'
  }
  ];

  networkOnChange(event: any): void {
    localStorage.setItem('network', this.selected_network);
    setTimeout(() => {
      location.reload();
    }, 300);
  }
  ngOnInit(): void {
    let network = localStorage.getItem('network');
    setTimeout(() => {
      if (network == null) {
        this.selected_network = 'testnet';
        localStorage.setItem('network', this.selected_network);
        setTimeout(() => {
          location.reload();
        }, 100);
      } else {
        this.selected_network = network;
      }
    }, 100);
  }
}
