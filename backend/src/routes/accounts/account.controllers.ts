import { Request, Response } from "express";
import { sql } from "drizzle-orm"; // Import sql from drizzle
import { accountsTable } from "../../db/accountSchema";
import { eq } from "drizzle-orm"; // Ensure eq is imported

import db from "../../db";

export const getAllAccountsController = async (req: Request, res: Response) => {
  try {
    const accounts = await db.select().from(accountsTable); // Fetch all accounts
    res.status(200).json({
      success: true,
      message: "Fetched all accounts successfully",
      data: accounts,
    });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching accounts.",
    });
  }
};

export const addAccountController = async (req: Request, res: Response) => {
  try {
    const { accountId, introducerId } = req.body; // Destructure request body
    let beneficiaryId: number;

    const existedAccount = await db
      .select()
      .from(accountsTable)
      .where(eq(accountsTable.accountId, accountId));

    if (existedAccount) {
      throw new Error("already account exists");
      return res.status(404).json({
        success: false,
        message:
          "This account already existed in database please try again with another account id",
      });
    }

    if (introducerId === 0) {
      beneficiaryId = 0; // No beneficiary for the first account
    } else {
      // Count existing accounts by the introducer
      const countResult = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(accountsTable)
        .where(eq(accountsTable.introducerId, introducerId));

      // console.log(countResult);

      const count = countResult[0]?.count || 0;

      if ((count + 1) % 2 === 0) {
        // Even: Introducer's Beneficiary
        const introducerBeneficiaryResult = await db
          .select({ beneficiaryId: accountsTable.beneficiaryId })
          .from(accountsTable)
          .where(eq(accountsTable.accountId, introducerId)); // Correct usage of eq()

        beneficiaryId =
          introducerBeneficiaryResult[0]?.beneficiaryId || introducerId;
      } else {
        // Odd: Introducer is the Beneficiary
        beneficiaryId = introducerId;
      }
    }

    // Insert the new account
    await db.insert(accountsTable).values({
      accountId: accountId,
      introducerId: introducerId,
      beneficiaryId: beneficiaryId,
    });

    res.status(201).json({
      success: true,
      message: "Account added successfully!",
      beneficiaryId: beneficiaryId,
    });
  } catch (error: any) {
    console.error("Error adding account:", error);
    res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};
