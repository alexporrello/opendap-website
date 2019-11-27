import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  MatExpansionModule,
  MatDividerModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReleasesPageComponent } from './components/releases-page/releases-page.component';

import { HttpClientModule } from '@angular/common/http';
import { BoilerplateComponent } from './components/boilerplate/boilerplate.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    ReleasesPageComponent,
    BoilerplateComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
