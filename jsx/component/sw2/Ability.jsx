'use strict';

var React = require('react');

var Ability = React.createClass({
    render: function () {
        var data = this.props.data;
        var ability = data.ability;

        var radius = this.props.radius || 120;
        var margin = radius / 5 * 2;
        var size = radius + margin;

        var points = [];
        for (var i = 0; i < 6; ++i) {
            var r1 = Math.PI * 2 / 6 * (i - 0.5);
            points.push([Math.sin(r1), -Math.cos(r1)]);
        }

        var pmul = function (a) {
            return function (p) {
                return p.map(function (b) {
                    return b * a;
                });
            };
        };
        
        var rlist = new Array(5);
        for (var i = 0; i < 5; ++i) {
            rlist[i] = new Array(6);
            rlist[i].fill(0);
        }

        if (ability) {
            for (var i = 0; i < 6; ++i) {
                rlist[0][i] = (+ability.base3[Math.floor(i / 2)]);
                rlist[1][i] = rlist[0][i] + (+ability.base[i]);
                rlist[2][i] = rlist[1][i] + (+ability.growth[i]);
                rlist[3][i] = rlist[2][i] + (+ability.correct[i]);
                rlist[4][i] = +ability.sum[i];
            }
        }

        var rader = function (sum, n) {
            var r = sum / 30 * radius;
            return points[n].map(function (p) {
                return p * r;
            });
        };

        return (
                <svg className="rader" width={size * 2} height={size * 2}>
                    <g style={{transform: 'translate(' + size + 'px, ' + size + 'px)'}}>
                        <g className="rader">
                            <polygon points={rlist[4].map(rader)}/>
                            <polygon points={rlist[3].map(rader)}/>
                            <polygon points={rlist[2].map(rader)}/>
                            <polygon points={rlist[1].map(rader)}/>
                            <polygon points={rlist[0].map(rader)}/>
                        </g>
                        <g className="grid">
                            {points.map(
                                    function (p) {
                                        return (
                                                <line x1="0" y1="0" x2={p[0] * radius} y2={p[1] * radius} />
                                               );
                                    })
                            }
                            <polygon points={points.map(pmul(radius))}/>
                            <polygon points={points.map(pmul(radius * 4 / 5))}/>
                            <polygon points={points.map(pmul(radius * 3 / 5))}/>
                            <polygon points={points.map(pmul(radius * 2 / 5))}/>
                            <polygon points={points.map(pmul(radius / 5))}/>
                        </g>
                        <g className="label">
                            {points.map(
                                    function (p, n) {
                                        var x = p[0] * (radius + margin / 2);
                                        var y = p[1] * (radius + margin / 2);

                                        var label = ['器用度', '敏捷度', '筋力', '生命力', '知力', '精神力'][n];

                                        if (ability) {
                                            label += '\n' + ability.sum[n] + ' (+' + ability.bonus[n] + ')';
                                        }

                                        var text = label.split('\n').map(
                                                function (line, n) {
                                                    return (<text x={x} y={y + n * 18 - 7.5}>{line}</text>);
                                                });

                                        return text;
                                    }.bind(this))
                            }
                            {'技体心'.split('')
                                .map(function (label, n) {
                                    var p1 = points[n * 2];
                                    var p2 = points[n * 2 + 1];
                                    var r = radius + margin / 3 * 2;
                                    var x = (p1[0] + p2[0]) / 2 * r;
                                    var y = (p1[1] + p2[1]) / 2 * r;
                                    return (<text className="l" x={x} y={y}>{label}</text>);
                                })
                            }
                        </g>
                    </g>
                </svg>
               );
    }
});

module.exports = Ability;
