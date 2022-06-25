import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ScannerComponent } from './scanner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScannerRoutingModule } from './scanner-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { BlocksComponent } from './blocks/blocks.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ValidatorsComponent } from './validators/validators.component';
import { ScriptsComponent } from './scripts/scripts.component';

@NgModule({
  declarations: [
    ScannerComponent,
    BlocksComponent,
    AccountsComponent,
    ValidatorsComponent,
    ScriptsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScannerRoutingModule,
    LayoutModule,
    CardModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    InputTextModule,
  ],
  providers: [
    DatePipe,
  ]
})
export class ScannerModule { }
