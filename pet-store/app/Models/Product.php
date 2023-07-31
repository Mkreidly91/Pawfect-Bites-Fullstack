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


    public function category()
    {
        return $this->belongsTo(Category::class);
    }


    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }


    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }
    use HasFactory;
}