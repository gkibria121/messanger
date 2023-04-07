<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
       $det = random_int(0,1);

       if($det==0){
        $id1=1;
        $id2=3;
       }
       else{
        $id1=3;
        $id2=1;
       }
        return [
            'sender_id' => $id1,
            'receiver_type' => User::class,
            'receiver_id' => $id2,
            'message' => fake()->realText(100)

        ];
    }
}
