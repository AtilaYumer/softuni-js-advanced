//@ts-check
const {chromium} = require('playwright-chromium');
const {expect} = require("chai");

let browser, page;

describe('E2E test', function () {
    this.timeout(-1);
    before(async () => {
        browser = await chromium.launch();
    });
    after(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        page = await browser.newPage();
    });
    afterEach(async () => {
        await page.close();
    });

    it("should load all messages when Refresh button is pressed", async () => {
        await page.goto('http://127.0.0.1:8080');

        await Promise.all([
            page.waitForResponse('**/jsonstore/messenger'),
            page.click('text=Refresh')
        ]);
        const content = await page.evaluate(() => document.querySelector('#messages').value);
        expect(content).to.include('Spami: Hello, are you there?');
        expect(content).to.include('Garry: Yep, whats up :?');
        expect(content).to.include('Spami: How are you? Long time no see? :)');
        expect(content).to.include('George: Hello, guys! :))');
        expect(content).to.include('Spami: Hello, George nice to see you! :)))');
    });

    it('should send message when send button is clicked', async () => {
        await page.goto('http://127.0.0.1:8080/');
        await page.fill('#author', 'Nike');
        await page.fill('#content', 'Yesterday you said tomorrow. Just do it.');

        const [request, response] = await Promise.all([
            page.waitForRequest('**/jsonstore/messenger'),
            page.waitForResponse('**/jsonstore/messenger'),
            page.click('text=Send'),
        ]);

        expect('{"author":"Nike","content":"Yesterday you said tomorrow. Just do it."}').to.be.equal(request.postData());
        expect(response.status).to.be.ok;
    });
});