<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Supplement;

class SupplementController extends Controller
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

    public function get($reservation_id, $supplement_id)
    {
      $supplement= Supplement::with(['reservation'])->findOrFail($supplement_id);
      return response()->json(["supplement"=>$supplement]);
    }

    public function list($reservation_id)
    {
      $reservation= \App\Reservation::with(['supplements','room'])->findOrFail($reservation_id);
      return response()->json(["reservation"=>$reservation,"supplements"=>$reservation->supplements]);
    }

    public function create($reservation_id, $supplement_id=NULL, Request $request)
    {
      if (!$supplement_id) $supplement = new Supplement;
      else $supplement= Supplement::with(['reservation'])->findOrFail($supplement_id);

      $supplement->price = $request->input('price');
      $supplement->date = $request->input('date');
      $supplement->type = $request->input('type');
      $supplement->name = $request->input('name');
      $supplement->reservation_id = $reservation_id;
      $supplement->save();

      $reservation= \App\Reservation::with(['supplements','room'])->findOrFail($reservation_id);

      return response()->json(["reservation"=>$reservation, "supplement"=>$supplement]);
    }

    public function delete($reservation_id, $supplement_id, Request $request)
    {
      Supplement::destroy($supplement_id);
      return response()->json(["message"=>"Supplement $supplement_id deleted"]);
    }

    //
}
