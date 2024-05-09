<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invitado;
use Exception;

class GuestController extends Controller
{
    public function index()
    {
        // Método index: Muestra una lista de recursos (en este caso, invitados)
        $guests = Invitado::all();
        return response()->json($guests);
    }
    public function indexf($tipo_invitado_id)
{
        // Método indexf: Muestra una lista paginada de recursos (en este caso, invitados) filtrados por tipo de invitado
        $query = Invitado::where('tipo_invitado_id', $tipo_invitado_id)->orderBy('invitado_id');

        // Pagina los resultados a 5 por página
        $guests = $query->paginate(5);

        return response()->json($guests);
    }
    public function show($nombreCompleto)
    {
        // Método show: Muestra un recurso (en este caso, un invitado) buscando por nombre completo en 'nombre' o 'apellido'
        $guest = Invitado::where('nombre', 'like', "%$nombreCompleto%")
                         ->orWhere('apellido', 'like', "%$nombreCompleto%")
                         ->get();
    
        if ($guest) {
            return response()->json($guest);
        } else {
            return response()->json(['error' => 'Invitado no encontrado'], 404);
        }
    }
    public function store(Request $request)
    {
        // Método store: Almacena un recurso (en este caso, un invitado)
        try {
            $request->validate([
                'provincia_id' => 'nullable',
                'tipo_invitado_id' => 'required',
                'nombre' => 'required|unique:invitados,nombre',
                'apellido' => 'required',
                'cedula' => 'required',
                'edad' => 'required',
                'genero' => 'required',

            ]);
            Invitado::create($request->all());
            return response()->json(['message' => 'Creado el invitado exitosamente'], 200);
        }  catch (Exception $e) {
            // Captura el mensaje de error
            $errorMessage = $e->getMessage();
            // Retorna el mensaje de error en un JSON de respuesta
            return response()->json(['error' => 'Ha ocurrido un error al crear el invitado' . $errorMessage], 500);
        }
    }
    public function delete($id)
    {
        // Método delete: Elimina un recurso (en este caso, un invitado)
        try {
            $guest = Invitado::find($id);
            if ($guest) {
                $guest->delete();
                return response()->json(['message' => 'Invitado eliminado exitosamente'], 200);
            } else {
                return response()->json(['error' => 'Invitado no encontrado'], 404);
            }
        } catch (Exception $e) {
            // Captura el mensaje de error
            $errorMessage = $e->getMessage();
            // Retorna el mensaje de error en un JSON de respuesta
            return response()->json(['error' => 'Ha ocurrido un error al eliminar el invitado' . $errorMessage], 500);
        }
    }
    public function update(Request $request, $id)
    {
        // Método update: Actualiza un recurso (en este caso, un invitado)
        try {
            $guest = Invitado::find($id);
            if ($guest) {
                $request->validate([
                    'provincia_id' => 'required',
                    'tipo_invitado_id' => 'required',
                    'nombre' => 'required|unique:invitados,nombre,' .$id. ',invitado_id',
                    'apellido' => 'required',
                    'cedula' => 'required',
                    'edad' => 'required',
                    'genero' => 'required',

                ]);
                $guest->update($request->all());
                return response()->json(['message' => 'Invitado actualizado exitosamente'], 200);
            } else {
                return response()->json(['error' => 'Invitado no encontrado'], 404);
            }
        } catch (Exception $e) {
            // Captura el mensaje de error
            $errorMessage = $e->getMessage();
            // Retorna el mensaje de error en un JSON de respuesta
            return response()->json(['error' => 'Ha ocurrido un error al actualizar el invitado' . $errorMessage], 500);
        }
    }
}
