import { UserService } from "./services/user-service";
import { initDatabase } from "./utils/init-db";

initDatabase().then(() => {
  console.log("Successfully created tables!");

  return UserService.createUser({
    email: "manaprakash3078@gmail.com",
    firstName: "Manan",
    lastName: "Prakash",
    username: "some-radom-ass-username",
    password: "Qwerty@12345"
  });
}).then(id => console.log("new id: ", id));