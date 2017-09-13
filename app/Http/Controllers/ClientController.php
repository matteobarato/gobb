<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Client;

class ClientController extends Controller
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

    public function get($client_id)
    {
        $client= Client::with(['reservations'])->findOrFail($client_id);
        return response()->json(["client"=>$client]);
    }

    public function search(Request $request)
    {
        $clients = Client::orderBy('id', 'asc');
        if ($request->has('name')) {
            $clients = $clients->where('name', 'like', '%'.$request->input('name').'%');
        }
        if ($request->has('surname')) {
            $clients = $clients->where('surname', 'like', '%'.$request->input('surname').'%');
        }
        if ($request->has('id_code')) {
            $clients = $clients->where('id_code', 'like', '%'.$request->input('id_code').'%');
        }
        $clients = $clients->paginate(50);
        return response()->json(["clients"=>$clients]);
    }

    public function list($reservation_id)
    {
        $reservation= \App\Reservation::with(['clients','room'])->findOrFail($reservation_id);
        return response()->json(["reservation"=>$reservation,"clients"=>$reservation->clients]);
    }
    public function all($reservation_id)
    {
        $clients= Client::get();
        return response()->json(["clients"=>$clients]);
    }

    public function create($hotel_id, $client_id=null, Request $request)
    {
        if (!$client_id) {
            $client = new Client;
        } else {
            $client= Client::findOrFail($client_id);
        }

        $client->surname = $request->input('surname');
        $client->name = $request->input('name');
        $client->address = $request->input('address');
        $client->email = $request->input('email');
        $client->telephone = $request->input('telephone');
        $client->birthdate = $request->input('birthdate');
        $client->nationality = $request->input('nationality');
        $client->birthplace = $request->input('birthplace');
        $client->id_type = $request->input('id_type');
        $client->id_number = $request->input('id_code');
        $client->id_issue_place = $request->input('id_issue_place');
        $client->save();

        return response()->json(["client"=>$client]);
    }

    public function add($reservation_id, $client_id)
    {
        $client= Client::findOrFail($client_id);

        $client->reservations()->attach($reservation_id);

        $reservation= \App\Reservation::with(['clients','room'])->findOrFail($reservation_id);

        return response()->json(["reservations"=>$reservation, "client"=>$client]);
    }

    public function remove($reservation_id, $client_id)
    {
        $client= Client::findOrFail($client_id);

        $client->reservations()->detach($reservation_id);

        $reservation= \App\Reservation::with(['clients','room'])->findOrFail($reservation_id);

        return response()->json(["reservations"=>$reservation, "client"=>$client]);
    }

    public function delete($client_id)
    {
        Client::destroy($client_id);
        return response()->json(["message"=>"Client $client_id deleted"]);
    }

    //
}
