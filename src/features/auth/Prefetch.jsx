import { store } from '../../app/store'
import { wordsApiSlice } from '../words/wordsApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useGetWordsQuery } from '../words/wordsApiSlice'

import { useParams } from 'react-router-dom'

const Prefetch = () => {

    const params = useParams()
    const category = params.category
    
   useGetWordsQuery(category)

   
    return <Outlet/>
}

export default Prefetch