import React from 'react';
import './App.css'
import SearchButton from './components/serch'

function App() {
  
  return (
    <React.Fragment>
      <div className="w-100 d-grid">
        <h2 className='text-wrap'>Skriv inn et substantiv og få bøyning</h2>
        <SearchButton/>
      </div>
    </React.Fragment>
  )
}

export default App
