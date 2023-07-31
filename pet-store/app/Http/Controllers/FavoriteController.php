<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use App\Models\Product;

class FavoriteController extends Controller
{
    public function add(Request $request)
    {
        try {


            $productId = $request->input('product_id');
            $userId = $request->input('user_id');

            $favorite = new Favorite();
            $favorite->product_id = $productId;
            $favorite->user_id = $userId;
            $favorite->save();

            return response()->json([
                'message' => 'Product added to favorites successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Product already in favorites',
            ]);
        }
    }
    public function remove(Request $request)
    {
        $productId = $request->input('product_id');
        $userId = $request->input('user_id');

        $favorite = $favorite = $favorite = Favorite::where('product_id', $productId)
            ->where('user_id', $userId);

        if ($favorite) {
            $favorite->delete();
            return response()->json([
                'message' => 'successfully removed favourite',
            ]);
        }

        return response()->json([
            'error' => 'Favorite not found',
        ]);
    }

    public function get(Request $request, $userId)
    {
        $favoriteProductIds = Favorite::where('user_id', $userId)->pluck('product_id');
        $favoriteProducts = Product::whereIn('id', $favoriteProductIds)->get();
        return response()->json([
            'data' => $favoriteProducts,
        ]);
    }
}