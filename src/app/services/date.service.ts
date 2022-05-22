import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private datePipe: DatePipe) { }
  _quarter: { [key: number]: number[] } = {
    1: [3, 4, 5],
    2: [6, 7, 8],
    3: [9, 10, 11],
    4: [12, 13, 14]
  }
  get quarter() {
    return this._quarter
  }
  /**
   * 月末の日付を返す。
   * @param data
   */
  getEndofTheMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
  }
  /**
   * 月初の日付を返す。
   * @param date
   */
  getStartofTheMonth(date: Date): Date {
    date.setDate(1)
    return date
  }
  /**
   *渡されたDateの月の締め日を返す
   */
  getClosingDay(date: Date, closingDay: number): Date {
    const copy_date = new Date(date)
    const dateYear = date.getMonth()
    copy_date.setDate(closingDay)
    if (dateYear === copy_date.getMonth())
      return copy_date
    //締め日をセットした結果月が変わった場合処理
    else
      return this.getEndofTheMonth(date)
  }
  /**
   * 日付のStart、Endを締め日から計算
   * @param start 
   * @param end 
   * @param closingDay 
   * @returns 
   */
  convertingInputTerm(start: Date, end: Date, closingDay: number) {
    const startDate = this.getClosingDay(start, closingDay)
    const endDate = this.getClosingDay(end, closingDay)
    const displayStartDate = new Date(new Date(startDate.setDate(startDate.getDate() + 1)).setMonth(startDate.getMonth() - 1))
    const displayEndDate = new Date(endDate)
    return { displayStartDate, displayEndDate }
  }

  convertingGetApiTerm(start: Date, end: Date) {
    const StartDate = new Date(new Date(start.setMonth(start.getMonth() + 1)))
    const EndDate = new Date(end)
    const displayStartDate = this.dateFormat(
      new Date(StartDate),
      'yyyy-MM'
    )
    const displayEndDate = this.dateFormat(
      new Date(EndDate),
      'yyyy-MM'
    )
    return { displayStartDate, displayEndDate }
  }

  /**
   *
   * @param format
   */
  dateFormat(date: Date, format: string) {
    return this.datePipe.transform(date, format)
  }
  /**
   * 日付の入力が矛盾していないかcheck
   * 不正な入力の場合false
   * @param from
   * @param to
   * @returns
   */
  dateFromToValidation(from: Date, to: Date): boolean {
    return from < to
  }

  selectedTarmText(selectedYear: number, quarter: number): string {
    const selectQuarters = this.quarter[quarter]
    const start = selectQuarters[0]
    const end = selectQuarters[this.quarter[quarter].length - 1]
    const startDate = new Date(`${selectedYear}/${1}`)
    const endDate = new Date(`${selectedYear}/${1}`)
    startDate.setMonth(start - 1)
    endDate.setMonth(end - 1)
    return `${selectedYear}年${quarter}Q(${startDate.getMonth() + 1}月～${endDate.getMonth() + 1}月)`
  }
  getQuarterTarm(quarter: number) {
    const selectQuarters = this.quarter[quarter]
    const start = selectQuarters[0]
    const end = selectQuarters[this.quarter[quarter].length - 1]
    return { start, end }
  }
  dateTermDuplicatedCheck(year: number, quarter: number, startDate: Date, endDate: Date) {
    const { start, end } = this.getQuarterTarm(quarter)
    //Gridの期間
    var date1 = {
      start: this.getStartofTheMonth(new Date(`${year}-${start}`)),
      end: this.getClosingDay(new Date(`${year}-${end}`), 20)
    };

    // 
    var date2 = {
      start: startDate,
      end: endDate
    };

    return date1.start <= date2.end && date1.end >= date2.start;
  }
}
