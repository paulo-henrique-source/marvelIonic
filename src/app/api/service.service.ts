import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';


@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  private publicKey   = '';
  private privateKey  = '';

  private host  = 'http://geteway.marvel.com';

  constructor(private http: HttpClient){}

  public getDados(url: string, paramaters: string){
    let ts = this.generateTs();
    
    return new Promise((ret) => {
      this.http.get(this.host + url + '?ts=' + ts + '&apikey=' + this.publicKey + '&hash=' + this.getHash(ts) + paramaters).subscribe((response) => {
        if(response){
          ret(response)
        } else {
          ret(false);
        }
      })
    })
  }

  private generateTs(){
    return Math.floor(100000 + Math.random() * 900000);
  }

  private getHash(ts){
    return Md5.hashStr(ts + this.publicKey + this.privateKey);
  }

}
