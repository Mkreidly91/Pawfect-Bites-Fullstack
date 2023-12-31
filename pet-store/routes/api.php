<?php

use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;

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
Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// cart
Route::prefix('cart')->group(function () {
    Route::get('/{userId}', [CartController::class, 'get']);
    Route::post('/add', [CartController::class, 'add']);
    Route::post('/delete', [CartController::class, 'delete']);

});

// Products
Route::get('/products/{category?}/{userId?}', [ProductController::class, 'get']);
Route::post('/add', [ProductController::class, 'add']);
Route::post('/updateProduct/{productId}', [ProductController::class, 'update']);
Route::post('/deleteProduct/{productId}', [ProductController::class, 'delete']);
Route::get('/getFromId/{productId}', [ProductController::class, 'getFromId']);

// Favs
Route::get('/favourites/get/{userId}', [FavoriteController::class, 'get']);
Route::post('/favourites/add', [FavoriteController::class, 'add']);
Route::post('/favourites/remove', [FavoriteController::class, 'remove']);