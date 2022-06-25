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
      { label: 'Blocks', routerLink: '/scanner/blocks' },
      { label: 'Accounts', routerLink: '/scanner/accounts' },
      { label: 'Validators', routerLink: '/scanner/validators' },
      { label: 'Script', routerLink: '/scanner/scripts' },
    ];
  }
}
