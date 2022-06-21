import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { HomeComponent } from './home.component';
import { ConnectWalletComponent } from './connect-wallet/connect-wallet.component';

@NgModule({
  declarations: [
    HomeComponent,
    ConnectWalletComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CardModule,
    ButtonModule,
    TableModule
  ]
})
export class HomeModule { }
