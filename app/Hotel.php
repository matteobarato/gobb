<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Hotel extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */

    public function rooms()
    {
        return $this->hasMany('App\Room');
    }
    public function users()
    {
        return $this->hasMany('App\User');
    }
    public function notifications()
    {
        return $this->hasMany('App\Notification')->where('type','0');
    }

}
