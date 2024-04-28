<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class UserController extends Controller
{
    public function login (Request $request)
    {
        // Validación básica de datos
        $request->validate([
            'identifier' => 'required', // Nuevo campo 'identifier' que puede ser un correo electrónico o nombre de usuario
            'password' => 'required',
        ]);

        $credentials = $request->only('password');

        // Verificar si el campo 'identifier' es un correo electrónico o nombre de usuario
        $field = filter_var($request->identifier, FILTER_VALIDATE_EMAIL) ? 'email' : 'name';
        $credentials[$field] = $request->identifier;
        if (Auth::attempt($credentials)) {
            // Obtener el usuario autenticado
            $user = Auth::user();
            $token = $user->createToken('token-name')->plainTextToken;
            $cookie = cookie('cookie_token', $token, 60 * 24);
        // Obtener el número de notificaciones del usuario
        // Retornar una respuesta JSON con éxito y el usuario
        return response()->json(['user'=> $user], 200)->withCookie(($cookie));
        } else {
            // La autenticación ha fallado
            return response(['success'=>false, 'message'=>'Credenciales invalidas'], 401);
        }
    }

    public function logout ()
    {
        auth()->user()->tokens()->delete();
        $cookie = Cookie::forget('cookie_token');
        return response(['message' => 'Cerró Sesión'], 200)->withCookie($cookie);
    }

}
