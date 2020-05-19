import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResponse } from 'src/interfaces/paginated.response';

export class PaginationQuery {
  constructor (public pageNumber: number,
               public pageSize: number,
               public filter: string,
               public sortOrder: string) {
  }
}

export class GenericService<T> {

  apiHost: string
  url: string

  constructor(private http: HttpClient,
              private baseUrl: string) { 
    
    // TODO: Put this in config
    this.apiHost = "http://localhost:5000"

    this.url = `${this.apiHost}${baseUrl}`
  }

  get (pagination: PaginationQuery) {

    // let params = new HttpParams()

    // if (filter)     params.append('filter', filter)
    // if (sortOrder)  params.append('sortOrder', sortOrder)
    // if (pageNumber) params.append('pageNumber', pageNumber.toString())
    // if (pageSize)   params.append('pageSize', pageSize.toString())

    // return this.http.get<T[]>(this.url, {
    //   params
    // })

    return this.http.get<PaginatedResponse<T>>(this.url, {
      params: new HttpParams()
      .set('filter', pagination.filter ? pagination.filter : '')
      .set('sortOrder', pagination.sortOrder ? pagination.sortOrder : '')
      .set('pageNumber', pagination.pageNumber ? pagination.pageNumber.toString() : '')
      .set('pageSize', pagination.pageSize ? pagination.pageSize.toString() : '')
    })
  }
  retreive (slug: string) {
    return this.http.get<T>(`${this.url}${slug}`);
  }
  post (body: T) {
    return this.http.post<T>(this.url, body);
  }
  put (slug: string, body: T) {
    return this.http.put<T>(`${this.url}${slug}`, body);
  }
  patch (slug: string, body: T) {
    return this.http.patch<T>(`${this.url}${slug}`, body);
  }
  delete (slug: string) {
    return this.http.delete<T>(`${this.url}${slug}`);
  }

}