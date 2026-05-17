import { Form, Button, Container } from 'react-bootstrap'
import { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { wordsSchema } from '../../../validators/wordSchema'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons"

const WordForm = ({ onSubmit, defaultValues = {}, isLoading, isSuccess, isError, error }) => {
    const { register, control, handleSubmit, reset, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(wordsSchema),
        mode: "onChange",
        defaultValues: {
            word: "",
            wordClass: [""],
            translations: [""],
            ...defaultValues
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "translations"
    })

    useEffect(() => {
        if (fields.length === 0) {
            append("")
        }
    }, [fields, append])

    const handleFormSubmit = (data) => {
        const success = onSubmit(data)

        if(success){
            reset()
        }
    }

    const style = {
        translationInput: {
            color: "rgb(32, 32, 64)",
            backgroundColor: "white",
            border: "2px solid rgb(32, 32, 64)"
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-start py-4">
            <div className="w-100" style={{ maxWidth: "720px" }}>

                {isError ? typeof (error.data.message) === 'object' ?
                    Array.from(Object.keys(error.data.message)).map((err, i) => <p className="fs-4 err_msg" key={`err_${i}`}> {error.data.message[err]}  </p>) : <p className="fs-4 err_msg">{error.data.message}</p> : null
                }

                {isSuccess && <p className="text-success">Word added!</p>}

                <Form
                    id="form"
                    className="border rounded p-4 d-flex flex-column align-items-center"
                    onSubmit={handleSubmit(handleFormSubmit)}

                >
                    <Form.Group className="w-100 my-3">
                        <Form.Label htmlFor="wordInput" className="fs-4">
                            Palavra
                        </Form.Label>
                        <Form.Control
                            id="wordInput"
                            className="border-2 border-black fs-5"
                            {...register("word")}
                        />
                        {errors.word && (
                            <p className="text-danger">{errors.word.message}</p>
                        )}
                    </Form.Group>

                    <Form.Group className="w-100 my-3">
                        <Form.Label htmlFor="categorySelect" className="fs-4">
                            Classe da palavra
                        </Form.Label>
                        <Form.Select
                            id="categorySelect"
                            multiple
                            className="border-2 border-black fs-5"
                            {...register("wordClass")}
                        >
                            <option value="noun">Substantivo</option>
                            <option value="article">Artigo</option>
                            <option value="numeral">Numeral</option>
                            <option value="pronoun">Pronome</option>
                            <option value="adjective">Adjetivo</option>
                            <option value="adverb">Advérbio</option>
                            <option value="verb">Verbo</option>
                            <option value="preposition">Preposição</option>
                            <option value="conjunction">Conjunção</option>
                            <option value="interjection">Interjeção</option>
                        </Form.Select>
                        {errors.wordClass && (
                            <p className="text-danger">{errors.wordClass.message}</p>
                        )}
                    </Form.Group>

                    <Form.Group className="w-100 my-3">
                        {fields.map((field, index) => (
                            <div key={field.id} className="d-flex flex-column mb-2">
                                <Form.Label className="fs-4">
                                    Translation {index + 1}
                                </Form.Label>
                                <Form.Control
                                    className="border-2 border-black fs-5"
                                    {...register(`translations.${index}`)}
                                    placeholder={`Translation ${index + 1}`}
                                />
                                {errors.translations?.[index] && (
                                    <p className="text-danger">
                                        {errors.translations[index].message}
                                    </p>
                                )}
                            </div>
                        ))}

                        {fields.length < 3 && (
                            <Button
                                type="button"
                                className="fs-6 mt-2"
                                style={style.translationInput}
                                onClick={() => append("")}
                            >
                                <FontAwesomeIcon icon={faPlusCircle} /> Adicionar tradução
                            </Button>
                        )}

                        {fields.length > 1 && (
                            <Button
                                type="button"
                                className="fs-6 mt-2"
                                style={{
                                    color: "rgb(255, 32, 32)",
                                    backgroundColor: "white",
                                    border: "2px solid rgb(255, 32, 32)",
                                }}
                                onClick={() => remove(fields.length - 1)}
                            >
                                <FontAwesomeIcon icon={faMinusCircle} /> Remover tradução
                            </Button>
                        )}
                    </Form.Group>

                    <Button
                        type="submit"
                        className="w-100 mt-4 fs-4"
                        style={{ backgroundColor: "rgb(32,32,64)", border: 0 }}
                        disabled={!isValid || isLoading}
                    >
                        Salvar
                    </Button>
                </Form>
            </div>
        </Container>
    )
}

export default WordForm