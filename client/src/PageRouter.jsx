import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './pages/App.jsx';
import Create from './pages/Create.jsx';
import NotFound from './pages/NotFound.jsx';
import Edit from './pages/Edit.jsx';

export default function PageRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<App />} />
                <Route path='/home' element={<App />} />
                <Route path='/create' element={<Create />} />
                <Route path='/edit' element={<Edit />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}