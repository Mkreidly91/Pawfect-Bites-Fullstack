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

    public function add(Request $request)
    {
        $title = $request->input("title");
        $description = $request->input("description");
        $price = $request->input(intval("price"));
        $img = $request->input("img");
        $category = $request->input(intval("category_id"));

        $product = new Product();

        // Check if the field exists in the request before assigning the value


        $product->title = $title;
        $product->description = $description;
        $product->price = $price;
        $product->img = $img;
        $product->category_id = $category;

        $product->save();

        return response()->json([
            'message' => 'Product added successfully'
        ]);

        $product->save();

        return response()->json([
            'message' => 'Product added successfully'
        ]);

    }

    public function update(Request $request, $productId)
    {
        // Validate the input data (you can add more validation rules as needed)
        // $request->validate([
        //     'title' => 'required|string|max:255',
        //     'description' => 'required|string',
        //     'price' => 'required|numeric',
        //     'img' => 'required|string',
        //     'category_id' => 'required|integer',
        // ]);

        // if ($request->errors()) {
        //     return response()->json([
        //         "errors" => $request->errors()
        //     ]);
        // }

        // Find the product by its ID
        $product = Product::find($productId);

        // Check if the product exists
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Retrieve the input values from the request
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
            $product->img = $img;

        }

        if ($category) {
            $product->category_id = $category;
        }

        // Save the updated product to the database
        $product->save();

        // Return a response indicating success
        return response()->json([
            'message' => 'Product updated successfully',
        ]);
    }


    public function delete($productId)
    {
        // Find the product by its ID
        $product = Product::find($productId);

        // Check if the product exists
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Delete the product
        $product->delete();

        // Return a response indicating success
        return response()->json([
            'message' => 'Product deleted successfully',
        ]);
    }
}