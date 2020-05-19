import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/services/customer.service';
import { PaginationQuery } from 'src/services/z.service';
import { PaginatedResponse } from 'src/interfaces/paginated.response';
import { Customer } from 'src/interfaces/customer.interface';
import { Router } from '@angular/router';
import mockData from 'src/assets/mockCustomers'

@Component({
  selector: 'app-customer-list',
  template: `

    <div class="overflow-x-auto mt-6 container mx-auto">

      <button
        (click)="createCustomer()"
        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
        Create Customer
      </button>

      <table class="table-auto border-collapse w-full mt-3">
        <thead>
          <tr class="rounded-lg text-sm font-medium text-gray-700 text-left">
            <th class="px-4 py-6 bg-gray-200 uppercase">Id</th>
            <th class="px-4 py-6 bg-gray-200 uppercase">Firstname</th>
            <th class="px-4 py-6 bg-gray-200 uppercase">Middlename</th>
            <th class="px-4 py-6 bg-gray-200 uppercase">Lastname</th>
            <th class="px-4 py-6 bg-gray-200 uppercase">Created</th>
            <th class="px-4 py-6 bg-gray-200 uppercase">CreatedBy</th>
            <th class="px-4 py-6 bg-gray-200 uppercase">Modified</th>
            <th class="px-4 py-6 bg-gray-200 uppercase">ModifiedBy</th>
            <th class="px-4 py-6 bg-gray-200 uppercase text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-sm font-normal text-gray-700">
          <tr
            *ngFor="let item of customerList"
            class="hover:bg-gray-100 border-b border-gray-200 py-10"
            >
            <td class="px-4 py-4">{{item.id}}</td>
            <td class="px-4 py-4">{{item.firstName}}</td>
            <td class="px-4 py-4">{{item.middleName}}</td>
            <td class="px-4 py-4">{{item.lastName}}</td>
            <td class="px-4 py-4">{{item.created}}</td>
            <td class="px-4 py-4">{{item.createdBy}}</td>
            <td class="px-4 py-4">{{item.modified}}</td>
            <td class="px-4 py-4">{{item.modifiedBy}}</td>
            <td class="px-4 py-4">
              <div class="flex flex-row space-x-2">
                <button
                    (click)="viewCustomer(item.id)"
                    class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                    View
                </button>
                <button
                  (click)="updateCustomer(item.id)"
                  class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                  Update
                </button>
                <button
                  (click)="deleteCustomer(item.id)"
                  class="bg-transparent hover:bg-red-700 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  `,
})
export class CustomerListComponent implements OnInit {

  constructor(private svcCustomer: CustomerService, private router: Router) { }

  customerList: Customer[] = []

  ngOnInit(): void {
    this.populateCustomers()
  }

  populateCustomers () {
    var mock = mockData

    this.customerList = mock.results.slice(0, 10)

    // this.svcCustomer.get(new PaginationQuery(0, 0, '', ''))
    // .subscribe((data: PaginatedResponse<Customer>) => {
    //   this.customerList = data.results
    // });
  }

  viewCustomer (id: number) {
    this.router.navigateByUrl(`/customers/view/${id}`)
  }
  createCustomer () {
    this.router.navigateByUrl(`/customers/create`)
  }
  updateCustomer (id: number) {
    this.router.navigateByUrl(`/customers/update/${id}`)
  }
  deleteCustomer (id: number) {
    this.router.navigateByUrl(`/customers/delete/${id}`)
  }
}
