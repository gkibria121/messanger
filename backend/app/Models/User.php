<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function receivedMessages()
    {
        return $this->morphMany(Message::class,'receiver');
    }
    public function sentMessages()
    {
        return $this->hasMany(Message::class,'sender_id');
    }
    public function lastMessages()
    {
      return $this->hasMany(LastMessage::class,'sender_id')
                   ->orWhere('receiver_id',$this->id)
                   ->where('receiver_type',User::class)
                   ->with('sender','receiver');
    }
    public function conversation($id2=0)
    {
        if($id2==0){
            return $this->hasMany(Message::class,'sender_id')
                        ->orWhere('receiver_type',User::class)
                        ->where('receiver_id',$this->id);
        }
        return $this->hasMany(Message::class,'sender_id')
                    ->where('receiver_type',User::class)
                    ->where('receiver_id',$id2)
                    ->orWhere('sender_id',$id2)
                    ->where('receiver_type',User::class)
                    ->where('receiver_id',$this->id);
    }
    public function lastMessage($id)
    {
      return $this->hasMany(LastMessage::class,'sender_id')
                   ->where('receiver_type',User::class)
                   ->where('receiver_id',$id)
                   ->orWhere('receiver_id',$this->id)
                   ->where('receiver_type',User::class)
                   ->where('sender_id',$id)
                   ->first();

    }


}
