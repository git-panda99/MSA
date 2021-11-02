import { NgModule } from "@angular/core";
import { CreateEventComponent } from "./create-event/create-event.component";

@NgModule({
    declarations: [CreateEventComponent],
    exports: [CreateEventComponent]
})
export class EventsModule{ }