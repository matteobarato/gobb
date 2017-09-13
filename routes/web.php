<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', 'UserController@show');
$app->get('/user/{user_id}/edit/rule', 'UserController@show');
$app->get('/user/{user_id}', 'UserController@get');

$app->get('/user/{user_id}/notification/create', 'UserController@show');
$app->get('/user/{user_id}/notification/{notification_id}/read/{read}', 'UserController@show');
$app->get('/user/{user_id}/notification/{notification_id}/delete', 'UserController@show');
$app->get('/user/{user_id}/notification/{notification_id}', 'UserController@show');
$app->get('/user/{user_id}/notifications', 'UserController@show');


$app->post('/user/{user_id}/hotel/create', 'HotelController@create');
$app->post('/user/{user_id}/hotel/{hotel_id}/edit', 'HotelController@create');
$app->get('/user/{user_id}/hotel/{hotel_id}', 'HotelController@get');

$app->post('/hotel/{hotel_id}/room/create', 'RoomController@create');
$app->post('/hotel/{hotel_id}/room/{room_id}/edit', 'RoomController@create');
$app->get('/hotel/{hotel_id}/room/{room_id}/delete', 'RoomController@delete');
$app->get('/hotel/{hotel_id}/rooms/search', 'RoomController@search');
$app->get('/hotel/{hotel_id}/rooms', 'RoomController@list');

$app->get('/client/{client_id}', 'ClientController@get');
$app->get('/hotel/{hotel_id}/client/{client_id}', 'ClientController@get');
$app->post('/hotel/{hotel_id}/client/create', 'ClientController@create');
$app->post('/hotel/{hotel_id}/client/{client_id}/edit', 'ClientController@create');
$app->get('/hotel/{hotel_id}/client/{client_id}/delete', 'ClientController@delete');
$app->get('/hotel/{hotel_id}/clients/search', 'ClientController@search');
$app->get('/hotel/{hotel_id}/clients', 'ClientController@all');

$app->get('/hotel/{hotel_id}/notification/create', 'UserController@show');
$app->get('/hotel/{hotel_id}/notification/{notification_id}/read/{read}', 'UserController@show');
$app->get('/hotel/{hotel_id}/notification/{notification_id}/delete', 'UserController@show');
$app->get('/hotel/{hotel_id}/notification/{notification_id}', 'UserController@show');
$app->get('/hotel/{hotel_id}/notifications', 'UserController@show');

$app->get('/room/{room_id}', 'RoomController@get');
$app->get('/room/{room_id}/available', 'RoomController@available');
$app->post('/room/{room_id}/reservation/create', 'ReservationController@create');
$app->post('/room/{room_id}/reservation/create', 'ReservationController@create');
$app->post('/room/{room_id}/reservation/{reservation_id}/edit', 'ReservationController@create');
$app->get('/room/{room_id}/reservation/{reservation_id}/delete', 'ReservationController@delete');
$app->get('/room/{room_id}/reservation/current', 'RoomController@currentReservation');
$app->get('/room/{room_id}/reservations', 'ReservationController@list');
$app->get('/rooms/{room_ids}/reservations', 'ReservationController@ofRooms');

$app->get('/reservation/{reservation_id}', 'ReservationController@get');
$app->get('/reservations/currents', 'ReservationController@currents');
$app->get('/reservations/starts/today', 'ReservationController@startsToday');
$app->get('/reservations/ends/today', 'ReservationController@endsToday');
$app->post('/reservation/{reservation_id}/supplement/create', 'SupplementController@create');
$app->post('/reservation/{reservation_id}/supplement/{supplement_id}/edit', 'SupplementController@create');
$app->get('/reservation/{reservation_id}/supplement/{supplement_id}/delete', 'SupplementController@delete');
$app->get('/reservation/{reservation_id}/supplement/{supplement_id}', 'SupplementController@get');
$app->get('/reservation/{reservation_id}/supplements', 'SupplementController@list');

$app->get('/reservation/{reservation_id}/client/{client_id}/add', 'ClientController@add');
$app->get('/reservation/{reservation_id}/client/{client_id}/remove', 'ClientController@remove');
$app->get('/reservation/{reservation_id}/clients', 'ClientController@list');
