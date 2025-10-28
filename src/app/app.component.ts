import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbar,
    MatIcon,
    MatDrawerContainer,
    MatDrawer,
    MatListModule,
    MatDrawerContent,
    MatIconButton,
  ],
})
export class AppComponent implements OnInit, OnDestroy{
  private router = inject(Router);
  private swUpdate = inject(SwUpdate);

  /* Callback-ek, melyeket a listener meghív, ha az adott esemény bekövekezik */
  private onlineCallback = ()=> console.log("online");
  private offlineCallback = ()=> console.log("offline");

  ngOnInit(): void {
    /*
     * 3000 ms-enként megnézzzük, hogy van-e új verzió a service workerből
     * ha van, akkor jelezzük a felhasználónak, majd újra töltjük az oldalt
     */
    interval(3000).subscribe(() => {
    this.swUpdate.checkForUpdate().then(
      update => {
        if(update){
          alert("new changes");
          window.location.reload();
        }
      }
    )
    })

    /* Létrehozunk listenerek, melyek detektálják az online/offline állapotot, az adott callbackek le fognak futni. */
    window.addEventListener('online', this.onlineCallback);
    window.addEventListener('offline', this.offlineCallback);

  }

  ngOnDestroy(): void {
    /*
     * Töröljük a listenereket, hogy a callback ne hívódjon meg ha újabb esemény érkezne. Ez fontos, hogy ne legyen memory leak.
     * Mivel egy adott eseményre több callbacket is rendelhetünk, ezért azokat is meg kell adni.
     */
    window.removeEventListener('online',this.onlineCallback)
    window.removeEventListener('offline',this.offlineCallback)
  }

  createBuilding() {
    this.router.navigateByUrl('shop');
  }
  openSettings(): void {
    this.router.navigateByUrl('settings');
  }
}
