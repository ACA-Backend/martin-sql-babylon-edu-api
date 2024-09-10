// import { model, Schema } from 'mongoose';

// const BorrowedBookSchema = new Schema( {
//     userId: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     bookId: {
//         type: Schema.Types.ObjectId,
//         ref: 'Book',
//         required: true
//     },
//     borrowedAt: {
//         type: Date,
//         required: true
//     },
//     returnDueAt: {
//         type: Date,
//         // default will be two weeks from the borrowedAt date
//         default: null,
//     },
//     returnedAt: {
//         type: Date,
//         default: null
//     }
// }, { timestamps: true } );

// BorrowedBookSchema.index( { userId: 1, bookId: 1 }, { unique: true } );

// BorrowedBookSchema.pre( 'save', function ( next )
// { 
//     if ( this.isModified( 'borrowedAt' ) ){
//         this.returnDueAt = this.borrowedAt;
//         this.returnDueAt.setDate( this.returnDueAt.getDate() + 14 );
//     }
//     next();
// } );

// export const BorrowedBook = model( 'BorrowedBook', BorrowedBookSchema );