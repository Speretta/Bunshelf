#!/usr/bin/env node
import { parseArgs } from "node:util";
import { join } from "node:path";
import { exists } from "./utils/fs.js";
import { logger } from "./utils/logger.js";
import { handleError } from "./utils/errors.js";
const HELP_TEXT = `
bunshelf - A modern, fast, and beautiful documentation generator

Usage:
  bunshelf <command> [options]

Commands:
  dev       Start development server with hot reload
  build     Build static site for production
  preview   Preview production build locally

Options:
  --help, -h      Show this help message
  --version, -v   Show version number

Examples:
  bunshelf dev
  bunshelf build
  bunshelf preview

For more information, visit: https://github.com/speretta/bunshelf
`;
async function main() {
    const { positionals, values } = parseArgs({
        options: {
            help: {
                type: "boolean",
                short: "h",
            },
            version: {
                type: "boolean",
                short: "v",
            },
        },
        allowPositionals: true,
    });
    if (values.version) {
        const pkg = await import("../package.json", { assert: { type: "json" } });
        console.log(`bunshelf v${pkg.default.version}`);
        process.exit(0);
    }
    if (values.help || positionals.length === 0) {
        console.log(HELP_TEXT);
        process.exit(0);
    }
    const command = positionals[0];
    const docsDir = join(process.cwd(), "docs");
    if (!(await exists(docsDir))) {
        console.error("Error: 'docs' directory not found.");
        console.error("Please create a 'docs' directory with your markdown files.");
        console.error("\nExample structure:");
        console.error("  docs/");
        console.error("  ├── en/");
        console.error("  │   ├── intro.md");
        console.error("  │   └── config.yaml");
        console.error("  └── tr/");
        console.error("      └── intro.md");
        logger.error("Docs directory not found", { path: docsDir });
        process.exit(1);
    }
    try {
        switch (command) {
            case "dev": {
                console.log("🚀 Starting development server...\n");
                logger.info("Starting development server");
                await import("./server.js");
                break;
            }
            case "build": {
                console.log("🔨 Building static site...\n");
                logger.info("Starting build");
                await import("./ssg/builder.js");
                break;
            }
            case "preview": {
                console.log("👀 Starting preview server...\n");
                logger.info("Starting preview server");
                await import("./ssg/preview.js");
                break;
            }
            default:
                console.error(`Unknown command: ${command}`);
                console.error("\nAvailable commands: dev, build, preview");
                console.error("Run 'bunshelf --help' for more information.");
                logger.warn("Unknown command", { command });
                process.exit(1);
        }
    }
    catch (error) {
        const appError = handleError(error);
        console.error(`\n❌ Error: ${appError.userMessage}`);
        logger.error("CLI error", { command, error: appError.message });
        process.exit(1);
    }
}
main().catch((err) => {
    const error = handleError(err);
    console.error("Error:", error.message);
    logger.error("Unhandled CLI error", { error });
    process.exit(1);
});
//# sourceMappingURL=cli.js.map