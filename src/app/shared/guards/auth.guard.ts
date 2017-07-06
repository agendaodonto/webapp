import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private snackBar: MdSnackBar) {
    }

    canActivate() {
        const status = this.authService.isLogged();

        if (!status) {
            this.snackBar.open('Você precisa estar logado para visualizar esse menu.', '', { duration: 2000 })
            this.router.navigate(['/login'])
        }

        return status;
    }
}
