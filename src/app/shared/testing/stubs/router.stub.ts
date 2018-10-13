import { Directive, HostListener, Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class RouterStub {
    navigate(_url) {

    }
}

@Injectable()
export class ActivatedRouteStub {
    // ActivatedRoute.params is Observable
    private subject = new BehaviorSubject(this.testParams);
    private queryParamsSubject = new BehaviorSubject(this.testQueryParams);
    params = this.subject.asObservable();
    queryParams = this.queryParamsSubject.asObservable();
    // Test parameters
    private _testParams: {};
    get testParams() {
        return this._testParams;
    }

    set testParams(params: {}) {
        this._testParams = params;
        this.subject.next(params);
    }

    private _testQueryParams = {};
    get testQueryParams() {
        return this._testQueryParams;
    }

    set testQueryParams(params: {}) {
        this._testQueryParams = params;
        this.queryParamsSubject.next(params);
    }

    // ActivatedRoute.snapshot.params
    get snapshot() {
        return { params: this.testParams };
    }
}

@Directive({
    /* tslint:disable:directive-selector */
    selector: '[routerLink]',
})
@Injectable()
export class RouterLinkStubDirective {
    @Input('routerLink') routerLink: any;
    navigatedTo: any = null;

    @HostListener('click') onClick() {
        this.navigatedTo = this.routerLink;
    }
}
