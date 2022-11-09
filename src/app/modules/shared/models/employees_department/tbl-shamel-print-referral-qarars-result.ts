import { TblShamelUpgradeGovReport } from "./TblShamelUpgradeGovReport";

export interface TblShamelPrintReferralQararsResult {
    "Result": TblShamelUpgradeGovReport[],
    "Id": number,
    "Exception": string,
    "Status": number,
    "IsCanceled": boolean
}
