import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common'
import { HttpClientModule } from '@angular/common/http';
import { ShortNamePipe } from './short-name.pipe';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectDetialsComponent } from './project-details/project-details.component';
import { TimeComponent } from './time/time.component';
import { ProjectsComponent } from './projects/projects.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    ProjectDetialsComponent,
    TimeComponent,
    ProjectsComponent,
    HeaderComponent,
    ShortNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
