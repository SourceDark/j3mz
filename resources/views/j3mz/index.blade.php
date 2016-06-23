@extends('j3mz.layouts.navbar')

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
    <script src="/js/j3mz/services/loggerService.js"></script>
    <script src="/js/j3mz/index.js"></script>
@endsection

@section('main-content')
    <div ng-controller="indexCtrl">
        <div class="xinfa-panel">
            <div ng-repeat="xinfa in xinfas" class="xinfa-item" ng-click="selectXinfa(xinfa)" ng-class="{selected: (xinfa == selectedXinfa)}">
                <image ng-src="/image/j3mz/xinfa/<%xinfa.pinyin%>.png"></image>
            </div>
        </div>
        <div class="sidebar">
            <div class="description">
                <image ng-src="/image/j3mz/description.png"></image>
                <div class="line" ng-repeat="descriptionLine in selectedXinfa.description">
                    <%descriptionLine%>
                </div>
            </div>
            <div class="menu-list">
                <div class="menu-item" ng-class="{selected: selectedMenuIndex == 0}" ng-click="selectMenuIndex(0)">
                    <div><i class="fa fa-user-plus" aria-hidden="true"></i></div>
                    <span> 角色属性</span>
                </div>
                <div class="menu-item" ng-class="{selected: selectedMenuIndex == 1}" ng-click="selectMenuIndex(1)">
                    <div><i class="fa fa-clock-o" aria-hidden="true"></i></div>
                    <span> 输出模拟</span>
                </div>
                <div class="menu-item" ng-class="{selected: selectedMenuIndex == 2}" ng-click="selectMenuIndex(2)">
                    <div><i class="fa fa-star" aria-hidden="true"></i></div>
                    <span> 属性收益</span>
                </div>
            </div>
        </div>
        <div class="main-panel">
            <div class="section">
                <div class="title" ng-class="{unfold: !qixue_section_fold}">
                    <i ng-if="!qixue_section_fold" ng-click="alterQixueSection()" class="fa fa-minus" aria-hidden="true"></i>
                    <i ng-if="qixue_section_fold" ng-click="alterQixueSection()" class="fa fa-plus" aria-hidden="true"></i>
                    <span> 奇穴设置</span>
                </div>
                <div ng-if="!qixue_section_fold">
                    <div ng-repeat="qixue in selectedXinfa.qixues">
                        <div ng-click="alterQixue(qixue)" class="qixue" ng-class="{fade: (unfold_qixue != null && unfold_qixue != qixue)}">
                            【<%qixue.options[qixue.active].name%>】<%qixue.options[qixue.active].description%>
                        </div>
                        <div ng-show="qixue == unfold_qixue" ng-repeat="option in qixue.options" class="option">
                            <div ng-if="option.available" ng-click="selectQixueOptionIndex(qixue, $index)">
                                <i ng-show="qixue.active == $index"class="fa fa-check" aria-hidden="true"></i>【<%option.name%>】<%option.description%>
                            </div>
                            <s ng-if="!option.available">
                                【<%option.name%>】<%option.description%>
                            </s>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('123')
    <div ng-controller="indexCtrl">
        <div>
            <div>更新时间2016年06月22日：17时24分：修复了一个修改武器伤害会造成输出爆炸的错误</div>
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
        <div style="border: 1px solid">
            <small>
        <div>一些说明：</div>
        <div>按照作者的电脑配置，一次精度0.01、时长600S的战斗大约1秒左右可以计算出来，这个时间会随着CPU性能等软硬件因素而变化，所以第一次使用的时候最好控制一下模拟时间和模拟次数。</div>
        <div>如果想要看具体计算进程，可以按F12（或者根据浏览器不同的其他快捷键）打开控制台，有输出当前计算进度（我会尽快直接做在页面里）</div>
            </small>
        </div>
        <div>模拟结果：平均输出为（<%(dpsSum / worldAmount / worldLength).toFixed(0)%>）</div>
        <div class="result-panel">
            <div class="battle-list">
                <div class="item" ng-repeat="result in results" ng-click="selectResult(result)">第<%$index%>场：<%result.dps.toFixed(2)%></div>
            </div>
            <div class="battle-detail">
                <div class="event-list">
                    <div ng-repeat="event in selectedResult.events">
                        <div ng-if="event.type == 0">
                            <div ng-if="event.hitType == 0">[<%event.time.toFixed(2)%>]你的[<%event.skillName%>]偏离了。</div>
                            <div ng-if="event.hitType == 1">[<%event.time.toFixed(2)%>]你的[<%event.skillName%>]对<%event.targetName%>造成了<%event.damage.toFixed(0)%>点伤害。</div>
                            <div ng-if="event.hitType == 2">[<%event.time.toFixed(2)%>]你的[<%event.skillName%>]（会心）对<%event.targetName%>造成了<%event.damage.toFixed(0)%>点伤害。</div>
                            <div ng-if="event.hitType == 3">[<%event.time.toFixed(2)%>]你的[<%event.skillName%>]的<%event.damage.toFixed(0)%>点伤害被<%event.targetName%>识破了。</div>
                        </div>
                        <div ng-if="event.type == 1">
                            <div>[<%event.time.toFixed(2)%>]减益效果[<%event.debuffName%>：<%event.debuffLevel%>]从[<%event.targetName%>]身上消失了。</div>
                        </div>
                        <div ng-if="event.type == 2">
                            <div>[<%event.time.toFixed(2)%>][<%event.targetName%>]获得了减益效果[<%event.debuffName%>：<%event.debuffLevel%>]。</div>
                        </div>
                        <div ng-if="event.type == 3">
                            <div ng-if="event.hitType == 1">[<%event.time.toFixed(2)%>]你的[<%event.debuffName%>：<%event.debuffLevel%>]对<%event.targetName%>造成了<%event.damage.toFixed(0)%>点伤害。</div>
                            <div ng-if="event.hitType == 2">[<%event.time.toFixed(2)%>]你的[<%event.debuffName%>：<%event.debuffLevel%>]（会心）对<%event.targetName%>造成了<%event.damage.toFixed(0)%>点伤害。</div>
                            <div ng-if="event.hitType == 3">[<%event.time.toFixed(2)%>]你的[<%event.debuffName%>：<%event.debuffLevel%>]的<%event.damage.toFixed(0)%>点伤害被<%event.targetName%>识破了。</div>
                        </div>
                        <div ng-if="event.type == 4">
                            <div>[<%event.time.toFixed(2)%>]你获得了效果[<%event.buffName%>：<%event.buffLevel%>]。</div>
                        </div>
                        <div ng-if="event.type == 5">
                            <div>[<%event.time.toFixed(2)%>]你开始运功[<%event.skillName%>]。</div>
                        </div>
                    </div>
                </div>
                <div class="skill-stats">
                    <div class="skill-list">
                        <table style="width: 100%">
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td></td>
                                    <td>次数</td>
                                    <td>伤害</td>
                                    <td>比重</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="skill in selectedResult.skills" ng-click="selectSkill(skill)">
                                    <td><%$index%></td>
                                    <td><%skill.name%></td>
                                    <td><%skill.stats[0].count + skill.stats[1].count + skill.stats[2].count + skill.stats[3].count%></td>
                                    <td><%(skill.stats[0].sum + skill.stats[1].sum + skill.stats[2].sum + skill.stats[3].sum).toFixed(0)%></td>
                                    <td><%((skill.stats[0].sum + skill.stats[1].sum + skill.stats[2].sum + skill.stats[3].sum) / selectedResult.dps / worldLength * 100).toFixed(1)%>%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="skill-detail">
                        <table style="width: 100%">
                            <thead>
                            <tr>
                                <td>#</td>
                                <td>技能类型</td>
                                <td>最小</td>
                                <td>平均</td>
                                <td>最大</td>
                                <td>次数</td>
                                <td>比重</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat="stat in selectedSkill.stats" ng-if="stat.count > 0">
                                <td><%$index%></td>
                                <td ng-if="$index==0">偏离</td>
                                <td ng-if="$index==1">命中</td>
                                <td ng-if="$index==2">会心</td>
                                <td ng-if="$index==3">识破</td>
                                <td><%(stat.min).toFixed(0)%></td>
                                <td><%(stat.sum / stat.count).toFixed(0)%></td>
                                <td><%(stat.max).toFixed(0)%></td>
                                <td><%stat.count%></td>
                                <td><%(stat.count / (selectedSkill.stats[0].count + selectedSkill.stats[1].count + selectedSkill.stats[2].count + selectedSkill.stats[3].count) * 100).toFixed(0)%>%</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection