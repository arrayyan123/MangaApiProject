<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;

use Inertia\Inertia;
use App\Http\Controllers\MangaController;

Route::get('/', [PostController::class, 'index'])->name('home');
Route::get('/mangadetail', [PostController::class, 'mangadetail'])->name('mangadetail');
Route::get('/api/manga/{mangaId}', [MangaController::class, 'getMangaChapters']);
Route::get('/api/cover/{coverArtId}', [MangaController::class, 'getCoverImage']);
Route::get('/api/manga/{mangaId}', [MangaController::class, 'getMangaDetail']);
Route::get('/api/mangadex-slider' , function () {
    try {
        $title = request('title');
        $cover = request('cover');
        // $limit = request('limit') ?? 10; 
        $baseUrl = env('MANGADEX_API_URL');

        $response = Http::get("$baseUrl/manga", [
            'title' => $title,
            'cover' => $cover,
            // 'limit' => $limit, 
        ]);

        if ($response->successful()) {
            return $response->json();
        } else {
            return response()->json(['error' => 'Failed to fetch manga data'], $response->status());
        }
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to fetch manga data: ' . $e->getMessage()], 500);
    }
});
Route::get('/api/mangadex-proxy', function () {
    try {
        $title = request('title');
        $cover = request('cover');
        // $limit = request('limit') ?? 100; 
        $baseUrl = env('MANGADEX_API_URL');

        $response = Http::get("$baseUrl/manga", [
            'title' => $title,
            'cover' => $cover,
            // 'limit' => $limit, 
        ]);

        if ($response->successful()) {
            return $response->json();
        } else {
            return response()->json(['error' => 'Failed to fetch manga data'], $response->status());
        }
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to fetch manga data: ' . $e->getMessage()], 500);
    }
});


require __DIR__.'/auth.php';
