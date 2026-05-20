import WordForm from './WordForm'
import { useParams, useNavigate, } from 'react-router-dom'

import { useUpdateWordMutation } from './wordsApiSlice'
import { makeWordsSelectors } from './wordsApiSlice'
import { useSelector } from 'react-redux'
import setwordCategory from '../../utils/functions/setWordCategory'
import Loading from '../../components/Loading'

const EditWord = () => {
  const navigate = useNavigate()
  const params = useParams()

  const category = params.category
  const id = params.id

  const { selectById } = makeWordsSelectors(category)

  const word = useSelector(state => selectById(state, id))
  

  const [updateWord, { isLoading, isSuccess, isError, error }] = useUpdateWordMutation()

  if (!word) return <Loading />

  const handleSubmit = async (data) => {

    const previousCategory = word.wordClass.map((w) => setwordCategory(w))
    console.log(previousCategory)

    const newWordUpdated = { ...data, previousCategory, nextCategory: Array.from(new Set(data.wordClass.map((w) => setwordCategory(w)))) }
    console.log(newWordUpdated)

    await updateWord({id, ...newWordUpdated}).unwrap()

    navigate(`/words/${newWordUpdated.nextCategory[0]}`, { state: { params } })
  }

  return (
    <>

      <WordForm
        onSubmit={handleSubmit}
        defaultValues={word}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
      />
    </>
  )
}

export default EditWord