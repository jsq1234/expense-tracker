import sql from "@/config/db.config";
import { FinancialRecord } from "@/models/financial-records.model";

export class FinancialRecordsRepository{
    static async createRecord(record: FinancialRecord){
        const recordId = await sql`INSERT INTO financial_records ${sql(record)} returning id`;
        return recordId[0].id;
    }
}