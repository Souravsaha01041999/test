import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class HomeAuth implements CanActivate
{
    constructor(private router:Router)
    {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let id=String(localStorage.getItem("id"));
        if(id=="null")
        {
          this.router.navigate(["login"]);
        }
        else
        {
            return true;
        }
    }

}