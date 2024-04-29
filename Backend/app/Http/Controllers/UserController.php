<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class UserController extends Controller
{
    public function login (Request $request)
    {
        try{
            $request->validate([
                'email' => 'required',
                'password' => 'required',
            ]);
            if (Auth::attempt($request->all())) {
                // Obtener el usuario autenticado
                $user = Auth::user();
                $token = $user->createToken('token-name')->plainTextToken;
                $cookie = cookie('cookie_token', $token, 60 * 24);
            // Obtener el número de notificaciones del usuario
            // Retornar una respuesta JSON con éxito y el usuario
            return response()->json(['user'=> $user->getSessionDetails()], 200)->withCookie(($cookie));
            } else {
                // La autenticación ha fallado
                return response(['success'=>false, 'message'=>'Credenciales invalidas'], 401);
            }
        }catch(Exception $e){
            return response()->json(['error'=>$e->getMessage()]);
        }

    }

    public function logout ()
    {
        auth()->user()->tokens()->delete();
        $cookie = Cookie::forget('cookie_token');
        return response(['message' => 'Cerró Sesión'], 200)->withCookie($cookie);
    }

    public function get_session()
    {
        $user = auth()->user()->getSessionDetails();
            return response()->json(['success'=>true,'user'=>$user]);
    }
}
