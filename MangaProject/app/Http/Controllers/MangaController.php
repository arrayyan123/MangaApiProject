<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MangaController extends Controller
{
    protected $baseUrl;

    public function __construct()
    {
        $this->baseUrl = env('MANGADEX_API_URL');
    }

    public function getMangaDataFromMangadex(Request $request)
    {
        try {
            $title = $request->input('title');
            $cover = $request->input('cover');

            $response = Http::withHeaders([
                'User-Agent' => 'MyMangaApp/1.0',
            ])->get($this->baseUrl . '/manga', ['title' => $title, 'cover' => $cover]);

            return $response->json();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch manga data: ' . $e->getMessage()], 500);
        }
    }

    public function getCoverImage(Request $request, $coverArtId)
    {
        try {
            $response = Http::withHeaders([
                'User-Agent' => 'MyMangaApp/1.0',
            ])->get($this->baseUrl . '/cover/' . $coverArtId);
            $imageUrl = $response->json()['data']['attributes']['fileName'];
            return response()->json(['imageUrl' => $imageUrl]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch cover image: ' . $e->getMessage()], 500);
        }
    }

    public function getMangaChapters($mangaId)
    {
        try {
            $response = Http::withHeaders([
                'User-Agent' => 'MyMangaApp/1.0',
            ])->get($this->baseUrl . '/manga/' . $mangaId . '/feed');

            return $response->json();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch manga chapters: ' . $e->getMessage()], 500);
        }
    }
}
