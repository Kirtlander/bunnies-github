import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { BunnyModule } from './components/bunny/bunny.module';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { AboutComponent } from './components/about/about.component';
import { BunnyListComponent } from './components/bunny/bunny-list/bunny-list.component';
import { BunnyOrderComponent } from './components/bunny/bunny-order/bunny-order.component';
import { DataService } from './services/data.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        AboutComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        BunnyModule,
        RouterModule.forRoot([
            { path: '', redirectTo: '/bunnies', pathMatch: 'full' },
            { path: 'bunnies', component: BunnyListComponent },
            { path: 'about', component: AboutComponent },
            { path: 'order/:id', component: BunnyOrderComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ])
    ],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModuleShared {
}
