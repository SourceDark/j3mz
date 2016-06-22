@extends('j3mz.layouts.header')

@section('header')
    @parent
    <link rel="stylesheet/less" type="text/css" href="/css/j3mz/layouts/navbar.less">
@endsection

@section('footer')
    @parent
@endsection

@section('body')
    <div class="navbar">
        <div class="title">劍叁木樁</div>
    </div>
    <div class="main-content">
        @section('main-content')
        @show
    </div>
@endsection