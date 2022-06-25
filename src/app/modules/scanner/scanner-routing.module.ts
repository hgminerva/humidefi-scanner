import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { BlocksComponent } from './blocks/blocks.component';
import { ScannerComponent } from './scanner.component';
import { ScriptsComponent } from './scripts/scripts.component';
import { ValidatorsComponent } from './validators/validators.component';


const routes: Routes = [
  {
    path: '',
    component: ScannerComponent,
    children: [
      { path: '', component: BlocksComponent },
      { path: 'blocks', component: BlocksComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'validators', component: ValidatorsComponent },
      { path: 'scripsts', component: ScriptsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScannerRoutingModule { }
