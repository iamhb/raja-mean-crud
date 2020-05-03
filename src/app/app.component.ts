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
  public newname: string;
  public allData; // holds all db data

  constructor(public http: HttpClient) {
    this.showAll();
  }

  // submit details to node
  submit() {
    let userData = {
      userName: this.name,
      userAge: this.age,
    };
    this.http
      .post("http://localhost:3000/submitUser", userData)
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
        this.allData = apiRes.docs;
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
