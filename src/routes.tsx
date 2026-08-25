import { createRoot } from 'react-dom/client'
import MainForm from './form/MainForm'
import "../css/index.css"
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router'
import { useEffect } from 'react'

function RedirectCompat()
{
    const { hash } = useLocation()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (hash === '#gamejam') {
            //navigate(getNavigationNoHook("/gamejam", searchParams), { replace: true })
        }
    }, [hash, navigate])

    return null
}

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <RedirectCompat />
        <Routes>
            <Route path='/' element={<MainForm/>} />
        </Routes>
    </BrowserRouter>
)