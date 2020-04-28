// Component Imports
import { Component, OnInit, ViewChild } from '@angular/core';

import { CustomerService } from 'src/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})
export class CustomerCreate implements OnInit {

  constructor(private svcCustomer: CustomerService) { }

  ngOnInit() {

  }
}