
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import NotesProvider from './Context/notesContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <NotesProvider>
        <App />
    </NotesProvider>
)
