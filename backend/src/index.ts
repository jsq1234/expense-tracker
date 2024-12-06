import { FinancialRecord, PaymentMethod, TransactionType } from "./models/financial-records.model";


/* import { z, ZodError } from "zod";

const profileSchema = z.object({
  user: z.object({
    username: z.string().min(3),
    email: z.string().email(),
  }),
  address: z.object({
    street: z.string(),
    city: z.string(),
  }),
});


const profile = {
  user: { username: "ja", email: "jane.doe@example.com" },
  address: { street: null, city: "Springfield" },
};


try {
  const validatedProfile = profileSchema.parse(profile);
} catch (err: any) {
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((error) => ({
      field: error.path.join("."),
      message: error.message,
    }));
    console.log(formattedErrors);
  }
}
*/
// initDatabase().then(async () => {
//   console.log("Successfully initialized database!");
//   let user = await UserService.fetchUserByEmail('manan.prakash@tuningbill.com');
//   if(user === null){
//     logger.warn(user, 'The following user doesn\'t exists');
//     return ;
//   }
//   user.firstName = 'Mudit';
//   user.lastName = 'Jain';
//   user.password = 'HGMM!';
//   const updatedUser = await UserService.updateUser({
//     ...user
//   });
//   logger.info(updatedUser, 'updated user');
//   const fetchUser = await UserService.fetchUser(user.id);
//   logger.info(fetchUser, 'rechecking!');
// }).catch(e => {
//   if(e instanceof ApiError){
//     console.log("Error", e.message);
//   }
// });

function removeKeys<T>(obj: T, keys: (keyof T)[]){
  for(const key of keys){
    delete obj[key];
  }
  return obj;
}

function removeNullKeys<T extends Record<string, any>>(obj: T){
  Object.keys(obj).forEach((key) => {
    if(key in obj && obj[key] === null){
      delete obj[key];
    }
  });
  return obj;
}

(async function main(){
  const record = new FinancialRecord({});
  console.log(Object.keys(record).forEach(key => console.log(key)));
  //const result = await sql`INSERT INTO users ${sql(obj)} returning *`
 // console.log(result);
})(); 