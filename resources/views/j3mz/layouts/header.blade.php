<html>
<head>
    <title>@yield('title') | 剑三木桩</title>
    @section('header')
        <link rel="stylesheet/less" type="text/css" href="/css/j3mz/j3mz.less">
        <link rel="stylesheet" href="/css/lib/font-awesome/css/font-awesome.min.css">
    @show
</head>
<body ng-app="j3mzApp">
    @section('body')
    @show
    <div style="display: none">
        @section('footer')
            <script src="/js/lib/less/less.min.js" data-env="production"></script>
            <script src="/js/lib/angular/angular.min.js"></script>
            <script src="/js/j3mz/j3mz.js"></script>
        @show
    </div>
</body>
</html>