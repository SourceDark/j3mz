@extends('j3mz.layouts.header')

@section('title', "首页")

@section('header')
    @parent
    <link rel="stylesheet/less" type="text/css" href="/css/j3mz/index.less">
@endsection

@section('footer')
    @parent
    <script src="/js/j3mz/services/worldService.js"></script>
    <script src="/js/j3mz/services/xinfaService.js"></script>
    <script src="/js/j3mz/services/avatarService.js"></script>
    <script src="/js/j3mz/services/constService.js"></script>
    <script src="/js/j3mz/services/macroService.js"></script>
    <script src="/js/j3mz/services/skillService.js"></script>
    <script src="/js/j3mz/services/buffService.js"></script>
    <script src="/js/j3mz/index.js"></script>
@endsection

@section('body')
    <div ng-controller="indexCtrl">
        <div>
            <div>
                <span>心法：</span>
                <select ng-model="xinfa" ng-options="xinfa.name for xinfa in xinfas"></select>
            </div>

            <div ng-show="xinfa.useWeapon">
                <div>武器伤害下限：<input ng-model="attributes.weaponDamage_lowerLimit"></div>
                <div>武器伤害上限：<input ng-model="attributes.weaponDamage_upperLimit"></div>
                <div>五行石武伤：<input ng-model="attributes.weaponDamage_extra"></div>
            </div>
            <div>基础攻击：<input ng-model="attributes.basicAttackPower"></div>
            <div>最终攻击：<input ng-model="attributes.finalAttackPower"></div>
            <div>会心几率：<input ng-model="attributes.criticalHitChance">%</div>
            <div>会心效果：<input ng-model="attributes.criticalHitDamage">%</div>
            <div>破防等级：<input ng-model="attributes.defenseBreakLevel"></div>
            <div>命中几率：<input ng-model="attributes.hitChance">%</div>
            <div>无双几率：<input ng-model="attributes.precisionChance">%</div>
            <div>
                <span>目标：</span>
                <select ng-model="target" ng-options="target.name for target in targets"></select>
            </div>
            <div>命中要求：<%(target.attributes.hitChance_require * 100).toFixed(2)%>%</div>
            <div>无双几率：<%(target.attributes.precisionChance_require * 100).toFixed(2)%>%</div>
            <div>防御比例：<%(target.attributes.defenseRate * 100).toFixed(2)%>%</div>
            <div>
                <span>宏（多段直接按顺序复制）：</span>
                <textarea ng-model="macroText"></textarea>
            </div>
            <div>世界精度：<input ng-model="frameLength">s（即每帧的长度，越接近于0计算越细致，但一定精度后无意义）</div>
            <div>模拟时间：<input ng-model="worldLength">s（战斗的总时长，越高平均输出越准确）</div>
            <div>模拟次数：<input ng-model="worldAmount">（总共模拟的战斗次数，越高平均输出越准确）</div>
        </div>
        <button ng-click="test()">测试</button>
    </div>
@endsection