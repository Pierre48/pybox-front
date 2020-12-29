import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { SubscriptionService } from '@app/services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    sites = null;

    constructor(private accountService: SubscriptionService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(sites => this.sites = sites);
    }

    deleteSubscription(id: string) {
        const site = this.sites.find(x => x.id === id);
        site.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.sites = this.sites.filter(x => x.id !== id)
            });
    }
}
