import puppeteer, { type Browser, type Page } from 'puppeteer';
import { join } from 'node:path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const OUTPUT_DIR = join(process.cwd(), 'public/assets/images');

interface ScreenshotConfig {
  name: string;
  path: string;
  viewport: { width: number; height: number };
  fullPage?: boolean;
  mobile?: boolean;
}

const screenshots: ScreenshotConfig[] = [
  {
    name: 'bunshelf-desktop',
    path: '/intro',
    viewport: { width: 1920, height: 1080 },
    fullPage: true,
  },
  {
    name: 'bunshelf-mobile',
    path: '/intro',
    viewport: { width: 375, height: 812 },
    fullPage: false,
    mobile: true,
  },
];

async function takeScreenshot(browser: Browser, config: ScreenshotConfig): Promise<void> {
  console.log(`Taking screenshot: ${config.name}`);
  
  const page = await browser.newPage();
  
  await page.setViewport({
    width: config.viewport.width,
    height: config.viewport.height,
    isMobile: config.mobile || false,
    hasTouch: config.mobile || false,
  });
  
  if (config.mobile) {
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
  }
  
  await page.goto(`${BASE_URL}${config.path}`, {
    waitUntil: 'networkidle2',
    timeout: 30000,
  });
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const outputPath = join(OUTPUT_DIR, `${config.name}.png`);
  
  await page.screenshot({
    path: outputPath,
    fullPage: config.fullPage ?? false,
  });
  
  console.log(`✓ Saved: ${outputPath}`);
  
  await page.close();
}

async function main(): Promise<void> {
  console.log('Starting screenshot capture...');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Output directory: ${OUTPUT_DIR}\n`);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--disable-software-rasterizer',
      '--disable-extensions',
    ],
  });
  
  try {
    for (const config of screenshots) {
      await takeScreenshot(browser, config);
    }
    
    console.log('\n✅ All screenshots captured successfully!');
  } catch (error) {
    console.error('❌ Error taking screenshots:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
