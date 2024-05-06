<?php

namespace App\Imports;

use App\Models\Deportista;
use App\Models\Provincia;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithBatchInserts;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class DeportistaImport implements ToModel, WithHeadingRow, WithBatchInserts, WithValidation
{

    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $provincia_id= Provincia::select('provincia_id')->where('provincia','LIKE',$row['provincia'])->first();
        $nameParts = explode(',',$row['name']);
        $apellido = ucwords(strtolower($nameParts[0]));
        $name = $nameParts[1];
        $cedula = $row['cedula'];
        $fechaNacimiento = Carbon::createFromFormat('d/m/Y', $row['dob'])->format('Y-m-d');
        return new Deportista([
            'nombre' => $name,
            'cedula' => $cedula,
            'apellido' => $apellido,
            'genero' => $row['gen'],
            'edad' => $row['age'],
            'fecha_nacimiento' => $fechaNacimiento,
            'url_imagen' => "$apellido$name $cedula.jpg",
            'provincia_id' => $provincia_id->provincia_id,
        ]);
    }

    public function rules(): array
    {
        return [
            'name' => 'required|regex:/^[a-zA-Z\s]*$/',
            'cedula' => 'required|numeric|unique:deportistas,cedula',
            'dob' => 'required|date_format:d/m/Y',
            'gen' => 'required|in:M,F',
            'age' => 'required|numeric',
            'provincia' => 'required|exists:provincias,provincia',
        ];
    }
    public function batchSize(): int
    {
        return 1000;
    }
}
