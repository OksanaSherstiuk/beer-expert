import { Schema, model } from 'mongoose'
import { beerSchema } from './Beer.js'

const brandSchema = new Schema({
  brandName: { type: String, required: true },
  url: { type: String, required: true },
  brandDescription: { type: String, required: true },
  mainAddress: {
    street: String,
    number: String,
    plz: String,
    city: String,
    land: String,
    country: String,
    latitude: Number,
    longitude: Number,
  },
  beers: [beerSchema],
})

const Brand = model('brand', brandSchema)

export default Brand
