import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { PolkadotService } from 'src/app/services/polkadot/polkadot.service';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {
  
  constructor(
    private polkadotService: PolkadotService,
    private datepipe: DatePipe
  ) { }

  blocks: any[] = [];

  async getBlocks(): Promise<void> {
    let balance: Promise<any> = this.polkadotService.blocks();

    this.blocks = (await balance);
    console.log(this.blocks);
  }

  padTo2Digits(num: any) {
    return num.toString().padStart(2, '0');
  }

  convertMsToTime(milliseconds: any) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;
    let date_now = this.datepipe.transform(new Date(), 'yyyy-MM-dd');

    return `${date_now} ${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}:${this.padTo2Digits(
      seconds,
    )}`;
  }


  ngOnInit(): void {
    this.getBlocks();
  }
}
