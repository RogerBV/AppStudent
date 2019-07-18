import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentManagerComponent } from './components/student-manager/student-manager.component';
import { ReactiveFormsModule } from '@angular/forms';
const appRoutes: Routes =[
  {
    path: 'Student'
    ,component:StudentManagerComponent
  }
  
]
@NgModule({
  declarations: [
    AppComponent,
    StudentFormComponent,
    StudentManagerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxDatatableModule,
    RouterModule.forRoot(appRoutes),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
