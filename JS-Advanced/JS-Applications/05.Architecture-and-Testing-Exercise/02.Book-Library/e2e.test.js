const {chromium} = require('playwright-chromium');
const {expect} = require('chai');


let browser, page;

describe('E2E tests', function () {
    this.timeout(-1);
    before(async () => {
        browser = await chromium.launch()
    });
    after(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto('http://127.0.0.1:8080');
    });
    afterEach(async () => {
        await page.close();
    });

    it('should load all books when LOAD ALL BOOKS is clicked', async () => {
        await Promise.all([
            page.waitForResponse('**/jsonstore/collections/books'),
            page.click('text=Load All Books')
        ]);
        const books = await page.evaluate(() => document.querySelector('tbody').textContent);

        expect(books).to.include('Harry Potter and the Philosopher\'s Stone');
        expect(books).to.include('J.K.Rowling');
        expect(books).to.include('C# Fundamentals');
        expect(books).to.include('Svetlin Nakov');
    });

    it('should add new book when submit is clicked', async () => {
        await page.fill('input[name=title]', 'Clean code');
        await page.fill('input[name=author]', 'Uncle Bob');
        const [request, response] = await Promise.all([
            page.waitForRequest('**/jsonstore/collections/books'),
            page.waitForResponse('**/jsonstore/collections/books'),
            page.click('text=Submit')
        ]);
        expect('{"title":"Clean code","author":"Uncle Bob"}').to.be.equal(request.postData())
        expect(response.status).to.be.ok;
    });

    it.only('should edit selected book after submit ', async () => {
        await Promise.all([
            page.waitForResponse('**/jsonstore/collections/books'),
            page.click('text=Load all books')
        ]);

        await page.click('.editBtn:nth-child(1)');
        await page.waitForSelector(('#editForm'));
        await page.waitForSelector('css=input >> text=C# Fundamentals');
        await page.waitForSelector(`css=input >> text=Svetlin Nakov`);
        page.screenshot({path: 'edit.png'});
        await page.fill('input[name=title]', 'Java Fundamentals');
        await page.screenshot({path: 'after.png'});


        const [request, response] = await Promise.all([
            page.waitForRequest(req => {
                return req.url().includes('/jsonstore/collections/books') && req.method() === 'PUT';
            }),
            page.waitForResponse(res => {
                return res.url().includes('/jsonstore/collections/books');
            }),
            page.click('text=Save')
        ]);
        expect('{title: Java Fundamentals, author: Svetlin Nakov}').to.be.equal(request.postData());
        expect(response.status).to.be.ok;
    });
})