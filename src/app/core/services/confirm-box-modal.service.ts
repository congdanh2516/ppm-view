import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmBoxModalService {

  constructor() { }

  private subject = new Subject<any>();

  sendMessage (message : any) {
    this.subject.next(message);
    // setTimeout(() => {
    //   this.clearMessage()
    // }, 4100)
  }

  clearMessage () {
    this.subject.next('');
  }

  getMessage () : Observable<any> {
    return this.subject.asObservable();
  }
}
