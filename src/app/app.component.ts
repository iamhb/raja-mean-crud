import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./models/User";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public name: string;
  public age: number;
  public newname: string;
  public allData; // holds all db data
  public user: User;

  constructor(public http: HttpClient) {
    this.user = new User();
    this.showAll();
  }

  // submit details to node
  submit() {
    console.log(this.user);
    // let userData = {
    //   userName: this.name,
    //   userAge: this.age,
    // };
    this.http
      .post("http://localhost:3000/user/submitUser", this.user)
      .subscribe((apiRes) => {
        // console.log(apiRes);
        this.showAll();
      });
  }
  // fetching all user data
  showAll() {
    this.http
      .get("http://localhost:3000/getAllUserDocs")
      .subscribe((apiRes) => {
        this.allData = apiRes["docs"];
      });
  }

  //editing document
  editDoc(userId) {
    if (this.newname) {
      console.log("edit--" + userId);
      let reqData = {
        _id: userId,
        newname: this.newname,
      };

      this.http
        .post("http://localhost:3000/editUser", reqData)
        .subscribe((apiRes) => {
          console.log("docs updated");
          this.showAll();
        });
    } else {
      alert("enter new name");
    }
    this.newname = "";
  }

  //delete document
  deleteDoc(userId) {
    console.log("delete--" + userId);
  }
}
