import { formatDate } from '@angular/common';

export function format(date: Date) {
  return formatDate(new Date(date), 'dd/MM/yyyy', 'en-US', 'Asia/Ho_Chi_Minh');
}

export function time(date: Date) {
  return new Date(new Date(date).getTime() + 7 * 60 * 60 * 1000);
}
