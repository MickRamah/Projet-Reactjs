import React, {useEffect, useState} from "react";
import axios from "axios";
import Card from "./Card";

const Countries = () => {
    const   [data, set_data] = useState([]);
    const   [range_value, set_range_value] = useState(36);
    const   [selected_radio, set_selected_radio] = useState("");
    const radios = ["Africa", "America", "Asia","Europe", "Oceania"];

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((res) => set_data(res.data));
    }, [])

    return (
        <div className = "countries">
            <ul className="radio-container">
                <input 
                    type="range" 
                    min = "1" 
                    max = "250" 
                    defaultValue={range_value} 
                    onChange = {(e) => set_range_value(e.target.value)}
                />
                {radios.map((continent) => (
                    <li>
                        <input
                            type="radio" 
                            id={continent} 
                            name = "continent_radio"
                            checked = {continent === selected_radio} 
                            onChange = {(e) => set_selected_radio(e.target.id)}
                        />
                        <label htmlFor={continent}>{continent}</label>
                    </li>
                ))}
            </ul>
            {selected_radio && (<button onClick={() => set_selected_radio("")}>Annuler les recherches</button>)}
            <ul>
                {data
                    .filter((country) => country.continents[0].includes(selected_radio))
                    .sort((a, b) => b.population - a.population)
                    .slice(0, range_value)
                    .map((country, index) => (
                    <Card key = {index} country = {country} />
                ))}
            </ul>
        </div>
    );
}

export default Countries;