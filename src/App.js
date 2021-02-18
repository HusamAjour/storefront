import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoriesList from './components/CategoriesList.js';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {console.log('Inside App')}
      <BrowserRouter>
        <Header />
        <CategoriesList />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
