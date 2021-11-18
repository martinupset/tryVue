'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GoodsSchema extends Schema {
  up () {
    this.create('goods', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('goods')
  }
}

module.exports = GoodsSchema
