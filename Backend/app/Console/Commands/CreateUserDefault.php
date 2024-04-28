<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;

class CreateUserDefault extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:user-default';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $new_user = ['name'=>'Administrador',
                    'email'=>'admin_so@uleam.edu.ec',
                    'password'=>bcrypt('UleamFacci2024')];

        $user = new User();
        $user->fill($new_user);
        $user->save();
        // $superAdminRole = Role::where('name', 'Admin')->first();
    }
}
