import axios from 'axios';
import React, { useState, useEffect } from 'react';

const BASE_URL = 'http://127.0.0.1:8000/api/mangadex-proxy';

function Home() {
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

    return (
        <>
            <div>
                <h1>Manga Testing:</h1>
                <div>
                    {mangaData && mangaData.data && mangaData.data.map((manga) => (
                        <div key={manga.id}>
                            <h1 className="text-[50px]">{manga.attributes.title?.en}</h1>
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

    // Memperbarui waktu saat ini setiap detik
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000); // Interval setiap 1 detik

        return () => clearInterval(interval);
    }, []);

    return coverFileName ? (
        <img src={`https://uploads.mangadex.org/covers/${mangaId}/${coverFileName}?t=${currentTime}.jpg`} alt="Manga Cover" />
    ) : (
        <div>Loading cover...</div>
    );
};

export default Home;
