import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';


const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpErrror, setHttpErrror] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setHttpErrror(false)
      const response = await fetch("https://react-http-987ec-default-rtdb.firebaseio.com/meals.json")
      const data = await response.json()
      if (!response.ok) {
        throw new Error("Error Occured !!!")
      }
      const tmp = []
      for (let key in data) {
        tmp.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setMeals(tmp)
      setIsLoading(false)
    }
    fetchData().catch(err => {
      setHttpErrror(err)
      setIsLoading(false)
    })
  }, [])
  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading!!!</p>
      </section>
    );
  }
  if(httpErrror){
    return (
      <section className={classes.MealsError}>
        <p>{httpErrror}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
