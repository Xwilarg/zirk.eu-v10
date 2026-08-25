import { createRoot } from 'react-dom/client'
import MainForm from './forms/MainForm'
import "../css/index.css"
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router'
import { useEffect } from 'react'
import SecretQuoteForm from './forms/secrets/SecretQuoteForm'
import GameJamForm from './forms/GameJamForm'
import { getNavigationNoHook } from './utils'

function RedirectCompat()
{
    const { hash } = useLocation()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (hash === '#gamejam') {
            navigate(getNavigationNoHook("/gamejam", searchParams), { replace: true })
        }
    }, [hash, navigate])

    return null
}

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <RedirectCompat />
        <Routes>
            <Route path='/' element={<MainForm/>} />
            <Route path='/gamejam' element={<GameJamForm/>} />
            <Route path='/secret/quote' element={<SecretQuoteForm />} />
        </Routes>
    </BrowserRouter>
)