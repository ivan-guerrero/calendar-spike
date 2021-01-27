import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit, AfterViewInit {
  months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];

  today: Date;
  currMonth: string;
  currYear: number;
  days: HTMLDivElement;
  daysInner: string;

  constructor() {}

  ngOnInit(): void {
    this.today = new Date();
    this.currMonth = this.months[this.today.getMonth()];
    this.currYear = this.today.getFullYear();
    this.daysInner =
      this.getPrevDays(this.today.getMonth(), this.currYear) +
      this.getDays(
        this.getLastDayOfMonth(this.today.getMonth(), this.currYear)
      ) +
      this.getLastDays(this.today.getMonth(), this.currYear);
  }

  ngAfterViewInit(): void {
    this.days = document.querySelector('.days');
    this.days.innerHTML = this.daysInner;
  }

  // builds a normal day markup
  normalDayBuilder(day: number): string {
    return `
      <div>
        ${day}
      </div>
    `;
  }

  // builds a previous' month day markup
  previousMonthDay(day: number): string {
    return `
      <div class="prev-date">
        ${day}
      </div>
    `;
  }

  // builds a next's month day markup
  nextMonthDay(day: number): string {
    return `
      <div class="next-date">
        ${day}
      </div>
    `;
  }

  // returns the last day of the month (e.g. 31)
  getLastDayOfMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  // returns all days for a month with the given last day of the month
  getDays(lastDay: number): string {
    let days = '';
    for (let day = 1; day <= lastDay; day++) {
      days += this.normalDayBuilder(day);
    }
    return days;
  }

  // returns the markup for the previous days for a given month
  getPrevDays(month: number, year: number): string {
    const firstDayWeekDayIdx = new Date(year, month, 1).getDay();
    const prevLastDay = new Date(year, month, 0).getDate();
    let prevDays = '';
    for (let dayIdx = firstDayWeekDayIdx; dayIdx > 0; dayIdx--) {
      prevDays += this.previousMonthDay(prevLastDay - dayIdx + 1);
    }
    return prevDays;
  }

  // returns the markup for the last days for a given month
  getLastDays(month: number, year: number): string {
    const lastDayWeekDayIdx = new Date(year, month + 1, 0).getDay();
    let nextDays = '';
    for (let dayIdx = 1; dayIdx <= 6; dayIdx++) {
      nextDays += this.nextMonthDay(dayIdx);
    }
    return nextDays;
  }
}
