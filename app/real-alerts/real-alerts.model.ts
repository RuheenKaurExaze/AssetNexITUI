export interface RealAlertsModel{

id: number;
    assetId:number;
    assetName:string;
   currentStock:number;
    threshold:number;
    level:string;
    message:string;
    createdAt:Date;
}
