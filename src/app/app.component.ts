import { Component } from '@angular/core';
import { DateService } from './services/date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private dateService: DateService) {

  }
  title = 'angular-common';
  start: string = '2022-1'
  end: string = '2022-4'

  button() {
    const { displayStartDate, displayEndDate } = this.dateService.convertingGetApiTerm(new Date('2022-02-21T00:00:00'), new Date('2022-03-20T00:00:00'))

    // const { displayStartDate, displayEndDate } = this.dateService.convertingInputTerm(new Date(this.start), new Date(this.end), 20)
    // console.log(this.dateService.dateFormat(displayStartDate, 'yyyy-MM-dd'), this.dateService.dateFormat(displayEndDate, 'yyyy-MM-dd'))
    console.log(displayStartDate, displayEndDate)
  }
}
