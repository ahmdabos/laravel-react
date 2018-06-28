<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 1)->create();

        \App\User::create([
            'name' => 'ahmd abos',
            'email' => 'ahmedabbous.m@gmail.com',
            'password' => bcrypt('111111'),
            'is_admin' => true,
            'remember_token' => str_random(10),
        ]);
    }
}
