import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EncryptionService } from '../services/encryption-service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const encryptionService = inject(EncryptionService);
  const loggedInUser = encryptionService.getDecryptedData('token')
  if (loggedInUser) {
    // Optional: Add logic to validate the token
    // Example: if (isTokenValid(loggedInUser)) {
    return true;
    // }
  }
  router.navigateByUrl('/login');
  return false;
};

// Optional: Add a function to validate the token (e.g., check expiry)
function isTokenValid(token: string): boolean {
  // Implement token validation logic here
  // Example: Decode the token and check expiry
  return true; // Placeholder: Replace with actual validation logic
}
