import { asyncHandler } from '../../lib/util.js';
import { Validator } from '../../lib/validator.js';
import { CreateBookRequest } from '../requests/create-book.request.js';
import * as bookService from '../services/book.service.js';


export const createNewBook = asyncHandler( async ( req, res ) =>
{ 
    const validator = new Validator();
    const { errors, value } = validator.validate( CreateBookRequest, req.body );

    if ( errors ) throw new ValidationError( "The request failed with the following errors", errors );

    const book = await bookService.createBook( value );

    return res.status( 201 ).json( {
        success: true,
        message: 'New book record created',
        data: {
            book
        }
    })
} );

export const fetchAllBooks = asyncHandler( async ( req, res ) =>
{
    const books = Object.keys(req.query).length >= 1
      ? await bookService.getBooks(req.query)
      : await bookService.getBooks();

    return res.json( {
        success: true,
        message: 'Books retrieved',
        data: {
            books
        }
    })
} )

export const fetchBook = asyncHandler( async ( req, res ) =>
{
    const { id } = req.params;

    const book = await bookService.getBook( id );

    return res.json( {
        success: true,
        message: 'Book retrieved',
        data: {
            book
        }
    })
} );
 
export const updateSingleBook = asyncHandler( async ( req, res ) =>
{
    const { id } = req.params;

    const validator = new Validator()
    const { errors, value } = validator.validate( CreateBookRequest, req.body );

    if ( errors ) throw new ValidationError( "The request failed with the following errors", errors );

    await bookService.updateBook( id, value );

    return res.json( {
        success: true,
        message: "Book updated"
    } );
} );
 
export const deleteSingleBook = asyncHandler( async ( req, res ) =>
{
    const { id } = req.params;
    
    await bookService.deleteBook( id );

    res.json( {
        success: true,
        message: 'Book Deleted'
    })
})

export const borrowABook = asyncHandler( async ( req, res ) =>
{
    const { id } = req.params;
    const { borrowedAt } = req.body;

    await bookService.borrowBook( id, req.user._id, borrowedAt );

    res.json( {
        success: true,
        message: 'Book borrowed successfully'
    })
} );
 
export const returnABook = asyncHandler( async ( req, res ) =>
{ 
    const { id } = req.params;
    const { returnedAt } = req.body;

    await bookService.returnBook( id, req.user._id, returnedAt );

    res.json( {
        success: true,
        message: 'Book returned successfully'
    })
} );