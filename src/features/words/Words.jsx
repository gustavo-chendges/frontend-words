import { useGetWordsQuery } from "./wordsApiSlice"
import WordsQueue from "./WordsQueue"
import { useSelector } from "react-redux"
import { makeWordsSelectors } from "./wordsApiSlice"
import { useParams } from "react-router-dom"
import Loading from "../../components/Loading"

const Words = () => {
    const { category } = useParams()

    const {
        isSuccess,
        isLoading,
        isError,
        error
    } = useGetWordsQuery(category, {
        skip: !category,
        refetchOnMountOrArgChange: true
    })

    const { selectIds } = makeWordsSelectors(category)
    const ids = useSelector(selectIds)

    let content

    if (isLoading) {
        content = <Loading />

    } else if (isError) {
        content = <Error error={error} />

    } else if (isSuccess) {
        content =
            <>
                <WordsQueue ids={ids} />
            </>
    }

    return content
}

export default Words