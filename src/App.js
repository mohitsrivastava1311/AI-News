import React, { useState, useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'

import wordsToNumbers from 'words-to-numbers'

import NewsCards from './components/NewsCards/NewsCards'
/* import useStyles from './styles.js' */
import './index.css'

/* const alanKey = '1cf0458946fd2c0074c78af257721af02e956eca572e1d8b807a3e2338fdd0dc/stage' */
const alanKey = '2895da8a7add4abba8cf66ef1402b66a/stage'

const App = () => {
    const [newsArticles, setNewArticles] = useState([])
    const [activeArticle, setActiveArticle] = useState(-1)
    /* const classes = useStyles() */

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadLines') {
                    setNewArticles(articles)
                    setActiveArticle(-1)
                } else if(command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
                } else if(command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number
                    const article = articles[parsedNumber - 1]

                    if(parsedNumber > 20) {
                        alanBtn().playText('Please try that again.')
                    } else if(article) {
                        window.open(article.url, '_blank')
                        alanBtn().playText('Opening... ')
                    }

                }
            }
        })
    }, [])

    return ( 
            <div className="superman">
                <div className="lol2">
                    <h1>Welcome to AI News</h1>
                    <h1>I am Jarvis!</h1>
                </div>
                <NewsCards articles={newsArticles} activeArticle={activeArticle} />
                <div className="lol">
                    Developers: Mohit Srivastava
                    <br/>
                    MAHADEV
                </div>
            </div>
    )
}

export default App
