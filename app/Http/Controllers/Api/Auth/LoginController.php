<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
class LoginController extends Controller
{
    public function login(Request $request)
    {

        $this->validate ($request, [
            'email' => 'bail|required|email|exists:users,email',
            'password' => 'bail|required|min:6'
        ], [
            'email.exists' => 'The user credentials were incorrect.'
        ]);
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

    public function logout(Request $request)
    {
        $accessToken = $request->user ()->token ();

        DB::table ('oauth_refresh_tokens')
            ->where ('access_token_id', $accessToken->id)
            ->update ([
                'revoked' => true
            ]);
        $accessToken->revoke ();

        return response ()->json ([], 201);
    }
}
