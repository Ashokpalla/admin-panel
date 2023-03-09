import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'admin-panel-layout';
  sideBarOpen = true;
  date ;
  StartEndDatesOutput($event: any){
    this.date = $event;
    console.log($event);
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
