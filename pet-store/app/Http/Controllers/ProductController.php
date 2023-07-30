<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getAll(Request $request, $productCategory = null, $userId = null)
    {
        // Get a query builder instance of the Product model with eager loading of category and favorites relationships
        $productsQuery = Product::with('category');

        // Apply filters based on the provided $productCategory and $userId
        if ($productCategory !== null) {
            $productsQuery->whereHas('category', function ($query) use ($productCategory) {
                $query->where('name', $productCategory);
            });
        }

        if ($userId !== null) {
            $productsQuery->whereHas('favorites', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            });
        }

        // Execute the query and retrieve the filtered products
        $products = $productsQuery->get();
        // Now you have a collection of products, each with its associated category and favorites
        return response()->json(['data' => $products]);
    }
}