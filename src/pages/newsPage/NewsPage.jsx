import {useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import axios from "axios";

const NewsPage = () => {
    const [news, setNews] = useState({articles: [], totalResults: 0});

    const apiKey = "";
    const searchParam = "ukraine";
    const lang = "uk";
    const pageSize = 20;
    const url = `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${searchParam}&language=${lang}&pageSize=${pageSize}`;

    // useEffect(() => {
    //     axios.get(url)
    //         .then(response => {
    //             setNews(response.data);
    //         })
    //         .catch(error => {
    //             console.log();
    //         });
    // }, []);

    const newsRequest = async () => {
        const response = await axios.get(url);
        setNews(response.data);
    }

    useEffect(() => {
        newsRequest();
    }, [])

    return (
        <>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px", marginTop: "20px" }}>
                {
                    news.articles.map((article) => (
                        <Grid size={3}>
                            <Card sx={{maxWidth: 345}}>
                                <CardMedia
                                    sx={{height: 140}}
                                    image={article.urlToImage}
                                    title={article.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {article.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                        {article.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </div>
        </>
    )
}

export default NewsPage;