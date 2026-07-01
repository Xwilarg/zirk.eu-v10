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
    <div id="screen">
        <div id="screen-main">
            <BrowserRouter>
                <RedirectCompat />
                <Routes>
                    <Route path='*' element={<MainForm />} />
                    <Route path='/' element={<MainForm/>} />
                </Routes>
            </BrowserRouter>
        </div>
        <div id="taskbar">
            <div className='is-flex flex-center-ver flex-center-hor' id="start">Start</div>
        </div>
    </div>
)