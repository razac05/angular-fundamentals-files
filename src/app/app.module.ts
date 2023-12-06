import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { 
  EventsListComponent, 
  EventThumbnailComponent, 
  EventService, 
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator, 
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe
} from './events/index';
import { NavbarComponent } from './nav/navbar.component';
import { appRoutes } from '../routes';
import { RouterModule } from '@angular/router';
import { Error404Component } from './errors/404.component';
import { EventsAppComponent } from './events-app.component';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { 
  JQ_TOKEN, 
  CollapsibleWellComponent, 
  TOASTR_TOKEN, 
  Toastr, 
  SimpleModalComponent,
  ModalTriggerDirective
} from './common/index';

let toastr:Toastr = window['toastr' as keyof Window];
let jQuery = window['$' as keyof Window];

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    NavbarComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    EventService, 
    EventDetailsComponent, 
    EventRouteActivator,
    {
      provide: 'canDeactivateCreateEvent', 
      useValue: checkDirtyState
    },
    EventListResolver,
    AuthService,
    {
      provide: TOASTR_TOKEN,
      useValue: toastr
    },
    {
      provide: JQ_TOKEN,
      useValue: jQuery
    }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateEventComponent) {
  if (component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?')
  return true;
}