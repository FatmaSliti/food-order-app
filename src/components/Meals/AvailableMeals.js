import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "../MealItem/MealItem";
import { useEffect, useState } from "react";


// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
// ]

const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            const response = await fetch('https://react-http-ba0a5-default-rtdb.firebaseio.com/mealsData.json');

            if (!response.ok) {
                throw new Error('something went wrong!');
            }
            const responseData = await response.json();

            //knowing that the fetched data from the firebase returns an object we need to transform it to an array of objects 

            const loadedMeals = [];

            for (const key in responseData) { //keys are m1/m2/m3 in the firebase
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                })
            }
            setMeals(loadedMeals)
            setIsLoading(false)

        }
        // try {
        //     fetchMeals();
        // } catch (error) {
        //     setIsLoading(false);
        //     setError(error.message);
        // }

        fetchMeals().catch((error) => {
            setIsLoading(false);
            setError(error.message);
        })
    }, []);

    if (isLoading) {
        return <section className={styles.mealsLoading}>
            <p>Data is Loading...</p>
        </section>
    }

    if (error) {
        return <section className={styles.mealsError}>
            <p>{error}</p>
        </section>
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
        <section className={styles.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
