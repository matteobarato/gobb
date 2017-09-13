<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'uid',
    ];

    public function hotel()
    {
        return $this->belongsTo('App\Hotel');
    }
    public function rule()
    {
        return $this->hasOne('App\Rule');
    }
    public function notifications()
    {
        return $this->hasMany('App\Notification')->where('type','1');
    }

}
