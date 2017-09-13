<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\User;
use \Firebase\JWT\JWT;


class UserController extends Controller
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

    public function show(){
      return 'show';
    }
    public function get($user_id){
      $key = "example_key";
$token = array(
    "iss" => "https://securetoken.google.com/gobb-3cf1d",
    "aud" => "gobb-3cf1d",
    "iat" => 1356999524,
    "nbf" => 1357000000
);

/**
 * IMPORTANT:
 * You must specify supported algorithms for your application. See
 * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
 * for a list of spec-compliant algorithms.
 */
$jwt = JWT::encode($token, $key);
$decoded = JWT::decode($jwt, $key, array('HS256'));

print_r($decoded);

/*
 NOTE: This will now be an object instead of an associative array. To get
 an associative array, you will need to cast it as such:
*/

$decoded_array = (array) $decoded;

/**
 * You can add a leeway to account for when there is a clock skew times between
 * the signing and verifying servers. It is recommended that this leeway should
 * not be bigger than a few minutes.
 *
 * Source: http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#nbfDef
 */
JWT::$leeway = 60; // $leeway in seconds
$decoded = JWT::decode($jwt, $key, array('HS256'));

/*
 NOTE: This will now be an object instead of an associative array. To get
 an associative array, you will need to cast it as such:
*/

$decoded_array = (array) $decoded;
echo "Decode:\n" . print_r($decoded_array, true) . "\n";
      /*$user = User::with(['hotel'])->findOrFail($user_id);
      return response()->json(["user"=>$user, "hotel"=>$user->hotel, "rooms"=>($user->hotel)? $user->hotel->rooms: NULL]);*/
    }

    //
}
