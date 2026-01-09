/**
 * Upload Marketing reports to existing File Search Store
 *
 * Run with: npx tsx scripts/upload-marketing-reports.ts
 */

import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

const FILE_SEARCH_STORE = process.env.GEMINI_FILE_SEARCH_STORE || "fileSearchStores/picklellamaknowledgebase-b1ambzi0s32z";
const MARKETING_REPORTS_DIR = path.join(os.homedir(), "Marketing/reports");

async function main() {
  const apiKey = process.env.GOOGLE_AI_API_KEY;

  if (!apiKey) {
    console.error("❌ GOOGLE_AI_API_KEY environment variable is required");
    console.error("   Set it with: export GOOGLE_AI_API_KEY=your-key");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });

  console.log("🚀 Uploading Marketing reports to File Search Store\n");
  console.log(`   Store: ${FILE_SEARCH_STORE}`);
  console.log(`   Source: ${MARKETING_REPORTS_DIR}\n`);

  // Find all .md files in Marketing/reports directory
  const filesToUpload: { path: string; displayName: string }[] = [];

  if (!fs.existsSync(MARKETING_REPORTS_DIR)) {
    console.error(`❌ Marketing reports directory not found: ${MARKETING_REPORTS_DIR}`);
    process.exit(1);
  }

  const entries = fs.readdirSync(MARKETING_REPORTS_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith(".md")) {
      const fullPath = path.join(MARKETING_REPORTS_DIR, entry.name);
      const displayName = `marketing-report/${entry.name.replace(".md", "")}`;
      filesToUpload.push({ path: fullPath, displayName });
    }
  }

  console.log(`📄 Found ${filesToUpload.length} markdown files to upload:`);
  filesToUpload.forEach(f => console.log(`   - ${f.displayName}`));

  // Upload each file
  console.log("\n📤 Uploading files...\n");

  let successCount = 0;
  let errorCount = 0;

  for (const file of filesToUpload) {
    console.log(`   Uploading: ${file.displayName}...`);

    try {
      // Read the file content
      const content = fs.readFileSync(file.path, "utf-8");

      // Create a temporary text file
      const tempPath = `/tmp/${file.displayName.replace(/\//g, "-")}.txt`;

      // Clean up the markdown content
      const plainText = content
        .replace(/^---[\s\S]*?---\n/, "") // Remove frontmatter if any
        .trim();

      fs.writeFileSync(tempPath, plainText);

      // Upload to File Search Store
      let operation = await ai.fileSearchStores.uploadToFileSearchStore({
        file: tempPath,
        fileSearchStoreName: FILE_SEARCH_STORE,
        config: {
          displayName: file.displayName,
        }
      });

      // Wait for processing to complete
      let attempts = 0;
      while (!operation.done && attempts < 30) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        operation = await ai.operations.get({ operation });
        attempts++;
      }

      if (operation.done) {
        console.log(`   ✅ ${file.displayName}`);
        successCount++;
      } else {
        console.log(`   ⚠️  ${file.displayName} - still processing`);
      }

      // Clean up temp file
      fs.unlinkSync(tempPath);

    } catch (error) {
      console.error(`   ❌ Error uploading ${file.displayName}:`, error);
      errorCount++;
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log(`✅ Upload complete! ${successCount} succeeded, ${errorCount} failed`);
  console.log("=".repeat(60));
}

main().catch(console.error);
