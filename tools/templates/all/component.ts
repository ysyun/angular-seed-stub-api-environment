import { Component, OnInit, OnDestroy } from '@angular/core';
import { #NAME#Service } from './#FILE_NAME#.service';

@Component({
    moduleId: module.id,
    selector: '#FILE_NAME#',
    templateUrl: '#FILE_NAME#.component.html',
    styleUrls: ['#FILE_NAME#.component.css']
})
export class #NAME#Component implements OnInit, OnDestroy {

    constructor(private #FILE_NAME#Service: #NAME#Service) {}

    ngOnInit() {
        console.log(this.#FILE_NAME#Service.getData());
    }

    ngOnDestroy() {}
<<<<<<< HEAD
}
=======
}
>>>>>>> 5974f3f78d9e775c69c4b83e93d9ad86a48faa25
