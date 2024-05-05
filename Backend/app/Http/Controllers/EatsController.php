<?php

namespace App\Http\Controllers;

use App\Models\Almuerzo;
use App\Models\Deportista;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EatsController extends Controller
{
    public function index(Deportista $deportista)
    {
        try{
            $deportista->load('almuerzos');

            // Filtrar los almuerzos para el día actual
            $almuerzosDelDia = $deportista->almuerzos->filter(function ($almuerzo) {
                return Carbon::parse($almuerzo->fecha)->isToday();
            });

            if ($almuerzosDelDia->isEmpty()) {
                // No se encontraron almuerzos para el día actual
                return response()->json(['message' => 'No se encontraron almuerzos para hoy'], 404);
            }

            return response()->json(['success'=>true,'deportista'=>$deportista]);
        }catch(\Exception $e){
            return response()->json(['message'=>'Ha ocurrido un error'],500);
        }
    }
    public function mark(Almuerzo $almuerzo)
    {
        try{
            $now = now();
            $fechaAlmuerzo = Carbon::parse($almuerzo->fecha);
            $horaInicio = Carbon::parse($almuerzo->hora_inicio);
            $horaFin = Carbon::parse($almuerzo->hora_fin);

            if (!$fechaAlmuerzo->isToday() || !$now->between($horaInicio, $horaFin)) {
                return response()->json(['message' => 'No se puede marcar el almuerzo fuera de la fecha y hora programada'], 422);
            }

            $almuerzo->update(['completado'=>1]);
            return response()->json(['message'=>'Almuerzo marcado como completado']);
        }catch(\Exception $e){
            return response()->json(['message' => 'Error al marcar el almuerzo como completado'], 500);
        }
    }
    // {
    //     // try{
    //     //     $almuerzo = $deportista->almuerzos()
    //     //     ->whereDate('fecha',now()->toDateString())
    //     //     ->whereTime('hora_inicio','<=',now()->toTimeString())
    //     //     ->whereTime('hora_fin','>=',now()->toTimeString())
    //     //     ->first();
    //     //     $almuerzo->update(['completado'=>1]);
    //     //     return response()->json(['message'=>'Almuerzo marcado como completado']);
    //     // }catch(\Exception $e){
    //     //     return response()->json(['message'=>'No se encontro almuerzo'],404);
    //     // }
    // }
}
