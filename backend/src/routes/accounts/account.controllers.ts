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
    const { accountId, introducerId } = req.body;
    let beneficiaryId: number;

    // Check if the account already exists
    const existedAccount = await db
      .select()
      .from(accountsTable)
      .where(eq(accountsTable.accountId, accountId));

    if (existedAccount.length > 0) {
      return res.status(400).json({
        success: false,
        message: "This account already exists. Please try again.",
      });
    }

    if (introducerId === 0) {
      // For the first account, no introducer or beneficiary
      beneficiaryId = 0;
    } else {
      // Get all accounts introduced by this introducer
      const introducedAccounts = await db
        .select()
        .from(accountsTable)
        .where(eq(accountsTable.introducerId, introducerId));

      const newPosition = introducedAccounts.length + 1; // Position of this account (1-based index)

      if (newPosition % 2 === 0) {
        // Even position: Assign the introducer's introducer's beneficiary
        const introducerData = await db
          .select({
            introducerId: accountsTable.introducerId,
            beneficiaryId: accountsTable.beneficiaryId,
          })
          .from(accountsTable)
          .where(eq(accountsTable.accountId, introducerId));

        const introducerIntroducerId = introducerData[0]?.introducerId || 0;

        if (introducerIntroducerId === 0) {
          // If there's no introducer's introducer, fallback to introducer
          beneficiaryId = introducerId;
        } else {
          // Get the introducer's introducer's beneficiary
          const introducerIntroducerData = await db
            .select({ beneficiaryId: accountsTable.beneficiaryId })
            .from(accountsTable)
            .where(eq(accountsTable.accountId, introducerIntroducerId));

          beneficiaryId =
            introducerIntroducerData[0]?.beneficiaryId || introducerId;
        }
      } else {
        // Odd position: Assign introducer as the beneficiary
        beneficiaryId = introducerId;
      }
    }

    // Insert the new account into the database
    await db.insert(accountsTable).values({
      accountId,
      introducerId,
      beneficiaryId,
    });

    res.status(201).json({
      success: true,
      message: "Account added successfully!",
      beneficiaryId,
    });
  } catch (error: any) {
    console.error("Error adding account:", error);
    res.status(500).json({
      success: false,
      message: error.message || "An unexpected error occurred.",
    });
  }
};