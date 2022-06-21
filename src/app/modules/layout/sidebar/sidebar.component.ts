import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = [
      { label: 'Dashboard', routerLink: '/dapp/dashboard' },
      { label: 'Portfolio', routerLink: '/dapp/portfolio' },
      { label: 'Load', routerLink: '/dapp/load-bridge' },
      { label: 'Purchase', routerLink: '/dapp/load-purchase' },
      { label: 'Swap', routerLink: '/dapp/swap' },
      { label: 'Stake', routerLink: '/dapp/stake' },
      { label: 'Transfer', routerLink: '/dapp/transfer' },
      { label: 'Withdraw', routerLink: '/dapp/withdraw' }
    ];
  }
}
