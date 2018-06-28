<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $this->validate ($request, [
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|min:6'
        ], [
            'password.confirmed' => 'The password does not match.'
        ]);


        event (new Registered($this->create ($request->all ())));
        $request->request->add ([
            'grant_type' => 'password',
            'client_id' => Config ('api.password_client_id'),
            'client_secret' => Config ('api.password_client_secret'),
            'username' => $request->get ('email'),
            'password' => $request->get ('password'),
            'remember' => $request->get ('remember'),
            'scope' => '',
        ]);

        $tokenRequest = Request::create ('/oauth/token', 'post');
        return Route::dispatch ($tokenRequest);

    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create ([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt ($data['password']),
        ]);
    }
}
