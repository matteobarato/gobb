<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Reservation;

function dbdate($date)
{
    return date('Y-m-d H:i:s', strtotime($date));
}

class ReservationController extends Controller
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

    public function get($reservation_id)
    {
      $reservation= Reservation::with(['clients','supplements','room'])->findOrFail($reservation_id);
      return response()->json(["reservation"=>$reservation]);
    }

    public function list($room_id)
    {
      $room= \App\Room::with(['reservations.room'])->findOrFail($room_id);
      return response()->json(["reservations"=>$room->reservations()->paginate(200)]);
    }
    public function ofRooms($room_ids,  Request $request)
    {
      $room_ids = explode(',', $room_ids);
      $reservations= \App\Reservation::with(['room'])->whereIn('room_id', $room_ids);

      if ($request->has('start') && $request->has('end'))
      {
        $since = $request->input('start');
        $until = $request->input('until');
        $reservations = $reservations->between($since, $until);
      }
      return response()->json(["reservations"=>$reservations->paginate(200)]);
    }

    public function startsToday()
    {
      $reservs =  Reservation::with(['clients','room'])->startsToday();
      return response()->json(["reservations"=>$reservs->paginate(200)]);
    }
    public function currents()
    {
      $reservs =  Reservation::with(['clients','room'])->current();
      return response()->json(["reservations"=>$reservs->paginate(200)]);
    }
    public function endsToday()
    {
      $reservs =  Reservation::with(['clients','room'])->finishedToday();
      return response()->json(["reservations"=>$reservs->paginate(200)]);
    }

    public function create($room_id, $reservation_id=NULL, Request $request)
    {
      if (!$reservation_id) $reservation = new Reservation;
      else $reservation= Reservation::with(['clients','supplements','room'])->findOrFail($reservation_id);

      $reservation->since = dbdate($request->input('since'));
      $reservation->until = dbdate($request->input('until'));
      $reservation->people_expected = $request->input('people_expected');
      $reservation->notes = $request->input('notes');
      $reservation->info_name = $request->input('info_name');
      $reservation->info_email = $request->input('info_email');
      $reservation->info_telephone = $request->input('info_telephone');
      $reservation->status = $request->input('status');
      $reservation->room_id = $request->input('room_id');
      $reservation->save();

      $room= \App\Room::with(['reservations','hotel'])->findOrFail($room_id);

      return response()->json(["room"=>$room, "reservation"=>$reservation]);
    }

    public function delete($room_id, $reservation_id, Request $request)
    {
      Reservation::destroy($room_id);
      return response()->json(["message"=>"Reservation $reservation_id deleted"]);
    }

}
