<?php

namespace App\Http\Controllers;

use App\Imports\DataImport;
use App\Imports\DeportistaImport;
use App\Models\Provincia;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Storage;
use Kreait\Firebase\Storage\Bucket;

class FilesController extends Controller
{
    public function deportistaImport(Request $request)
    {
        try{
            $request->validate([
                'excelLoad' => 'required|mimes:xlsx,xls',
            ]);
            Excel::import(new DataImport,$request->file('excelLoad'),null, \Maatwebsite\Excel\Excel::XLSX);
            return response()->json(['success'=>true,'message'=>'Deportistas importados correctamente']);
        }catch(\Maatwebsite\Excel\Validators\ValidationException $e){
            return response()->json(['success'=>false,'message'=>$e->failures()],422);
        }
    }

    public function deportistaImages(Provincia $provincia, Request $request)
    {
        try{
            $request->validate([
                'images' => 'required|array',
                'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
                $name = strtolower($provincia->provincia);
                // Create an instance of the Firebase Storage client
                $firebase = app('firebase.storage');
                dd($firebase);
                $storage = $firebase->getBucket();
            // foreach($request->file('images') as $image){
            //     $name_file = $image->getClientOriginalName();
            //     $name_file = str_replace(' ', '_', $name_file);
            //     $storage->upload($image, [
            //         'name' => 'images/'.$name.'/'.$name_file
            //     ]);
            // }
            return response()->json(['success'=>true,'message'=>'Imagenes subidas correctamente']);
            // $request->validate([
            //     'images' => 'required|array',
            //     'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            // ]);
            // $name = $provincia->provincia;
            // foreach($request->file('images') as $image){
            //     $url = $image->storeAs('public/images/'.$name.'/'.$image->getClientOriginalName());
            // }
            // return response()->json(['success'=>true,'message'=>'Imagenes subidas correctamente', 'url'=>$url]);
        }catch(\Exception $e){
            return response()->json(['success'=>false,'message'=>$e->getMessage()],500);
        }
    }
}
