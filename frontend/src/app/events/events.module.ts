import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CreateEventPage } from "./create-event/create-event.page";
import { UpdateEventPage } from "./update-event/update-event.page";

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [CreateEventPage, UpdateEventPage],
    exports: [CreateEventPage, UpdateEventPage]
})
export class EventsModule{ }