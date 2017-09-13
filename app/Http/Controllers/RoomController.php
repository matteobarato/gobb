<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Room;

class RoomController extends Controller
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

    public function get($room_id)
    {
      $room= Room::with(['reservations','hotel'])->findOrFail($room_id);
      return response()->json(["room"=>$room]);
    }

    public function search(Request $request)
    {
      $rooms = Room::orderBy('id','asc');
      if($request->has('name')){
        $rooms = $rooms->where('name', 'like', '%'.$request->input('name').'%');
      }
      $rooms = $rooms->paginate(50);
      return response()->json(["rooms"=>$rooms]);

    }

    public function list($hotel_id)
    {
      $hotel= \App\Hotel::with(['rooms','users'])->findOrFail($hotel_id);
      return response()->json(["hotel"=>$hotel,"rooms"=>$hotel->rooms]);
    }

    public function create($hotel_id, $room_id=NULL, Request $request)
    {
      if (!$room_id) $room = new Room;
      else $room= Room::with(['reservations','hotel'])->findOrFail($room_id);

      $room->name = $request->input('name');
      $room->max_persons = $request->input('max_persons');
      $room->price = $request->input('price');
      $room->floor = $request->input('floor');
      $room->type = $request->input('type');
      $room->hotel_id = $hotel_id;
      $room->save();

      $hotel= \App\Hotel::with(['rooms','users'])->findOrFail($hotel_id);

      return response()->json(["hotel"=>$hotel, "room"=>$room]);
    }

    public function delete($hotel_id, $room_id, Request $request)
    {
      Room::destroy($room_id);
      return response()->json(["message"=>"Room $room_id deleted"]);
    }

    public function available($room_id, Request $request)
    {
      $room = Room::findOrFail($room_id);
      $available = ($room->isAvailable($request->input('since'), $request->input('until'))) ? true : false;
      return response()->json(["available"=>$available, "room"=>$room]);
    }
    public function currentReservation($room_id, Request $request)
    {
      $room = Room::findOrFail($room_id);
      $current = $room->reservations()->current()->first();
      return response()->json(["reservation"=>["current"=>$current], "room"=>$room]);
    }
    public function listReservation($room_id, Request $request)
    {
      $room = Room::findOrFail($room_id);
      $current = $room->reservations()->current()->first();
      $future = $room->reservations()->future()->limit(10)->get();
      $past = $room->reservations()->past()->limit(10)->get();
      $next = $room->reservations()->next()->first();
      return response()->json(["reservation"=>["current"=>$current,"next"=>$next,"future"=>$future,"past"=>$past], "room"=>$room]);
    }


    //
}
