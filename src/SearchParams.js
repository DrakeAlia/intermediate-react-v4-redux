import { useState, useEffect } from "react";
import Results from "./Results";
import useBreedList from "./useBreedList";
import { useSelector, useDispatch } from "react-redux";
import changeAnimal from "./actionCreators/changeAnimal";
import changeBreed from "./actionCreators/changeBreed";
import changeLocation from "./actionCreators/changeLocation";
import changeTheme from "./actionCreators/changeTheme";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const animal = useSelector(state => state.animal);
  const location = useSelector(state => state.location);
  const breed = useSelector(({ breed }) => breed);
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch()

  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();

    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => dispatch(changeLocation(e.target.value))}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              dispatch(changeAnimal(e.target.value));
            }}
            onBlur={(e) => {
              dispatch(changeAnimal(e.target.value));
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => dispatch(changeBreed(e.target.value))}
            onBlur={(e) => dispatch(changeBreed(e.target.value))}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => dispatch(changeTheme(e.target.value))}
            onBlur={(e) => dispatch(changeTheme(e.target.value))}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;


// This dispatching is so much nicer than it is with other API
// The useDispatch hook gives you back a dispatching 
// function so you can dispatch actions
// That's really it!


// This is the newer, hooks - based API for react - redux.
// This allows you to provide it a selector function that will pluck the bit of 
// state you need from Redux. Very clean, I quite like it. We'll see the older, 
// connect-based one here in a bit.

// You may wonder why we don't just do one useSelector call here, return the 
// whole state, and destructure that. Each hook is creating its own subscription 
// and react-redux internally uses the functions you provide to check to see if 
// your subscription changed. If the result of your selector function changes, 
// it'll notify React to kick off a re - render of this component.Hence it's 
// important that these subscription functions just grab the state that you care 
// about. Otherwise it will kick off needless re-renders any time any state in 
// your app changes.