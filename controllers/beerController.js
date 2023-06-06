import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'

import Brand from '../models/Brand.js'
import Beer from '../models/Beer.js'

/**
 * List all Beers (without Brand Name)
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const listBeers = async (req, res) => {
  try {
    const brands = await Brand.find().exec()
    let allBeers = []
    brands.forEach((brand) => {
      allBeers = [...allBeers, ...brand.beers]
      // allBeers.push(...brand.beers)
    })

    return res.status(StatusCodes.OK).json(allBeers)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

/**
 * list all Beers with Brand Name
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const listBeersWithBrandName = async (req, res) => {
  try {
    const brands = await Brand.find().exec()
    let allBeers = []

    brands.forEach((brand) => {
      const brandName = brand.brandName
      brand.beers.forEach((beer) => {
        const fullBeerName = `${brandName} ${beer.beerName}`
        const beerWithBrandName = {
          ...beer.toObject(),
          brandName: brandName,
          fullBeerName: fullBeerName,
        }
        allBeers.push(beerWithBrandName)
      })
    })

    // brands.forEach((brand) => {
    //   brand.beers.forEach((beer) => {
    //     const fullName = {
    //       fullBeerName: `${brand.brandName} ${beer.beerName}`,
    //       brandName: brand.brandName,
    //     }
    //     allBeers.push(beer, fullName)
    //   })
    // })

    return res.status(StatusCodes.OK).json(allBeers)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

/**
 * Function to get Details about chosen beer
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getBeerDetails = async (req, res) => {
  const beerId = req.params.beerId

  try {
    const beer = await Brand.findOne({ 'beers._id': beerId })
      .populate('beers')
      .exec()
    if (!beer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Beer not found' })
    }

    const selectedBeer = beer.beers.find(
      (beer) => beer._id.toString() === beerId
    )
    const beerWithBrand = {
      ...selectedBeer.toObject(),
      brandName: beer.brandName,
      brandDescription: beer.brandDescription,
      mainAddress: beer.mainAddress,
      url: beer.url,
    }

    return res.status(StatusCodes.OK).json(beerWithBrand)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

/**
 * List all beers of One Brand (by Brand ID)
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const listBeersByBrand = async (req, res) => {
  const brandId = req.params.brandId

  try {
    const brand = await Brand.findById(brandId).exec()
    if (!brand) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Brand not found' })
    }

    const beers = brand.beers
    return res.status(StatusCodes.OK).json(beers)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

/**
 * Filter all beers by beerType
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const filterBeersByType = async (req, res) => {
  const beerType = req.query.beerType

  try {
    const brands = await Brand.find({ 'beers.beerType': beerType }).exec()
    const beers = brands.reduce((result, brand) => {
      const filteredBeers = brand.beers.filter(
        (beer) => beer.beerType === beerType //Beer Type here
      )
      return [...result, ...filteredBeers]
    }, [])

    return res.status(StatusCodes.OK).json(beers)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}
