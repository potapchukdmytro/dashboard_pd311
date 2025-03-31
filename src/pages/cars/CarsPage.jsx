import {Box, Pagination, Typography} from "@mui/material";
import Carousel from 'react-img-carousel';
import axios from "axios";
import {useEffect, useState} from "react";
require('react-img-carousel/lib/carousel.css');

const CarPage = () => {
    const [cars, setCars] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 3
    });
    const [pageCount, setPageCount] = useState(1);

    const imagesUrl = "https://localhost:7223/images/";

    const fetchCars = async () => {
        const response = await axios.get(`https://localhost:7223/api/car/list?page=${pagination.page}&pageSize=${pagination.pageSize}`);
        if (response.status === 200) {
            const data = response.data;
            setCars(data.payload.cars);
            setPageCount(data.payload.pageCount);
        }
    }

    const changePageHandler = (event, value) => {
        setPagination({...pagination, page: value});
    }

    useEffect(() => {
            fetchCars()
                .catch((error) => { console.log(error) });
    }, [pagination.page]);

    return (
        <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
            {
                cars.map((car) => (
                    <Box key={car.id}>
                        <Typography variant="h4">{`${car.brand} ${car.model} ${car.year}`}</Typography>
                        <Typography varian="p">Ціна: {car.price}</Typography>
                        <Typography varian="p">Колір: {car.color}</Typography>
                        <Typography varian="p">Коробка: {car.gearbox}</Typography>
                        <Box>
                            <Carousel viewportWidth="600px" cellPadding={ 5 }>
                                {
                                    car.images.map((img, index) => (
                                        <img key={index} alt={car.model} src={`${imagesUrl}${img}`} />
                                    ))
                                }
                            </Carousel>
                        </Box>
                    </Box>
                ))
            }
            <Pagination count={pageCount} page={pagination.page} onChange={changePageHandler} />
        </Box>
    );
}

export default CarPage;