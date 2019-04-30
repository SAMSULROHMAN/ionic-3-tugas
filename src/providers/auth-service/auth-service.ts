import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
//arahkan apiUrlnya ke alamat rest api yang kamu buat di tutorial part 1
let apiUrl = "http://localhost/blog/crud/";

@Injectable()
export class AuthServiceProvider {
  constructor(public http: Http) {}
  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      let options = new RequestOptions({ headers: headers });
      this.http
        .post(apiUrl + type, JSON.stringify(credentials), options)
        .subscribe(
          res => {
            resolve(res.json());
          },
          err => {
            reject(err);
          }
        );
    });
  }

  GetData(type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      let options = new RequestOptions({ headers: headers });
      this.http.get(apiUrl + type, options).subscribe(
        res => {
          resolve(res.json());
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
