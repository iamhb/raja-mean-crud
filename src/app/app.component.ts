import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public name: string;
  public age: number;

  constructor(public http: HttpClient) {}

  // submit details to node
  submit() {
    // console.log(this.name + "---" + this.age);
    // // 1st arg => api url
    // // 2nd arg => body

    // console.log("before api call");
    // this.http.post("http://localhost:3000/submitUser", userData).subscribe(
    //   (data) => {
    //     console.log(data);
    //     console.log("api success");
    //   },
    //   (err) => {
    //     console.log("error occured at api call");
    //   }
    // );
    // console.log("afer api call");
    let userData = {
      userName: this.name,
      userAge: this.age,
    };
    this.http
      .post("http://localhost:3000/submitUser", userData)
      .subscribe((apiRes) => {
        console.log(apiRes);
      });
  }
}
