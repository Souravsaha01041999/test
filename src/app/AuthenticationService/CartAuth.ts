import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class CartAuth implements CanActivate
{
    constructor(private router:Router)
    {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let id=String(localStorage.getItem("id"));
        if(id=="null")
        {
        //LOGIN REQUIRED HERE
        this.router.navigate(["login"]);
        }
        else{
        //OPEN CART HERE
            return true;
        }
    }

}