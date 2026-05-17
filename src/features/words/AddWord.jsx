import WordForm from "./WordForm"
import setWordCategory from "../../utils/functions/setWordCategory"
import { useAddWordMutation } from "../words/wordsApiSlice"


const AddWord = () => {

  const [addWord, { isLoading, isSuccess, isError, error }] = useAddWordMutation()

  const handleSubmit = async (data) => {

    const addedWord = { ...data, wordClass: data.wordClass.map(c => c.toLowerCase()), category: data.wordClass.map(c => setWordCategory(c)) }

    await addWord(addedWord)

    return true
  }

  return (
    <>
      <WordForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
      />
    </>
  )
}

export default AddWord