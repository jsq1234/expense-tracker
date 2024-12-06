import sql from "@/config/db.config";
import { FinancialRecord } from "@/models/financial-records.model";
import { CreateFinancialRecord } from "@/utils/types";

export class FinancialRecordsRepository{
    static async createRecord(record: CreateFinancialRecord){
        const recordId = await sql`INSERT INTO financial_records ${sql(record)} returning id`;
        return recordId[0].id;
    }

    static async updateRecord(record: FinancialRecord){
        await sql`UPDATE financial_records SET`
    }
}