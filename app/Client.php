<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Client extends Model
{
    use Authenticatable, Authorizable;

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
     public function reservations()
     {
         return $this->belongsToMany('App\Reservation');
     }
     public function reservation($id)
     {
         return $this->belongsToMany('App\Reservation')->where('id',$id);
     }
     public function images()
     {
         return $this->hasMany('App\Images');
     }

}
