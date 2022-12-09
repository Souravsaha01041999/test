import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AddRoomAuth implements CanActivate
{
    constructor(private router:Router)
    {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let myRole=String(localStorage.getItem("role"));
        if(myRole=="null"||myRole!="admin")
        {
            //LOGIN REQUIRED HERE
        this.router.navigate([""]);
        }
        else
        {
            return true;
        }
    }

}