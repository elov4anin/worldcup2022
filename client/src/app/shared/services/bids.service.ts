import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IBid} from '../interfaces/category.interface';
import {Message} from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class BidsService {
  constructor(private http: HttpClient) {
  }

  fetch(params: any = {}): Observable<IBid[]> {
    return this.http.get<IBid[]>(`/api/bid`, {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

  getById(id: string): Observable<IBid> {
    return this.http.get<IBid>(`/api/bid/${id}`);
  }

  create(bid: IBid, image?: File): Observable<IBid> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);
    return this.http.post<IBid>('/api/bid', bid);
  }

  update(id: string, name: string, image?: File): Observable<IBid> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);
    return this.http.patch<IBid>(`/api/bid/${id}`, fd);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/bid/${id}`);
  }

}
