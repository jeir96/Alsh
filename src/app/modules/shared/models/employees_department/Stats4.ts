export interface Stats4 {
    malakState_Name?: string;
    first_Date?: Date;
    end_Date?: Date;
    is_birthdate?: boolean,
    is_FirstJobState?: boolean;
    is_LastJobState?: boolean;
    is_TBLShamelSCJobState?: boolean;
    is_TBLShamelSCPunishment?: boolean;
    punishmenT_ID?: number;
    punishmenT_REASON_ID?: number;
    is_TBLShamelSCBonus?: boolean;
    bonuS_ID?: number;
    bonuS_REASON_ID?: number;
    is_TBLShamelSCFreeHoliday?: boolean;
    freeHoliday_REASON_ID?: number;
    is_TBLShamelSCLegalHoliday?: boolean;
    is_TBLShamelSCSuddenHoliday?: boolean;
    suddenholidaY_ID?: number;
    is_TBLShamelSCHealthHoliday?: boolean;

    changereason_id?:number;
    
  }
