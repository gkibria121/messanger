<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LastMessage>
 */
class LastMessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()

    { 
        

        return [
            'sender_id' => '1',
            'receiver_id' =>'2',
            'receiver_type' => User::class,
            'isMessageActive' => '{ "1" : false, "2": false  }',
            'message' => fake()->text(200)
        ];
    }
}
