<?php

use App\Models\LastMessage;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // $message = new Message;
    // $message ->sender_id = '1';
    // $message ->receiver_id = '7';
    // $message->receiver_type = 'App\Models\User';
    // $message->message = fake()->text(200);
    // $message->save();
    // $messages = Message::where('sender_id','1')->orWhere('receiver_type','App\Models\User')->where('receiver_id','1')->orderBy('created_at', 'desc')->first();
    // $LastMessage = LastMessage::where('sender_id',1)->orWhere('receiver_type','App\Models\User')->where('receiver_id','1')->orderBy('updated_at', 'desc')->get();
//    return $LastMessage;
    $users = User::find(1)->conversation(2)->get();
    return $users;
//    return $messages;
});
