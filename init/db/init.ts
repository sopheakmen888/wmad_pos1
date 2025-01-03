/* eslint-disable no-console, no-process-exit */

import * as fs from "fs";
import * as path from "path";
import * as bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const role = await prisma.role.create({
      data: {
        id: 1,
        name: "Admin",
      },
    });
    console.log("Role created:", role.name);

    const username = process.env.ADMIN_DEFAULT_USERNAME || "admin";
    const email = process.env.ADMIN_DEFAULT_EMAIL || "admin@demo.com";
    const password = process.env.ADMIN_DEFAULT_PASSWORD || "admin";
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        roleId: 1,
      },
    });

    console.log("Admin created:", data.username);

    const rawSql = await fs.promises.readFile(
      path.join(__dirname, "seed.sql"),
      {
        encoding: "utf-8",
      }
    );
    const sqlReducedToStatements = rawSql
      .split("\n")
      .filter((line) => !line.startsWith("--")) // remove comments-only lines
      .join("\n")
      .replace(/\r\n|\n|\r/g, " ") // remove newlines
      .replace(/\s+/g, " "); // excess white space
    const sqlStatements = splitStringByNotQuotedSemicolon(
      sqlReducedToStatements
    );

    for (const sql of sqlStatements) {
      await prisma.$executeRawUnsafe(sql);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

function splitStringByNotQuotedSemicolon(input: string): string[] {
  const result = [];

  let currentSplitIndex = 0;
  let isInString = false;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "'") {
      // toggle isInString
      isInString = !isInString;
    }
    if (input[i] === ";" && !isInString) {
      result.push(input.substring(currentSplitIndex, i + 1));
      currentSplitIndex = i + 2;
    }
  }

  return result;
}

void main();
