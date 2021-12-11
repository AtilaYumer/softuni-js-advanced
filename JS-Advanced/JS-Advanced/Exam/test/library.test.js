const {expect} = require('chai');
const {library} = require('../ex3/library');

describe('Tests', () => {

    describe('calcPriceOfBook', () => {
        it('should throw error', function () {
            expect(() => library.calcPriceOfBook(21, 1978)).to.throws("Invalid input");
        });
        it('should return error for invalid fields', function () {
            expect(() => {
                library.calcPriceOfBook([], 1)
            }).to.throw(Error);
        });

        it('should return error for invalid fields', function () {
            expect(() => {
                library.calcPriceOfBook('Book')
            }).to.throw(Error);
        });

        it('should return error for invalid field', function () {
            expect(() => {
                library.calcPriceOfBook("The name of the rose", '1')
            }).to.throw(Error);
        });

        it('should return error for no params', function () {
            expect(() => {
                library.calcPriceOfBook()
            }).to.throw(Error);
        });

        it('should throw an error for year 1980.50', () => {
            expect(() => {
                library.calcPriceOfBook('Book', 1980.50)
            }).to.throw(Error);
        })

        it('should return 20', function () {
            expect(library.calcPriceOfBook('Book', 2021)).to.be.equals('Price of Book is 20.00')
        });

        it('should return price', function () {
            expect(library.calcPriceOfBook('Book', 1976)).to.be.equals('Price of Book is 10.00');
        });

        it('should return 10 for year 1980', () => {
            expect(library.calcPriceOfBook('Book', 1980)).to.be.equals('Price of Book is 10.00');
        });
        it('should return 10 for year 1980', () => {
            expect(library.calcPriceOfBook('Book', 1981)).to.be.equals('Price of Book is 20.00');
        });
    });

    describe('findBook', () => {

        it('should return Error for empty arr', () => {
            expect(() => {
                library.findBook([], 'Book');
            }).to.throw(Error);
        });

        it('should return Error for not valid desired book', () => {
            expect(() => {
                library.findBook([], 1);
            }).to.throw(Error);
        });

        it('should return Error for only one param', () => {
            expect(() => {
                library.findBook([]);
            }).to.throw(Error);
        });

        it('should throw error when there are no params', function () {
            expect(() => {
                library.findBook()
            }).to.throw(Error);
        });

        it('should return book is found', function () {
           expect(library.findBook(['Book', 'Another book'], 'Book')).to.be.equals('We found the book you want.');
        });

        it('should return book is found', function () {
            expect(library.findBook(['Book', 'Another book'], 'book')).to.be.equals('The book you are looking for is not here!');
        });

        it('should return book is not found', function () {
           expect(library.findBook(['Book', 'Another book'], 'Booook')).to.be.equals('The book you are looking for is not here!');
        });
    });

    describe('arrangeTheBooks', () => {
        it('should throw error', function () {
            expect(() => {
                library.arrangeTheBooks()
            }).to.throw(Error);
        });

        it('should trow error non int arg', function () {
            expect(() => {
                library.arrangeTheBooks(2.1);
            }).to.throw(Error);
        });

        it('should trow error negative arg', function () {
            expect(() => {
                library.arrangeTheBooks(-2);
            }).to.throw(Error);
        });

        it('should trow error string arg', function () {
            expect(() => {
                library.arrangeTheBooks('2');
            }).to.throw(Error);
        });

        it('should arrange the books', function () {
            expect(library.arrangeTheBooks(20)).to.be.equals('Great job, the books are arranged.');
        });

        it('should arrange the books for 40', function () {
            expect(library.arrangeTheBooks(40)).to.be.equals('Great job, the books are arranged.');
        });

        it('should return no space for 41 books', function () {
            expect(library.arrangeTheBooks(41)).to.be.equals('Insufficient space, more shelves need to be purchased.');
        });

        it('should return no space', function () {
            expect(library.arrangeTheBooks(50)).to.be.equals('Insufficient space, more shelves need to be purchased.');
        });
    })
})