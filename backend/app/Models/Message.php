<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    protected $fillable  = ['sender_id'];
    protected static function boot()
    {
        parent::boot();

        static::created(function ($model) {
            $sender_id = $model->sender_id;
            $receiver_id = $model->receiver_id;
            $receiver_type = $model->receiver_type;
            $message = $model->message;
            $LastMessage =  LastMessage::where('sender_id', $sender_id)->where('receiver_type', $receiver_type)->where('receiver_id', $receiver_id)->orWhere('receiver_type', $receiver_type)->where('receiver_id', $sender_id)->where('sender_id', $receiver_id)->orderBy('updated_at', 'desc')->get();
            $newLastMessage = false;
            if (count($LastMessage) == 0) {
                $newLastMessage = new LastMessage;
            }
            else
            {
                $newLastMessage = LastMessage::find($LastMessage[0]->id);
            }

            $newLastMessage->sender_id = $sender_id;
            $newLastMessage->receiver_id = $receiver_id;
            $newLastMessage->receiver_type = $receiver_type;
            $newLastMessage->message = $message;
            $newLastMessage->isMessageActive = '{"'.$sender_id.'" : false, "'.$receiver_id.'": false  }';
            $newLastMessage->updated_at = Carbon::now();
            $newLastMessage->save();

        });
    }
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
    public function receiver()
    {
        return $this->morphTo();
    }
}
