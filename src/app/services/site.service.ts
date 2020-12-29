import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Site } from '@app/models';

@Injectable({ providedIn: 'root' })
export class SiteService {
    private siteSubject: BehaviorSubject<Site>;
    public site: Observable<Site>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.siteSubject = new BehaviorSubject<Site>(JSON.parse(localStorage.getItem('site')));
        this.site = this.siteSubject.asObservable();
    }

    add(site: Site) {
        return this.http.post(`/api/sites`, site);
    }

    getAll() {
        return this.http.get<Site[]>(`/api/sites`);
    }

    getById(id: string) {
        return this.http.get<Site>(`/api/sites/${id}`);
    }

    update(id, params) {
        return this.http.put(`/api/sites/${id}`, params)
          .pipe(map(x => {
              return x;
          }));
    }

    delete(id: string) {
        return this.http.delete(`/api/sites/${id}`)
            .pipe(map(x => {
                return x;
            }));
    }
}
