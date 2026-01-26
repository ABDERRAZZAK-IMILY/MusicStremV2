import { CanActivateFn } from "@angular/router";


export const authGuard: CanActivateFn = (route , state) => {

    const isAdmin = true;

    if (!isAdmin) {
    alert('you are not the admin');
    return false;
  }
  return true;
}
