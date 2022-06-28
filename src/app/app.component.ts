import { Component, HostBinding, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { TuiBrightness } from '@taiga-ui/core';
import {
  ANIMATION_FRAME,
  LOCAL_STORAGE,
  LOCATION,
  NAVIGATOR,
  PAGE_VISIBILITY,
  PERFORMANCE,
  SESSION_STORAGE,
  SPEECH_RECOGNITION,
  SPEECH_SYNTHESIS,
  USER_AGENT,
  WINDOW,
} from '@ng-web-apis/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  open: boolean = false;

  readonly tinkoff = [
    'Taiga-UI',
    'ng-event-plugins',
    'ng-polymorpheus',
    'ng-dompurify',
  ];

  toggle(open: boolean): void {
    this.open = open;
  }

  night =
    this.localStorage.getItem('night') === 'true' ||
    (this.localStorage.getItem('night') === null &&
      this.windowRef.matchMedia('(prefers-color-scheme: dark)').matches);

  constructor(
    @Inject(WINDOW) readonly windowRef: Window,
    @Inject(LOCAL_STORAGE) readonly localStorage: Storage
  ) {}

  readonly change$ = new Subject<void>();

  @HostBinding('attr.data-mode')
  get mode(): TuiBrightness {
    return this.night ? 'onDark' : 'onLight';
  }

  onMode(night: boolean): void {
    this.night = night;
    this.change$.next();
    localStorage.setItem('night', String(night));
  }
}
