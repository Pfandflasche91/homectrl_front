import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  private widthSubject = new BehaviorSubject<number>(0);
  private heightSubject = new BehaviorSubject<number>(0);

  width$ = this.widthSubject.asObservable();
  height$ = this.heightSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.updateSize();
      fromEvent(window, 'resize').pipe(debounceTime(100)).subscribe(() => {
        this.updateSize();
      });
    }
  }

  private updateSize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.widthSubject.next(window.innerWidth);
      this.heightSubject.next(window.innerHeight);
    }
  }
}
