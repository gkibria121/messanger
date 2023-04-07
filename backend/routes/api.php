<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use App\Models\LastMessage;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/messages/{id}/{page}' ,[ConversationController::class, 'conversation']);
Route::get('/dashboard' ,[ConversationController::class, 'dashboard']);
Route::post('messages/send',[MessageController::class,'send_message']);
Route::get('/active/isMessageActive/{id}',[MessageController::class,'user_message_active'])->withoutMiddleware('throttle:api');
Route::get('/active/setMessageActive/{id}/{condition}',[MessageController::class,'set_user_message_active']);
Route::get('/lastmessages',function(){
    $message = User::find(1)->lastMessage(2);
    return $message;
});