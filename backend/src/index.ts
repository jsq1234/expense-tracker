import { PaymentMethod, TransactionType } from "./models/financial-records.model";
import { FinancialRecordsService } from "./services/financial-records.service";
import { UserService } from "./services/user.service";
import { initDatabase } from "./utils/init-db";

initDatabase().then(async () => {
  console.log("Successfully initialized database!");
  const userId = await UserService.createUser({
    email: "manan.prakash@tuningbill.com",
    firstName: "Manan",
    lastName: "Singh",
    password: "Qwerty@12345",
    username: "pogger_champ1234"
  });
  console.log(userId);
  if(userId){
    const user = await UserService.fetchUser(userId);
    console.log("User: ");
    console.log(user);
  }
});