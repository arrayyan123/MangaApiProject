<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return Inertia::render('Posts/Home');
    }

    public function mangadetail($mangaId)
    {
        return Inertia::render('Posts/MangaDetail', ['mangaId' => $mangaId]);
    }
}
