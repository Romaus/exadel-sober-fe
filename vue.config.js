const { defineConfig } = require('@vue/cli-service')
const dotenv = require("dotenv");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})
