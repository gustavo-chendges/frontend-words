import { useState } from 'react'
import WordCard from './WordCard'
import WordsList from './WordsList'
import { useLocation } from 'react-router-dom'

const WordsQueueComponent = ({ ids }) => {
    const location = useLocation()

    const redirectFromEdit = location.state?.params?.category && location.state?.params?.id

    const [index, setIndex] = useState(0);
    const [showWordsList, setShowWordsList] = useState(redirectFromEdit ? true : false)

    const selectedId = ids[index];

    const handleNextClicked = () =>
        setIndex(i => Math.min(i + 1, ids.length - 1));

    const handlePreviousClicked = () =>
        setIndex(i => Math.max(i - 1, 0))

    const handleShowWordsList = () => {
        setShowWordsList(prev => !prev)
    }

    return (
        <>
            {showWordsList ?
                <WordsList handleShowWordsList={handleShowWordsList} /> :
                
                <WordCard id={selectedId} handlePreviousClicked={handlePreviousClicked} handleNextClicked={handleNextClicked} handleShowWordsList={handleShowWordsList} />
            }
        </>
    )
}

export default WordsQueueComponent