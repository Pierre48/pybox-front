import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Subscription } from '@app/models';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
    private subscriptionSubject: BehaviorSubject<Subscription>;
    public subscription: Observable<Subscription>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.subscriptionSubject = new BehaviorSubject<Subscription>(JSON.parse(localStorage.getItem('subscription')));
        this.subscription = this.subscriptionSubject.asObservable();
    }

    public get subscriptionValue(): Subscription {
        return this.subscriptionSubject.value;
    }

    add(subscription: Subscription) {
        return this.http.post(`/api/subscriptions`, subscription);
    }

    getAll() {
        return this.http.get<Subscription[]>(`/api/subscriptions`);
    }

    getById(id: string) {
        return this.http.get<Subscription>(`/api/subscriptions/${id}`);
    }

    update(id, params) {
        return this.http.put(`/api/subscriptions/${id}`, params)
        .pipe(map(x => {
            return x;
        }));
    }

    delete(id: string) {
        return this.http.delete(`/api/subscriptions/${id}`)
            .pipe(map(x => {
                return x;
            }));
    }
}
