import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BASE_URL = 'http://localhost:8000/api'; // Adjust this base URL according to your backend configuration

function MangaDetail() {
    const { mangaId } = useParams();
    const [mangaDetail, setMangaDetail] = useState(null);
    const [latestManga, setLatestManga] = useState(null);

    useEffect(() => {
        const fetchMangaDetail = async () => {
            try {
                const resp = await axios.get(`${BASE_URL}/manga/${mangaId}/feed`); // Fetch manga chapters using the correct route
                console.log('Response from Manga Detail API:', resp.data);
                setMangaDetail(resp.data);
            } catch (error) {
                console.error('Error fetching manga detail:', error);
            }
        };

        fetchMangaDetail();
    }, [mangaId]);

    useEffect(() => {
        const fetchLatestManga = async () => {
            try {
                const resp = await axios.get(`${BASE_URL}/mangadex-proxy`, {
                    params: {
                        mangaId: mangaId // Pass mangaId as a query parameter to fetch latest manga
                    }
                });
                console.log('Response from Latest Manga Feed API:', resp.data);
                setLatestManga(resp.data);
            } catch (error) {
                console.error('Error fetching latest manga:', error);
            }
        };

        fetchLatestManga();
    }, [mangaId]); // Ensure mangaId dependency

    return (
        <div>
            {mangaDetail && (
                <>
                    <h1>{mangaDetail.title}</h1>
                    <h2>Chapters:</h2>
                    <pre>{JSON.stringify(mangaDetail.chapters, null, 2)}</pre>
                </>
            )}
            {latestManga && (
                <>
                    <h2>Latest Manga Feed:</h2>
                    <pre>{JSON.stringify(latestManga, null, 2)}</pre>
                </>
            )}
        </div>
    );
}

export default MangaDetail;
