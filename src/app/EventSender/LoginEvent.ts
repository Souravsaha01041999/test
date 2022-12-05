import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class LoginEvent
{
    subjectEvent=new Subject<void>();
}
