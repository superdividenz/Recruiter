import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    // Run the seed script
    const { stdout, stderr } = await execAsync("npx tsx seed.ts");

    if (stderr) {
      console.error("Seed stderr:", stderr);
    }

    console.log("Seed stdout:", stdout);

    return NextResponse.json({
      success: true,
      message: "Test users created successfully"
    });
  } catch (error) {
    console.error("Seed execution error:", error);
    return NextResponse.json({
      error: "Failed to create test users"
    }, { status: 500 });
  }
}