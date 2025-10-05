import axios from 'axios'
import * as cheerio from 'cheerio'
import express from 'express'

const port = process.env.PORT || 5000
const app = express()

axios("https://www.manchestereveningnews.co.uk/sport/football/")
    .then(res => {
        const htmlData = res.data
        const $ = cheerio.load(htmlData)
        const articles = []

        $('.teaser-text', htmlData).each((index, element) => {
            const title = $(element).children('.headline').text()
            const url = $(element).children('.headline').attr('href')
            articles.push({
                title, 
                url
            })
        })
        console.log(articles)
    }).catch(err => console.log(err))

app.listen(port, () => console.log(`Server running on port ${port}`))