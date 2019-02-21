import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {
	url = 'https://pillboxwebapi20190129085319.azurewebsites.net/api/test/index/'

  constructor() { }
}
