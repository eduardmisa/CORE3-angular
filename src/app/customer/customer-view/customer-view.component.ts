import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/interfaces/customer.interface';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {

  customerId: Number
  customer: Customer

  constructor(private svcCustomer: CustomerService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(({id}) => this.customerId = id);
   }

   backToList () {
    this.router.navigateByUrl(`/customers`)
   }

  ngOnInit(): void {
    this.fetchCustomers()
  }

  fetchCustomers () {
    this.svcCustomer.retreive(this.customerId.toString()).subscribe(item => {
      this.customer = item
    })
  }
}
