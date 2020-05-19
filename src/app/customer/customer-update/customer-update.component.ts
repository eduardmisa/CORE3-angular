import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/interfaces/customer.interface';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {

  customerId: Number
  customer: Customer

  constructor(private svcCustomer: CustomerService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(({id}) => this.customerId = id);
   }

  ngOnInit(): void {
    this.fetchCustomers()
  }

  backToList () {
    this.router.navigateByUrl(`/customers`)
  }
  fetchCustomers () {
    this.svcCustomer.retreive(this.customerId.toString()).subscribe(item => {
      this.customer = item
    })
  }
}
