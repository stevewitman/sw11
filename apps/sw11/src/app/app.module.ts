import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from '@bb/material';
import { UiToolbarModule } from '@bb/ui-toolbar';
import { CoreDataModule } from '@bb/core-data';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    UiToolbarModule,
    CoreDataModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
