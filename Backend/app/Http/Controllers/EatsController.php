<?php

namespace App\Http\Controllers;

use App\Models\Deportista;
use Illuminate\Http\Request;

class EatsController extends Controller
{
    public function index(Deportista $deportista)
    {
        return response()->json(['deportista'=>$deportista]);
    }
    public function eats(Deportista $deportista)
    {

    }
}
