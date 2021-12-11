const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
const { describe, after, beforeEach, afterEach } = require('mocha');

let browser, page;

describe('E2E tests', function () {
    this.timeout(-1);
    before(async () => { browser = await chromium.launch(); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('should load home page', async () => {
        await page.goto('http://127.0.0.1:8080');

        await page.waitForSelector('.accordion');

        const content = await page.textContent('#main');

        expect(content).to.include('Scalable Vector Graphics');
        expect(content).to.include('Open standard');
        expect(content).to.include('Unix');
        expect(content).to.include('ALGOL');
    });

    it('should work when MORE button is clicked', async () => {
        await page.goto('http://127.0.0.1:8080');
        await page.click('text=More');
        await page.waitForSelector('.accordion p');
        const textVisible = await page.isVisible('.accordion p');
        const lessButtonText = await page.innerText('button:has-text("Less")');
        expect(textVisible).is.true;
        expect(lessButtonText).is.equal('LESS');
    });

    it('should work when LESS button is clicked', async () => {
        await page.goto('http://127.0.0.1:8080');
        await page.click('text=More');
        await page.waitForResponse(/articles\/details/i);
        await page.waitForSelector('.accordion p');
        let textVisible = await page.isVisible('.accordion p');
        expect(textVisible).is.true;

        await page.click('text=Less');
        await page.waitForSelector('.accordion p', { state: 'hidden' });
        textVisible = await page.isVisible('.accordion p');
        const lessButtonText = await page.innerText('button:has-text("More")');
        expect(textVisible).is.false;
        expect(lessButtonText).is.equal('MORE');
    })
});