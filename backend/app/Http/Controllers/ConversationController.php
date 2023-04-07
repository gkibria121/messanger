<?php

namespace App\Http\Controllers;
use App\Models\User;



class ConversationController extends Controller
{
    public function conversation($id,$page)
    {
        $conversation = User::find(2)->conversation($id)->orderBy('created_at','desc')->take(100*$page)->get()->toArray();
        $reversed = array_reverse($conversation);

        return $reversed;
    }
    
    public function dashboard() 
    {
        $conversations = User::find(2)->lastMessages()->orderBy('updated_at','desc')->get();
        return $conversations;
    }  
}