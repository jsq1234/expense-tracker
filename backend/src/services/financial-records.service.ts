import {
  FinancialRecord,
  PaymentMethod,
} from "@/models/financial-records.model";
import { FinancialRecordsRepository } from "@/repository/financial-records.repository";
import { CreateFinancialRecord } from "@/utils/types";


export class FinancialRecordsService {
  static async createRecord(financialRecord: CreateFinancialRecord) {
    return await FinancialRecordsRepository.createRecord(recordEntity);
  }

  static async findByUserId(userId: string) {}

  static async findById(id: number) {}
}
