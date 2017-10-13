import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { #NAME#Component } from './#FILE_NAME#.component';
import { #NAME#Service } from './#FILE_NAME#.service';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule,
    ],
    declarations: [
        #NAME#Component
    ],
    exports: [

    ],
    providers: [
        #NAME#Service
    ],
    entryComponents: [

    ]
})
export class #NAME#Module {
    //If you want to add services into root's injector
    // static forRoot(): ModuleWithProviders {
    //     return {
    //         ngModule: #NAME#Module,
    //         providers: [
    //             #NAME#Service
    //         ]
    //     }
    // }
}
