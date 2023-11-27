const utility = require('../helpers/utility')
const { status, MSG } = require('../helpers/constants/constants')
const bookModal = require('../models/Books')

const createBook = async (req, res) => {
  try {
    let {
      bookTitle,
      bookAuthor,
      bookPublishedYear
    } = req.body
    const {
      bookDescription,
    } = req.body
    bookTitle = utility.capitalizeString(bookTitle)
    bookAuthor = utility.capitalizeString(bookAuthor)
    bookPublishedYear = utility.isValidBookPublishingYear(bookPublishedYear)
    if (!bookTitle || !bookAuthor || !bookPublishedYear) {
      return res.status(status.BAD_REQUEST).send(utility.errorRes(MSG.missingRequiredData))
    }
    const exist = await bookModal.findOne({ bookTitle })
    if (exist) {
      return res.status(status.BAD_REQUEST).send(utility.errorRes(MSG.alreadyExists))
    }
    const newBook = new bookModal({
      bookTitle,
      bookAuthor,
      bookDescription,
      bookPublishedYear,
    })
    const response = await newBook.save()
    return res.status(status.CREATED)
      .send(utility.successRes(MSG.dataCreated, { book: response }))
  } catch (error) {
    console.log(error)
    return res.status(status.ERROR).send(utility.errorRes(MSG.somethingWentWrong))
  }
}

const getAllBooks = async (req, res) => {
  try {
    const books = await bookModal.find({}).sort({ bookTitle: 1 }).lean()
    if (!books.length) {
      return res.status(status.SUCCESS)
        .send(utility.successRes(MSG.dataNotFound, []))
    }
    return res.status(status.SUCCESS)
      .send(utility.successRes(MSG.foundSuccessfully, { books }))
  } catch (error) {
    console.log(error)
    return res.status(status.ERROR).send(utility.errorRes(MSG.somethingWentWrong))
  }
}

const getBook = async (req, res) => {
  try {
    const _id = req.params.id
    if (!_id) {
      return res.status(status.BAD_REQUEST).send(utility.errorRes(MSG.missingRequiredData))
    }
    const book = await bookModal.findById(_id)
    if (!book) {
      return res.status(status.BAD_REQUEST).send(utility.errorRes(MSG.invalidId))
    }
    return res.status(status.SUCCESS)
      .send(utility.successRes(MSG.foundSuccessfully, { book }))
  } catch (error) {
    console.log(error)
    return res.status(status.ERROR).send(utility.errorRes(MSG.somethingWentWrong))
  }
}

const updateBook = async (req, res) => {
  try {
    const _id = req.params.id
    let {
      bookTitle,
      bookAuthor,
      bookPublishedYear,

    } = req.body
    const {
      bookDescription,
    } = req.body
    bookTitle = utility.capitalizeString(bookTitle)
    bookAuthor = utility.capitalizeString(bookAuthor)
    bookPublishedYear = utility.isValidBookPublishingYear(bookPublishedYear)
    if (!bookTitle || !bookAuthor || !bookPublishedYear || !_id) {
      return res.status(status.BAD_REQUEST).send(utility.errorRes(MSG.missingRequiredData))
    }
    const exist = await bookModal.findOne({ bookTitle, _id: { $ne: _id } })
    if (exist) {
      return res.status(status.BAD_REQUEST).send(utility.errorRes(MSG.alreadyExists))
    }
    const book = await bookModal.findByIdAndUpdate(_id,
      {
        bookTitle,
        bookAuthor,
        bookDescription,
        bookPublishedYear,
      },
      { new: true }
    )
    if (!book) {
      return res.status(status.BAD_REQUEST).send(utility.errorRes(MSG.invalidId))
    }
    return res.status(status.SUCCESS)
      .send(utility.successRes(MSG.updatedSuccessfully, { book }))
  } catch (error) {
    console.log(error)
    return res.status(status.ERROR).send(utility.errorRes(MSG.somethingWentWrong))
  }
}

const deleteBook = async (req, res) => {
  try {
    const _id = req.params.id
    if (!_id) {
      return res.status(status.BAD_REQUEST).send(utility.errorRes(MSG.missingRequiredData))
    }
    const book = await bookModal.findByIdAndDelete(_id)
    if (!book) {
      return res.status(status.BAD_REQUEST).send(utility.errorRes(MSG.invalidId))
    }
    return res.status(status.SUCCESS)
      .send(utility.successRes(MSG.deletedSuccessfully, []))
  } catch (error) {
    console.log(error)
    return res.status(status.ERROR).send(utility.errorRes(MSG.somethingWentWrong))
  }
}


module.exports = {
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
}