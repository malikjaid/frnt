import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private secretKey: string = 'YOUR_SECRET_KEY'; 

  encrypt(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
  }

  decrypt(data: string): any {
    const bytes = CryptoJS.AES.decrypt(data, this.secretKey);
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return null;
  }

  getDecryptedData(key: string): any {
    const encryptedData = sessionStorage.getItem(key);
    if (encryptedData) {
      return this.decrypt(encryptedData);
    }
    return null;
  }

}
