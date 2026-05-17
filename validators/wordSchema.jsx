import { z } from 'zod'

const wordClassEnum = z.enum([
    "preposition",
    "numeral",
    "article",
    "noun",
    "verb",
    "adjective",
    "adverb",
    "pronoun",
    "conjunction",
    "interjection"], {
        required_error: "A classe da palavra é obrigatória",
        invalid_type_error: "Classe da palavra inválida"
    })

export const wordsSchema = z.object({
    word: z.string().trim().min(1, "A palavra é obrigatória"),
    translations: z.array(z.string().trim().min(1, "A tradução não pode ser vazia!")).min(1, "Pelo menos uma tradução é obrigatória!").max(3, "Máximo de três traducões!"),
    wordClass: z.array(wordClassEnum).min(1, "Pelo menos uma classe da palavra é obrigatória"),
})