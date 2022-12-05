import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class AdminCheck
{
    subjectEvent=new Subject<boolean>();
}
