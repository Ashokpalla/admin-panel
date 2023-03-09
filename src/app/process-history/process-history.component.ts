import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-history',
  templateUrl: './process-history.component.html',
  styleUrls: ['./process-history.component.scss']
})
export class ProcessHistoryComponent implements OnInit {

  fromDate: Date;
  toDate: Date;
  reason: string;

  constructor() { }

  ngOnInit(): void {
  }

}
