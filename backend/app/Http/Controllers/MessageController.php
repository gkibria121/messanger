<?php

namespace App\Http\Controllers;

use App\Models\LastMessage;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function send_message(Request $request)
    {
        $message = new Message;
        $message ->sender_id = $request->sender_id;
        $message->receiver_id = 2;
        $message->receiver_type = User::class;
        $message -> message = $request->message;
        $message->save();
        return $message;
    }
    public function user_message_active($id)
    {
      $lastMessage = User::find(2)->lastMessage($id)->isMessageActive;

      return  $lastMessage;

    }
    public function set_user_message_active($id,$condition)
    {
        $lastMessageId = User::find(2)->lastMessage($id)->id;
        $lastMessage = LastMessage::find( $lastMessageId);
        $isMessageActive = $lastMessage->isMessageActive;
        $obj = json_decode($isMessageActive,true);
        if($condition == 'true'){
            $obj["$id"] = 'true';
        }
        else {
            $obj["$id"] = 'false';
        }
        $lastMessage->isMessageActive = json_encode($obj);
        $lastMessage->save();
       return  $lastMessage;
    }
}
