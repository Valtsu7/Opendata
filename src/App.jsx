import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [ingredientData, setIngredientData] = useState(null); // API-tiedot
  const [search, setSearch] = useState('vodka'); // Hakusana
  const [isLoading, setIsLoading] = useState(true); // Lataustila
  const [error, setError] = useState(null); // Virheiden käsittely

  useEffect(() => {
    // API-kutsu
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${search}`);
        setIngredientData(response.data.ingredients[0]);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search]); //

  return (
    <div>
      <h1>Cocktail Ingredient Search</h1>
      <input 
        type="text" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder="Search for ingredient"
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {ingredientData && (
        <div>
          <h2>{ingredientData.strIngredient}</h2>
          <p><strong>Alcohol:</strong> {ingredientData.strAlcohol}</p>
          <p><strong>ABV:</strong> {ingredientData.strABV}%</p>
          <p>{ingredientData.strDescription}</p>
        </div>
      )}
    </div>
  );
}

export default App;
