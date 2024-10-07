import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [ingredientData, setIngredientData] = useState(null);
  const [search, setSearch] = useState('vodka');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null); 
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${search}`);
        
        
        if (response.data.ingredients && response.data.ingredients.length > 0) {
          setIngredientData(response.data.ingredients[0]);
        } else {
          setError('Ingredient not found'); 
        }
      } catch (err) {
        setError('Failed to fetch data'); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div>
      <h1>Cocktail Ingredient and Information Search</h1>
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
          <p>Example ingridients that you can search: vodka, gin, rum, whiskey, tequila, brandy, vermouth</p>
          <h2>{ingredientData.strIngredient}</h2>
          <p><strong>Type:</strong> {ingredientData.strType}</p>
          <p><strong>Alcohol:</strong> {ingredientData.strAlcohol}</p>
          <p><strong>ABV:</strong> {ingredientData.strABV}%</p>
          <p>{ingredientData.strDescription}</p>
        </div>
      )}
    </div>
  );
}

export default App;
