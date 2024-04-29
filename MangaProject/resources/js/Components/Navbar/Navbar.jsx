import IonIcon from '@reacticons/ionicons';
import React, { useState } from 'react';

function Navbar() {
  let Links =[
    {name:"HOME",link:"/"},
    {name:"FAVOURITE",link:"/"},
    {name:"LATEST",link:"/"},
    {name:"ABOUT US",link:"/"},
  ]
  let [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => {
      setListening(true);
    };
    recognition.onresult = event => {
      setSearchQuery(event.results[0][0].transcript);
    };
    recognition.onend = () => {
      setListening(false);
    };
    recognition.start();
  };

  const handleSearch = event => {
    event.preventDefault();
    // Perform search with searchQuery
    console.log("Search Query:", searchQuery);
  };

  return (
    <div className='shadow-md w-[90%] fixed top-0 left-0 md:mx-[65px] my-5 rounded-full mx-[34px] z-50'>
        <div className="md:flex bg-blue-400 items-center justify-between py-4 md:px-10 px-7 rounded-full">
            <div className='font-bold text-2xl cursor-pointer flex items-center text-gray-800 font-geostar'>
              <span className='text-3xl text-white mr-1 pt-2'>
                <IonIcon name='logo-ionic'></IonIcon>
              </span>
              MangaWeb
            </div>
            <div onClick={()=>setOpen(!open)} className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
              <IonIcon name={open ? 'close' : 'menu'}></IonIcon>
            </div>
            <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-blue-400 md:z-auto z-[-1] left-0
            w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in rounded-[40px] ${open ? 'top-20' : 'top-[-490px]'}`}>
                <div>
                    <form onSubmit={handleSearch} className="flex items-center max-w-lg mx-auto md:my-0 my-7">   
                        <label htmlFor="voice-search" className="sr-only">Search</label>
                        <div className="relative w-[400px]">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"/>
                                </svg>
                            </div>
                            <input type="text" id="voice-search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                            <button type="button" onClick={startListening} className="absolute inset-y-0 end-0 flex items-center pe-3">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"/>
                                </svg>
                            </button>
                        </div>
                        <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>Search
                        </button>
                    </form>
                </div>
                <li className="md:ml-8 mr-4 md:my-0 my-7 text-center">
                    <a href={Links[0].link}><button className="rounded-full px-5 py-1 bg-blue-700 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">{Links[0].name}</button></a>
                </li>
                {
                  Links.map((Link, index)=>(
                    <li key={Link.name} className={`md:ml-8 text-[16px] hover:text-gray-300 md:my-0 mr-0 my-7 text-white text-center ${index === 0 ? 'hidden' : 'block'}`}>
                      <a href={Link.link}>{Link.name}</a>
                    </li>
                  ))
                }
            </ul>
        </div>
    </div>
  )
}

export default Navbar;
