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
      { label: 'Blocks', routerLink: '/scanner/blocks', icon: 'pi pi-box' },
      { label: 'Accounts', routerLink: '/scanner/accounts', icon: 'pi pi-key' },
      { label: 'Validators', routerLink: '/scanner/validators', icon: 'pi pi-users' },
      { label: 'Script', routerLink: '/scanner/scripts', icon: 'pi pi-code' },
    ];
  }
}
