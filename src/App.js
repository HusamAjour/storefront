import './App.css';
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import CategoriesList from './components/CategoriesList.js';

function App() {
  return (
    <div className="App">
      {console.log('Inside App')}
      <Header />
      <CategoriesList />
      <Footer />
    </div>
  );
}

export default App;
