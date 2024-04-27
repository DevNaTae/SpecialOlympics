<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class Deportista extends Model
{
    use HasFactory;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($deportista) {
             // Generar el código QR
             $cdl = $deportista->cedula;
             $qrCode = QrCode::size(300)->generate($cdl);

             // Guardar el código QR en el almacenamiento (storage)
             $fileName = $cdl ; // Nombre del archivo basado en la cédula
             Storage::put('public/qrcodes/' . $fileName, $qrCode);



        });

        static::updating(function ($deportista) {

        });
    }

    protected $table = 'deportistas';

    protected $primarKey = 'id';
    protected $fillable = [
        'cedula',
        'numero_deportista',
        'provincia_id',
        'nombre',
        'apellido',
        'edad',
        'genero'
    ];

    /**
     * Obtener la provincia asociada al deportista.
     */
    public function provincia()
    {
        return $this->belongsTo(Provincia::class, 'provincia_id', 'provincia_id');
    }
}