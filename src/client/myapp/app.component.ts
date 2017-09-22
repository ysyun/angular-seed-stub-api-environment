import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './app.service';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(private appService: AppService) {}

    ngOnInit() {
        console.log(this.appService.getData());
    }

    // tslint:disable-next-line:no-empty
    ngOnDestroy() {}
}
