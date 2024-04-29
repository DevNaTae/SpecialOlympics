<?php

use App\Http\Controllers\EatsController;
use App\Http\Controllers\SportmanController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login',[UserController::class, 'login'])->middleware('guest:sanctum');

Route::get('/data_qr',[UserController::class,'dataqr']);
Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout',[UserController::class,'logout']);
    Route::get('/get_session',[UserController::class,'get_session']);
});

//Ruta solo para repartidor
Route::middleware('auth:sanctum','role:Repartidor')->group(function(){
    Route::post('/sportman/{deportista}',[EatsController::class,'index']);
});

Route::middleware('auth:sanctum','role:Administrador')->prefix('dashboard')->group(function(){
    Route::resource('sportman', SportmanController::class);
});
