<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $guarded = [];

    private static $safe_extensions = [
        'jpg', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'png', 'jpeg', 'gif', 'zip', 'tar', '7z',
        'odt', 'djvu', 'ods', 'pptx', 'odp',
    ];
    private static $error;

    ///////////////////////
    //  Static functions //
    ///////////////////////

    public static function folder()
    {
        $folder = storage_path().'/uploads';
        if (!is_dir($folder)) {
            mkdir($folder);
        }
        return $folder;
    }
    public static function getError()
    {
        return self::$error;
    }

    public static function upload($f)
    {
        if (!$f) {
            return;
        }

        if (!$f->isValid()) {
            self::$error = 'Errore nel caricamento del file.';
            return false;
        }
        $ext = strtolower($f->getClientOriginalExtension());
        $name = $f->getClientOriginalName();
        $token = str_random(40);

        if (!in_array($ext, self::$safe_extensions)) {
            self::$error = 'Estensione non valida, usare solo .'.implode(', .', self::$safe_extensions);
            return false;
        }

        $f->move(self::folder(), $token);

        $f = new self([
            'name' => $name,
            'extension' => $ext,
            'token' => $token,
        ]);
        $f->save();

        return $f;
    }

    ////////////////////////
    //  Dynamic functions //
    ////////////////////////

    public function link()
    {
        return act('file.download', $this->token);
    }

    public function path()
    {
        return self::folder()."/{$this->token}";
    }

    public function fullName()
    {
        return $this->name;
    }
}
