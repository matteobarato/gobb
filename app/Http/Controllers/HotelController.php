<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Hotel;


class HotelController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function get($user_id,$hotel_id)
    {
      $hotel= Hotel::with(['rooms','users'])->findOrFail($hotel_id);
      return response()->json(["hotel"=>$hotel]);
    }

    public function create($user_id, $hotel_id=NULL, Request $request)
    {
      if (!$hotel_id) $hotel = new Hotel;
      else $hotel= Hotel::with(['rooms','users'])->findOrFail($hotel_id);;

      $hotel->name = $request->input('name');
      $hotel->email = $request->input('email');
      $hotel->telephone = $request->input('telephone');
      $hotel->address = $request->input('address');
      $hotel->city = $request->input('city');
      $hotel->zip = $request->input('zip');

      $hotel->save();

      $user= \App\User::findOrFail($user_id);
      $user->hotel_id = $hotel_id;
      $user->save();

      return response()->json(["hotel"=>$hotel]);
    }

    public function delete($user_id, $hotel_id, Request $request)
    {
      Hotel::destroy($hotel_id);
      user()->hotel_id= NULL;
      return response()->json(["message"=>"Hotel $hotel_id deleted"]);
    }


    //
}
