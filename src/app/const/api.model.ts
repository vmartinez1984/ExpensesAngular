export class Api{
   public static  urlBase : string = "https://expenses.silly-lovelace.198-38-83-250.plesk.page/api";
   //public static  urlBase : string = "https://localhost:44361/api";
   //public static  urlBase : string = "http://localhost/Expenses/api";

   public static urlApiEntries : string = Api.urlBase + "/Entries/"

   public static urlApiExpenses : string = Api.urlBase + "/Expenses/"

   public static urlApiPeriods : string = Api.urlBase + "/Periods/"
}