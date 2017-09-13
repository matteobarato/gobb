<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Reservation extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */

    public function room()
    {
        return $this->belongsTo('App\Room');
    }
    public function supplements()
    {
        return $this->hasMany('App\Supplement');
    }
    public function clients()
    {
        return $this->belongsToMany('App\Client');
    }


    public function scopeNext($query){  // ritorna la prossima prenotazione rispetto a oggi
      return $query->whereDate('since', '>=', timestamp());
    }
    public function scopeFuture($query){ // ritorna tutte le prossime prenotazioni
      return $query->whereDate('since', '>', timestamp());
    }
    public function scopePast($query){ // ritorna tutte prenotazioni passate
      return $query->whereDate('until', '<', timestamp());
    }
    public function scopeCurrent($query){ // ritorna tutte prenotazioni in corso rispetto a ora
      return $query->whereDate('since', '<=', timestamp())->whereDate('until', '>=', timestamp());
    }
    public function scopeBetween($query, $since, $until){ // ritorna tutte prenotazioni in corso tra *
      return $query->where(function($query) use ($since,$until) {
         $query->whereDate('since', '<=', $since)->whereDate('until','>=',$since);
      })->orWhere(function($query) use ($since,$until) {
         $query->whereDate('since', '<=', $until)->whereDate('until','>=',$until);
      })->orWhere(function($query) use ($since,$until) {
         $query->whereDate('since', '>=', $since)->whereDate('until','<=',$until);
      })->orWhere(function($query) use ($since,$until) {
         $query->whereDate('since', '<=', $since)->whereDate('until','>=',$until);
      });
    }
    public function scopeStartsToday($query){ // ritorna tutte prenotazioni in corso tra *
      return $query->whereDate('since', '>=', beginToday())->whereDate('since', '<=', beginTomorrow());
    }
    public function scopeFinishedToday($query){ // ritorna tutte prenotazioni in corso tra *
      return $query->whereDate('until', '>=', beginToday())->whereDate('until', '<=', beginTomorrow());
    }
}
