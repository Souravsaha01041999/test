import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class MyProfileAuth implements CanActivate
{
    constructor(private router:Router)
    {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let cid=String(localStorage.getItem("id"));
        if(cid=="null")
        {
            //LOGIN SHOW
            this.router.navigate([""]);
        }
        else
        {
            return true;
        }
    }

}