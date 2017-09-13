<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Room extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */

    public function hotel()
    {
        return $this->belongsTo('App\Hotel');
    }
    public function reservations()
    {
        return $this->hasMany('App\Reservation');
    }
    public function getAvailableAttribute($value)
    {
        return $this->isAvailable();
    }
    public function getCurrentReservationAttribute($value)
    {
        return $this->reservations()->current()->first();
    }
    public function getNextReservationAttribute($value)
    {
        return $this->reservations()->next()->first();
    }

    public function isAvailable($since= null, $until=null)
    {
        if (!$since || !$until) {
            $since=timestamp();
            $until = beginTomorrow();
        }
        return $this->reservation()->between($since, $until)->count() > 0;
    }
}
