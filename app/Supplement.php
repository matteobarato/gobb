<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Supplement extends Model
{

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */

     public function reservation()
     {
         return $this->belongsTo('App\Reservation');
     }
}
