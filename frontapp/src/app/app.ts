import { Component, signal, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PlayerComponent } from './components/player/player';
import { filter } from 'rxjs';

declare const lucide: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, PlayerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  protected readonly title = signal('frontapp');
  private platformId = inject(PLATFORM_ID);

  constructor(private router: Router) {
    // Re-initialize Lucide icons after each navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => lucide.createIcons(), 0);
      }
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      lucide.createIcons();
    }
  }
}
