import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = 'http://127.0.0.1:8000/api/mangadex-proxy';

function HomeMain() {
    const [mangaData, setMangaData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(BASE_URL, {
                    headers: {
                        'User-Agent': 'MyMangaApp/1.0'
                    }
                });
                console.log('Response from API:', resp.data);
                setMangaData(resp.data);
            } catch (error) {
                console.error('Error fetching manga data:', error);
            }
        };

        fetchData();
    }, []);

    const handleMangaClick = (mangaId) => {
        const url = `/mangadetail/${mangaId}/feed`;
        console.log('Clicked manga URL:', url);
        window.location.href = url;
    };

    return (
        <>
            <div className='mt-[100px]'>
                <div className='grid md:grid-cols-3 grid-cols-1 m-10 gap-4'>
                    {mangaData && mangaData.data && mangaData.data.map((manga) => (
                        <div key={manga.id} className='shadow-lg w-[420px] overflow-hidden'>
                            <h1 className="text-[40px]" onClick={() => handleMangaClick(manga.id)}>{manga.attributes.title?.en}</h1>
                            <p className="text-black">{manga.attributes.description?.en}</p>
                            {manga.relationships &&
                                manga.relationships.length > 0 &&
                                manga.relationships.map((relationship) =>
                                    relationship.type === 'cover_art' ? (
                                        <CoverImage key={relationship.id} coverArtId={relationship.id} mangaId={manga.id} />
                                    ) : null
                                )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

const CoverImage = ({ coverArtId, mangaId }) => {
    const [coverFileName, setCoverFileName] = useState(null);
    const [currentTime, setCurrentTime] = useState(Date.now()); 

    useEffect(() => {
        const fetchCoverFileName = async () => {
            try {
                const coverResponse = await axios.get(`http://127.0.0.1:8000/api/cover/${coverArtId}`, {
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

    // Update current time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000); // Interval every 1 second

        return () => clearInterval(interval);
    }, []);

    return coverFileName ? (
        <img src={`https://uploads.mangadex.org/covers/${mangaId}/${coverFileName}?t=${currentTime}.jpg`} alt="Manga Cover" className="w-[200px] h-auto"/>
    ) : (
        <div>Loading cover...</div>
    );
};

export default HomeMain;
