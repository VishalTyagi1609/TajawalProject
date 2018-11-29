/*import { HotelService } from './../../services/hotel.service';
import { Data } from './../../components/model/hotel.model';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { catchError, finalize } from 'rxjs/operators';

export class HotelDataSource implements DataSource<Data> {

    private lessonsSubject = new BehaviorSubject<Data[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(private hotelService: HotelService) {}

    connect(collectionViewer: CollectionViewer): Observable<Data[]> {
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

    loadHotels(courseId: string, filter = '',
                sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

        this.loadingSubject.next(true);

        this.hotelService.getMatchingHotels2(courseId, filter, sortDirection,
            pageIndex, pageSize).pipe(
            catchError((e: any) => Observable.throw(e)),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(hotels => this.lessonsSubject.next(hotels.data));
    }    
}*/
