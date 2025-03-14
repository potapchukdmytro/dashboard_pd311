import axios from "axios";
import {useEffect, useState} from "react";
import {Box, CircularProgress} from "@mui/material";

const ManufacturesPage = () => {
    const [manufactures, setManufactures] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchManufactures = async () => {
        setIsLoaded(false);
        const response = await axios.get("https://localhost:7223/api/manufacture/list");
        const list = response.data.payload;
        setManufactures(list);
        setIsLoaded(true);
    }

    useEffect(() => {
        fetchManufactures()
            .catch(error => console.log(error));
    }, [])

    return (
        <Box>
            <h1>Manufactures</h1>
            {
                isLoaded ?
                    manufactures.map((item) => (
                        <Box key={item.id}>
                            <img width="400px" alt={item.name} src={`https://localhost:7223/images/${item.image}`}/>
                            <h1>{item.name}</h1>
                            <h2>{item.founder}</h2>
                            <h2>{item.director}</h2>
                            <p>{item.description}</p>
                        </Box>
                    ))
                    : <CircularProgress/>
            }
        </Box>

    )
}

export default ManufacturesPage;