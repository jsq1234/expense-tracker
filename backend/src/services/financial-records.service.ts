import { FinancialRecord, PaymentMethod } from "@/models/financial-records.model";
import { FinancialRecordsRepository } from "@/repository/financial-records.repository";
import { IFinancialRecord } from "@/utils/types";

export class FinancialRecordsService{
    static async createRecord(record: IFinancialRecord){
        const recordEntity = new FinancialRecord({ ...record });
        return await FinancialRecordsRepository.createRecord(recordEntity);
    }

    static async findByUserId(userId: string){

    }

    static async findById(id: number){

    }

}