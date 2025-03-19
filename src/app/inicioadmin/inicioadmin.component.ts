import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicioadmin',
  templateUrl: './inicioadmin.component.html',
  styleUrl: './inicioadmin.component.css'
})
export class InicioadminComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

}
