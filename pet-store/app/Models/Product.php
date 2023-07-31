<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'title',
        'description',
        'price',
        'category_id',
        'image',
    ];

    // Define the relationship with the Category model
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Define the relationship with favorites
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    // Define the relationship with cart items
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }
    use HasFactory;
}