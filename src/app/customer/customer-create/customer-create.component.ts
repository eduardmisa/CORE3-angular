import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  constructor(private svcCustomer: CustomerService, private router: Router) { }

  ngOnInit(): void {
  }
  
  backToList () {
    this.router.navigateByUrl(`/customers`)
  }
}
