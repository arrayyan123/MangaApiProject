import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MangaDetail from '../../Pages/Posts/MangaDetail';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Fade } from 'react-awesome-reveal';

const BASE_URL = 'http://localhost:8000/api/mangadex-slider';

function Carousel() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        vertical: false,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 200
      };
    const [mangaData, setMangaData] = useState(null);
    const [selectedMangaId, setSelectedMangaId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(`${BASE_URL}`, {
                    headers: {
                        'User-Agent': 'MyMangaApp/1.0'
                    }
                });
                setMangaData(resp.data);
            } catch (error) {
                console.error('Error fetching manga data:', error);
            }
        };

        fetchData();
    }, []);

    const handleMangaClick = (mangaId) => {
        setSelectedMangaId(mangaId);    
    };

    return (
        <div className='w-100'>
                {selectedMangaId ? (
                    <MangaDetail mangaId={selectedMangaId} />
                ) : (
                    <div className='overflow-hidden'>
                        <Fade>
                            <Slider {...settings} className='shadow-lg'>
                                {mangaData && mangaData.data && mangaData.data.map((manga) => (
                                    <div key={manga.id} className=' w-[420px] relative overflow-hidden flex flex-col items-center justify-center'>
                                        <div className="absolute top-[40%] left-0 right-0 z-10 text-center"> {/* Added a div for background overlay */}
                                            <h1 className="text-[40px] font-extrabold">{manga.attributes.title?.en}</h1>
                                            <p className="text-black text-[12px]">{manga.attributes.description?.en}</p>
                                        </div>
                                        {manga.relationships &&
                                            manga.relationships.length > 0 &&
                                            manga.relationships.map((relationship) =>
                                                relationship.type === 'cover_art' ? (
                                                    <CoverImage key={relationship.id} coverArtId={relationship.id} mangaId={manga.id} />
                                            ) : null
                                        )}
                                    </div>
                                ))}
                            </Slider>
                        </Fade>
                    </div>
                )}
        </div>
    );
}

const CoverImage = ({ coverArtId, mangaId }) => {
    const [coverFileName, setCoverFileName] = useState(null);
    const [currentTime, setCurrentTime] = useState(Date.now()); 

    useEffect(() => {
        const fetchCoverFileName = async () => {
            try {
                const coverResponse = await axios.get(`http://localhost:8000/api/cover/${coverArtId}`, {
                    headers: {
                        'User-Agent': 'MyMangaApp/1.0'
                    }
                });
                const imageUrl = coverResponse.data.imageUrl;
                setCoverFileName(imageUrl);
            } catch (error) {
                console.error('Error fetching cover data:', error);
            }
        };

        fetchCoverFileName();
    }, [coverArtId]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return coverFileName ? (
        <div className='relative'>
            <div className="absolute inset-0 bg-blue-400 bg-opacity-50"></div>
            <img src={`https://uploads.mangadex.org/covers/${mangaId}/${coverFileName}?t=${currentTime}.jpg`} alt="Manga Cover" className="w-[1920px] h-[100vh] object-cover object-center blur " />
        </div>
        
    ) : (
        <div>Loading cover...</div>
    );
};

export default Carousel;
