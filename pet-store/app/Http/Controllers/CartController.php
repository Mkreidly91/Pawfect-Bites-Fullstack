<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\User;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function get(Request $request, $userId)
    {
        $user = User::find($userId);
        $cart = $user->cart;
        $cartItems = $cart->cartItems()->with('product')->get();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        return response()->json([
            "items" => $cartItems
        ]);


    }

    public function add(Request $request)
    {
        $userId = $request->input('user_id');
        $productId = $request->input('product_id');

        $user = User::find($userId);
        $cart = $user->cart;

        $cartItem = new CartItem([
            'cart_id' => $cart->id,
            'product_id' => $productId,

        ]);
        $cartItem->save();

        return response()->json([
            "message" => "success"
        ]);


    }

    public function delete(Request $request)
    {
        $userId = $request->input('user_id');
        $productId = $request->input('product_id');
        $user = User::find($userId);
        $cart = $user->cart;



        if ($cart) {
            // If the cart exists, delete the cart item corresponding to the product
            $cart->cartItems()
                ->where('product_id', $productId)->delete();


            // Return a response indicating the product was removed from the cart
            return response()->json(['message' => 'Success']);
        }

        // Return a response indicating the user's cart was not found
        return response()->json(['message' => 'Cart not found for the user']);
    }
}