<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getAll($category = null, $userId = null)
    {
        $productsQuery = Product::with('category');
        // Apply filters based on the provided $category and $userId
        if ($category !== null) {
            $categoryId = intval($category);
            $productsQuery->where('category_id', $categoryId);
        }

        if ($userId !== null) {
            $productsQuery->whereHas('favorites', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            });
        }

        // Execute the query and retrieve the filtered products
        $products = $productsQuery->get();
        // Now you have a collection of products, each with its associated category and favorites
        return response()->json([
            'data' => $products,
            'category' => $category
        ]);
    }
}