<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function get($category = null, $userId = null)
    {
        $productsQuery = Product::with('category');

        if ($category !== null) {
            $categoryId = intval($category);
            $productsQuery->where('category_id', $categoryId);
        }

        if ($userId !== null) {
            $productsQuery->whereHas('favorites', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            });
        }

        $products = $productsQuery->get();

        return response()->json([
            'data' => $products
        ]);
    }
    public function getFromId($id = null)
    {

        if ($id === null) {
            return response()->json([
                'error' => 'Product ID not provided'
            ], 400);
        }
        $product = Product::find($id);

        if ($product === null) {
            return response()->json([
                'error' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'data' => $product
        ]);
    }

    public function add(Request $request)
    {

        $title = $request->input("title");
        $description = $request->input("description");
        $price = $request->input("price");
        $img = $request->input("img");
        $category = $request->input("category_id");

        $product = new Product();

        $product->title = $title;
        $product->description = $description;
        $product->price = $price;
        $product->image = $img;
        $product->category_id = $category;

        $product->save();

        return response()->json([
            'message' => 'Product added successfully'
        ]);

    }

    public function update(Request $request, $productId)
    {
        $product = Product::find($productId);


        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }


        $title = $request->input("title");
        $description = $request->input("description");
        $price = $request->input("price");
        $img = $request->input("img");
        $category = $request->input("category_id");

        if ($title) {
            $product->title = $title;
        }

        if ($description) {
            $product->description = $description;
        }

        if ($price) {
            $product->price = $price;
        }

        if ($img) {
            $product->image = $img;
        }

        if ($category) {
            $product->category_id = $category;
        }


        $product->save();
        return response()->json([
            'message' => 'Product updated successfully',
        ]);
    }


    public function delete($productId)
    {


        $product = Product::find($productId);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully',
        ]);
    }
}