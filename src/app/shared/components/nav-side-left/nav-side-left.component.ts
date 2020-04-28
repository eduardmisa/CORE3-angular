import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-side-left',
  templateUrl: './nav-side-left.component.html',
  styleUrls: ['./nav-side-left.component.css']
})
export class NavSideLeftComponent implements OnInit {
  

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTo (appUrl: string) {
    this.router.navigateByUrl(appUrl)
  }

}
