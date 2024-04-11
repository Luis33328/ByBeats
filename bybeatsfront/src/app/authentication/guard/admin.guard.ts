import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,  } from '@angular/router';
import { SignInService } from '../signIn/service/signIn.service';


@Injectable()
export class AdminGuard implements CanActivate 
{
    constructor(private router: Router,
        private usuarioService: SignInService) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    { 

        if (localStorage.getItem('role') == "admin")
        {
            console.log("adminGuard");
            return true;
        }

        this.router.navigate(['']);
        return false;
    }

      
    

}
