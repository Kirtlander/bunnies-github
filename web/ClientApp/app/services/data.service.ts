import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IBunny } from '../components/bunny/bunny.model';
import './rxjs-operators';

@Injectable()
export class DataService {
    private _bunnyUrl = 'api/Bunnies';
    // cached bunny stash - "the truth"
    private _bunnies: IBunny[];
    private _bunnySubject: Subject<IBunny[]>;

    constructor(private _httpClient: HttpClient) {
        this._bunnySubject = new Subject<IBunny[]>();
        //this._bunnies = mockBunnies;
    }

    getBunnies(): Observable<IBunny[]> {
        if (!this._bunnies) {
            this._httpClient.get<IBunny[]>(this._bunnyUrl)
                .catch(err => this.handleError(err))
                .subscribe(bunnies => {
                    this.logBunnies(bunnies);
                    this._bunnies = bunnies;
                    this.notify();
                });
        } else {
            window.setTimeout(() => this.notify(), 0);
        }
        return this._bunnySubject;
    }

    getBunny(id: number): Observable<IBunny> {
        if (!this._bunnies) {
            // go to the cage and get the bunnies
            return this.getBunnies()
            // TODO - try to use flatMap, then filter
                .map(bunnies => bunnies.find(bunny => bunny.id === id)) as Observable<IBunny> ;
        }
        return Observable.create((observer: Observer<IBunny>) =>
            observer.next(this.getBunnyFromCache(id)));
    }

    hideBunny(id: number): void {
        let bunny = this.getBunnyFromCache(id);
        this._httpClient.delete<boolean>(this._bunnyUrl + `/${id}`)
            .catch(err => this.handleError(err))
            .subscribe(success => {
                bunny.hidden = true;
                success && this.notify();
            });
    }

    likeBunny(id: number): void {
        let bunny = this.getBunnyFromCache(id);
        bunny.likes++;
        this.updateBunny(bunny);
    }

    private updateBunny(bunny: IBunny) {
        let cachedBunny = this.getBunnyFromCache(bunny.id);
        if (!cachedBunny) {
            this.handleError("Bunny not found to update");
        }
        this._httpClient.put<IBunny>(this._bunnyUrl + `/${bunny.id}`, bunny)
            .catch(err => this.handleError(err))
            .subscribe(dbBunny => {
                Object.assign(cachedBunny, dbBunny);
                this.notify();
            });
    }

    private handleError(error: any) {
        let errMsg = error.message ||
            error.status && `${error.status} - ${error.statusText}` ||
            'Server error';
        console.error(errMsg);
        this._bunnySubject.error(errMsg);
        return Observable.throw(errMsg);
    }

    private getBunnyFromCache(id: number): IBunny {
        if (!this._bunnies) {
            // this.getBunnies().subscribe(next => )
            throw new Error('No bunnies!!');
        }
       let bunnyIndex = this._bunnies.findIndex(bunny => bunny.id === id);
        return this._bunnies[bunnyIndex];
    }

    /**
     * Notifies @field this._bunnySubject subscribers of a change with a copy of the originals
     */
    private notify(): void {
        let clone = JSON.parse(JSON.stringify(this._bunnies));
        this._bunnySubject.next(clone);
    }

    private logBunnies(bunnies: any) {
        console.log(JSON.stringify(bunnies));
    }
}

let mockBunnies: IBunny[] = [
    {
        "id": 1,
        "name": "Thumper",
        "description": "Cute little fellow that loves to entertain us with his binkies",
        "imageUrl": "img/thumper.jpg",
        "hidden": false,
        "age": 2,
        "likes": 0,
        "isMostPopular": false
    },
    {
        "id": 2,
        "name": "Elsa",
        "description": "She sure doesn't have a cold, frozen heart.",
        "imageUrl": "img/elsa.jpg",
        "hidden": false,
        "age": 1,
        "likes": 1,
        "isMostPopular": false
    },
    {
        "id": 3,
        "name": "Pippin",
        "description": "Grumpy bunny that will steal your heart.",
        "imageUrl": "img/pippin.jpg",
        "hidden": false,
        "age": 0.5,
        "likes": 0,
        "isMostPopular": false
    },
    {
        "id": 4,
        "name": "Turbo",
        "description": "Try to catch this guy when he launches into his bunny 500.",
        "imageUrl": "img/turbo.jpg",
        "hidden": false,
        "age": 4,
        "likes": 0,
        "isMostPopular": false
    }
];
