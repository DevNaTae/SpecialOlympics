<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class DataImport implements WithMultipleSheets
{
    public function sheets(): array
    {
        return [
            'Atletas' => new DeportistaImport(),
            'Entrenador' => new InvitadoImport(),
        ];
    }
}
