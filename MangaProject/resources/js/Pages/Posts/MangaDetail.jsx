import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "flowbite-react";
import LoadingScreen from '@/Components/Loading/LoadingScreen';

const BASE_URL = 'https://api.mangadex.org/manga';

function MangaDetail({ mangaId }) {
    const [mangaDetail, setMangaDetail] = useState(null);
    const [mangaDesc, setMangaDesc] = useState(null);

    useEffect(() => {
        const fetchMangaDetail = async () => {
            try {
                const resp = await axios.get(`${BASE_URL}/${mangaId}/feed`);
                setMangaDetail(resp.data);
            } catch (error) {
                console.error('Error fetching manga detail:', error);
            }
        };
        const fetchMangaDesc = async () => {
            try {
                const resp = await axios.get(`${BASE_URL}/${mangaId}`);
                setMangaDesc(resp.data);
            } catch (error){
                console.error('Error fetching manga detail:', error);
            }
        }

        fetchMangaDesc();
        fetchMangaDetail();
    }, [mangaId]);

    return (
        <div className='w-[100vw] overflow-hidden'>
            {mangaDesc && mangaDesc.data && mangaDesc.data.attributes? (
                <div key={mangaDesc.data.id} className='w-[80%] mb-[4%] overflow-hidden flex flex-row items-center justify-center mx-[10%]'>
                    <div className='flex flex-col gap-4'>
                        <h1 className="text-[40px] font-bold cursor-pointer">{mangaDesc.data.attributes.title?.en}</h1>
                        <p className="text-black text-[16px]">{mangaDesc.data.attributes.description?.en}</p>
                        <div>
                            <h1 className='text-[30px] font-bold'>Alternative Titles</h1>
                            <ul>
                                {mangaDesc.data.attributes.altTitles && mangaDesc.data.attributes.altTitles.map((altTitle, index) => (
                                    <li key={index} className='text-[15px]'>{Object.values(altTitle).join(", ")}</li>
                                ))}
                            </ul>
                        </div>
                        <a href="/"><Button color="blue">Back To Home</Button></a>
                    </div>
                    
                    {mangaDesc.data.relationships && mangaDesc.data.relationships.length > 0 && mangaDesc.data.relationships.map((relationship) => (
                        relationship.type === 'cover_art' ? (
                            <CoverImage key={relationship.id} coverArtId={relationship.id} mangaId={mangaDesc.data.id} />
                        ) : null
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <LoadingScreen />
                </div>
            )}
            {mangaDetail && mangaDetail.data && mangaDetail.data.length > 0 ? (
                <div className='flex flex-col w-[80%] mx-[10%] gap-4'>
                    {mangaDetail.data.map((chapter) => (
                        <div key={chapter.id} className=' shadow-lg cursor-pointer'>
                            <h1 className='text-[30px] font-bold'>  
                                <span>{chapter.attributes.title}</span>  
                            </h1>
                            <p>
                                <span>Ch. {chapter.attributes.chapter}</span>
                            </p>
                            <p>
                                <span>{chapter.attributes.translatedLanguage}</span>
                            </p>
                        </div>
                    ))}
                    {/* <pre>{JSON.stringify(mangaDetail, null, 2)}</pre> */}
                </div>
                
            ) : (
                <div className='flex items-center justify-center m-auto'>
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return coverFileName ? (
        <img src={`https://uploads.mangadex.org/covers/${mangaId}/${coverFileName}?t=${currentTime}.jpg`} alt="Manga Cover" className="w-[200px] h-auto"/>
    ) : (
        <div>Loading cover...</div>
    );
};

export default MangaDetail;
