import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DappComponent } from './dapp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LoadBridgeComponent } from './load-bridge/load-bridge.component';
import { LoadPurchaseComponent } from './load-purchase/load-purchase.component';
import { SwapComponent } from './swap/swap.component';
import { StakeComponent } from './stake/stake.component';
import { TransferComponent } from './transfer/transfer.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

const routes: Routes = [
  {
    path: '',
    component: DappComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'portfolio', component: PortfolioComponent },
      { path: 'load-bridge', component: LoadBridgeComponent },
      { path: 'load-purchase', component: LoadPurchaseComponent },
      { path: 'swap', component: SwapComponent },
      { path: 'stake', component: StakeComponent },
      { path: 'transfer', component: TransferComponent },
      { path: 'withdraw', component: WithdrawComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DappRoutingModule { }
