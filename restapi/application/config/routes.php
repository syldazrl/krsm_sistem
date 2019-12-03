<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;


$route['API'] = 'Rest_server';

// User API Routes

$route['Mahasiswa']['get'] = 'Mahasiswa/Panggil';
$route['Mahasiswa']['post'] = 'Mahasiswa/Tambah';
$route['Mahasiswa']['delete'] = 'Mahasiswa/Ubah';
$route['Mahasiswa']['put'] = 'Mahasiswa/Hapus';
$route['Matakuliah']['get'] = 'Matakuliah/Panggil';
$route['Matakuliah']['post'] = 'Matakuliah/Tambah';
$route['Matakuliah']['delete'] = 'Matakuliah/Ubah';
$route['Matakuliah']['put'] = 'Matakuliah/Hapus';
$route['Pegawai']['get'] = 'Pegawai/Panggil';
$route['Pegawai']['post'] = 'Pegawai/Tambah';
$route['Pegawai']['delete'] = 'Pegawai/Ubah';
$route['Pegawai']['put'] = 'Pegawai/Hapus';
$route['Thn_akademik']['get'] = 'Thn_akademik/Panggil';
$route['Thn_akademik']['post'] = 'Thn_akademik/Tambah';
$route['Thn_akademik']['delete'] = 'Thn_akademik/Ubah';
$route['Thn_akademik']['put'] = 'Thn_akademik/Hapus';
$route['DosenWali']['get'] = 'DosenWali/Panggil';
$route['DosenWali']['post'] = 'DosenWali/Tambah';
$route['DosenWali']['delete'] = 'DosenWali/Ubah';
$route['DosenWali']['put'] = 'DosenWali/Hapus';
$route['Jurusan']['get'] = 'Jurusan/Panggil';
$route['Jurusan']['post'] = 'Jurusan/Tambah';
$route['Jurusan']['delete'] = 'Jurusan/Ubah';
$route['Jurusan']['put'] = 'Jurusan/Hapus';
$route['Matakul']['get'] = 'Matakul/Panggil';
$route['Krs']['get'] = 'Krs/Panggil';
$route['Krs']['post'] = 'Krs/Tambah';
$route['Krs']['delete'] = 'Krs/Ubah';
$route['Krs']['put'] = 'Krs/Hapus';
$route['User']['get'] = 'User/Login';
