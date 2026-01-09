/**
 * Setup script for Google Gemini File Search
 *
 * This script:
 * 1. Creates a File Search Store (if it doesn't exist)
 * 2. Uploads all MDX content files to the store
 *
 * Run with: npx tsx scripts/setup-file-search.ts
 */

import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";
import * as path from "path";

const STORE_DISPLAY_NAME = "picklellama-knowledge-base";

async function main() {
  const apiKey = process.env.GOOGLE_AI_API_KEY;

  if (!apiKey) {
    console.error("❌ GOOGLE_AI_API_KEY environment variable is required");
    console.error("   Set it with: export GOOGLE_AI_API_KEY=your-key");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });

  console.log("🚀 Setting up File Search Store for PickleLlama knowledge base\n");

  // Step 1: Check for existing store or create new one
  console.log("📦 Checking for existing File Search Store...");

  let fileSearchStore: { name: string; displayName?: string } | null = null;

  try {
    // List existing stores to check if ours exists
    const stores = await ai.fileSearchStores.list();

    for await (const store of stores) {
      if (store.displayName === STORE_DISPLAY_NAME) {
        fileSearchStore = store;
        console.log(`   Found existing store: ${store.name}`);
        break;
      }
    }
  } catch (error) {
    console.log("   No existing stores found or error listing:", error);
  }

  if (!fileSearchStore) {
    console.log("   Creating new File Search Store...");
    fileSearchStore = await ai.fileSearchStores.create({
      config: { displayName: STORE_DISPLAY_NAME }
    });
    console.log(`   ✅ Created store: ${fileSearchStore.name}`);
  }

  // Step 2: Get list of content files to upload
  const contentDir = path.join(__dirname, "../content");
  const filesToUpload: { path: string; displayName: string }[] = [];

  // Find all MDX files in content directory
  function findMdxFiles(dir: string, prefix: string = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        findMdxFiles(fullPath, `${prefix}${entry.name}/`);
      } else if (entry.name.endsWith(".mdx")) {
        filesToUpload.push({
          path: fullPath,
          displayName: `${prefix}${entry.name.replace(".mdx", "")}`
        });
      }
    }
  }

  findMdxFiles(contentDir);

  console.log(`\n📄 Found ${filesToUpload.length} content files to upload:`);
  filesToUpload.forEach(f => console.log(`   - ${f.displayName}`));

  // Step 3: Upload each file
  console.log("\n📤 Uploading files to File Search Store...\n");

  for (const file of filesToUpload) {
    console.log(`   Uploading: ${file.displayName}...`);

    try {
      // Read the file content
      const content = fs.readFileSync(file.path, "utf-8");

      // Create a temporary text file (File Search works better with plain text)
      const tempPath = `/tmp/${file.displayName.replace(/\//g, "-")}.txt`;

      // Strip MDX frontmatter and convert to plain text
      const plainText = content
        .replace(/^---[\s\S]*?---\n/, "") // Remove frontmatter
        .replace(/<[^>]+>/g, "") // Remove JSX/HTML tags
        .replace(/import .+;?\n/g, "") // Remove imports
        .replace(/export .+;?\n/g, "") // Remove exports
        .trim();

      fs.writeFileSync(tempPath, plainText);

      // Upload to File Search Store
      let operation = await ai.fileSearchStores.uploadToFileSearchStore({
        file: tempPath,
        fileSearchStoreName: fileSearchStore.name,
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
      } else {
        console.log(`   ⚠️  ${file.displayName} - still processing`);
      }

      // Clean up temp file
      fs.unlinkSync(tempPath);

    } catch (error) {
      console.error(`   ❌ Error uploading ${file.displayName}:`, error);
    }
  }

  // Step 4: Output the store name for configuration
  console.log("\n" + "=".repeat(60));
  console.log("✅ Setup complete!\n");
  console.log("Add this to your environment variables:");
  console.log(`   GEMINI_FILE_SEARCH_STORE=${fileSearchStore.name}\n`);
  console.log("Or update your .env.local file:");
  console.log(`   echo 'GEMINI_FILE_SEARCH_STORE=${fileSearchStore.name}' >> .env.local`);
  console.log("=".repeat(60));
}

main().catch(console.error);
