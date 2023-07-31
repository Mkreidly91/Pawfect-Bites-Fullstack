<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function add(Request $request)
    {
        $productId = $request->input('product_id');
        $userId = $request->input('user_id');

        $favorite = new Favorite();
        $favorite->product_id = $productId;
        $favorite->user_id = $userId;
        $favorite->save();

        return response()->json([
            'message' => 'Product added to favorites successfully',
        ]);
    }
    public function remove(Request $request)
    {
        return response()->json([
            'data' => "hello",
        ]);

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

        $favorites = Favorite::where('user_id', $userId)->get();

        return response()->json([
            'data' => $favorites,
        ]);
    }
}