import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DappRoutingModule } from './dapp-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { DappComponent } from './dapp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LoadBridgeComponent } from './load-bridge/load-bridge.component';
import { LoadPurchaseComponent } from './load-purchase/load-purchase.component';
import { SwapComponent } from './swap/swap.component';
import { StakeComponent } from './stake/stake.component';
import { TransferComponent } from './transfer/transfer.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

@NgModule({
  declarations: [
    DappComponent,
    DashboardComponent,
    PortfolioComponent,
    LoadBridgeComponent,
    LoadPurchaseComponent,
    SwapComponent,
    StakeComponent,
    TransferComponent,
    WithdrawComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DappRoutingModule,
    LayoutModule,
    CardModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    InputTextModule
  ]
})
export class DappModule { }
