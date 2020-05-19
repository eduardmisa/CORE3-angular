import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/services/customer.service';
import { Router } from '@angular/router';

// @Component({
//   selector: 'app-customer-create',
//   template: `
//     <p>
//       customer-create works!
//     </p>
//   `,
//   styles: [
//   ]
// })
// export class CustomerCreateComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

@Component({
  selector: 'app-customer-create',
  template: `
    <p>
      <button (click)="backToList()">Back to list</button>
    </p>
  `,
})
export class CustomerCreateComponent implements OnInit {

  constructor(private svcCustomer: CustomerService, private router: Router) { }

  ngOnInit(): void {
  }
  
  backToList () {
    this.router.navigateByUrl(`/customers`)
  }
}
