import { data } from "./data.js";
import http from "node:http";
import * as url from "url";
import querystring from 'querystring';

const sever = http.createServer((request, respone) => {
  const endPoint = request.url;
  const objectURL = url.parse(endPoint, true);
  switch (endPoint) {
    case "/":
      respone.end(JSON.stringify(data));
      break;
    case "/users":
      const fullName = data.map((item) => item.fullName);
      respone.end(JSON.stringify(fullName));
      break;
    case "/users/old":
      const above50age = data.filter((item) => item.age >= 50);
      respone.end(JSON.stringify(above50age));
      break;
    case "/users/add-random":
      const randomName = () => {
        let randomName = "";
        const stringList =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i <= 10; i++) {
          randomName =
            randomName +
            stringList.charAt(Math.floor(Math.random() * stringList.length));
        }
        return randomName;
      };
      const randomAge = Math.floor(Math.random() * 100);
      const randomUser = {
        id: data.length + 1,
        fullName: randomName(),
        age: randomAge,
        class: "5A",
      };
      respone.end(JSON.stringify(randomUser));
      break;
    case '/users/add':
      // /users/add/userName="MindX School"&email="mindx@edu.vn"&address="Hà Nội"&age=8
      let {userName, email, address, age} = objectURL;
      const id = data.length+1;
      const newObject = {id, userName, email, address, age};
      const addNewObj = [...data, newObject];
      respone.end(JSON.stringify(addNewObj));
      break;
      default:
      respone.end("page not found (404)");
    
  }
});

sever.listen(3000);

console.log("server running");
