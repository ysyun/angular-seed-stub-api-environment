import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule,
    ],
    declarations: [
        AppComponent
    ],
    exports: [

    ],
    providers: [
        AppService
    ],
    entryComponents: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    //If you want to add services into root's injector
    // static forRoot(): ModuleWithProviders {
    //     return {
    //         ngModule: AppModule,
    //         providers: [
    //             AppService
    //         ]
    //     }
    // }
}

platformBrowserDynamic().bootstrapModule(AppModule);
