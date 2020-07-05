import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PaginatedResponse } from 'src/interfaces/paginated.response';
import { environment } from 'src/environments/environment';
import { IsClient } from 'src/helpers/processHelper';

export class PaginationQuery {
  constructor (public pageNumber: number,
               public pageSize: number,
               public filter: string,
               public sortOrder: string) {
  }
}

export class GenericService{
  constructor(private http: HttpClient, private baseUrl: string) {

    this._http = http
    this.apiHost = environment.API_HOST
    this.url = `${this.apiHost}${baseUrl}`

    if (IsClient()) {
      let cookieObject = (Object as any).fromEntries(document.cookie.split(/; */).map(c => {
          const [ key, ...v ] = c.split('=');
          return [ key, decodeURIComponent(v.join('=')) ];
      }));

      this.token = cookieObject.access_token
    }
  }

  _http: HttpClient
  apiHost: string
  url: string
  token: string

  count () {
    return this._http.get<number>(`${this.url}count/`, { headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)});
  }
  paginate<TResult> (pagination: PaginationQuery) {
    // let params = new HttpParams()
    // if (filter)     params.append('filter', filter)
    // if (sortOrder)  params.append('sortOrder', sortOrder)
    // if (pageNumber) params.append('pageNumber', pageNumber.toString())
    // if (pageSize)   params.append('pageSize', pageSize.toString())
    // return this._http.get<T[]>(this.url, {
    //   params
    // })
    return this._http.get<PaginatedResponse<TResult>>(this.url, {
      params: new HttpParams().set('filter', pagination.filter ? pagination.filter : '')
                              .set('sortOrder', pagination.sortOrder ? pagination.sortOrder : '')
                              .set('pageNumber', pagination.pageNumber ? pagination.pageNumber.toString() : '')
                              .set('pageSize', pagination.pageSize ? pagination.pageSize.toString() : ''),
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
    })
  }
  retreive<TResult> (slug: string) {
    return this._http.get<TResult>(`${this.url}${slug}`, { headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)});
  }
  post<TResult,TRequest> (body: TRequest, slug?: string) {
    return this._http.post<TResult>(`${this.url}${slug ? slug : ''}`, body, { headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)});
  }
  put<TResult,TRequest> (slug: string, body: TRequest) {
    return this._http.put<TResult>(`${this.url}${slug}`, body, { headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)});
  }
  patch<TResult,TRequest> (slug: string, body: TRequest) {
    return this._http.patch<TResult>(`${this.url}${slug}`, body, { headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)});
  }
  delete<TResult> (slug: string) {
    return this._http.delete<TResult>(`${this.url}${slug}`, { headers: new HttpHeaders().set("Authorization", `Bearer ${this.token}`)});
  }
}