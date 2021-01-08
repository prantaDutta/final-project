import { applySession } from "next-iron-session";
import handler from "../../../../apiHandlers/handler";
import { client, q } from "../../../../lib/fauna";
import { NEXT_IRON_SESSION_CONFIG } from "../../../../utils/constants";

export default handler.get(async (req, res) => {
  await applySession(req, res, NEXT_IRON_SESSION_CONFIG);
  const user = (req as any).session.get("user");
  if (user?.role === "admin") {
    try {
      const { data }: any = await client.query(
        q.Let(
          {
            // Get the Lead document
            lead: q.Get(q.Ref(q.Collection("Leads"), "269038063157510661")),
            // Get the source key out of the lead document
            sourceKey: q.Select(["data", "source"], q.Var("lead")),
            // use the index to get the values via match
            sourceValues: q.Paginate(
              q.Match(q.Index("LeadSourceValuesByKey"), q.Var("sourceKey"))
            ),
          },
          {
            lead: q.Var("lead"),
            sourceValues: q.Var("sourceValues"),
          }
        )
      );
      res.json(data);
      // const { data }: any = await client.query(
      //   q.Map(
      //     q.Paginate(q.Match(q.Index("search_by_mode"), "processing")),
      //     q.Lambda("ref", q.Get(q.Var("ref")))
      //   )
      // );
      // let modifiedData: Array<ModifiedLoanRequest> = [];
      // data.map((data: any) => {
      //   const {
      //     monthlyInstallment,
      //     loanDuration,
      //     interestRate,
      //     amount,
      //     modifiedMonthlyInstallment,
      //     userId,
      //   } = data.data;
      //   modifiedData.push({
      //     amount,
      //     interestRate,
      //     loanDuration,
      //     monthlyInstallment,
      //     modifiedMonthlyInstallment,
      //     userId,
      //     id: data.ref.id,
      //   });
      // });
      // return res.status(200).json(modifiedData);
    } catch (e) {
      console.log(e);
      return res.status(422).send("Failed");
    }
  }
  return res.status(403).end("Lol, You are not admin 😇 😈 😏 ");
});

export type ModifiedLoanRequest = {
  monthlyInstallment: number;
  loanDuration: number;
  interestRate: number;
  amount: number;
  modifiedMonthlyInstallment: number;
  userId: string;
  id: number | string;
};
