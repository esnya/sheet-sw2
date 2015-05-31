'use strict';

var Ability = React.createClass({displayName: "Ability",
    render: function () {
        var data = this.props.data;

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
        
        var abilities = [];
        var sumlist = {
            base: [],
            ability: [],
            growth: [],
            sum: []
        };
        if (data.abilities) {
            for (var i = 0; i < 6; ++i) {
                var base = +data[['skill', 'body', 'mind'][Math.floor(i / 2)]];

                var ability = +data.abilities[i];
                var growth = +data.growths[i];

                // ToDo corrects
                var correct = 0;
                var sum = base + ability + growth;
                var bonus = Math.floor(sum / 6);

                sumlist.base.push(base);
                sumlist.ability.push(base + ability);
                sumlist.growth.push(base + ability + growth);
                sumlist.sum.push(sum);

                abilities.push([base, ability, growth, correct].join(',') + '\n'  + sum + ' (+' + bonus + ')');
            }
        }

        var rader = function (sum, n) {
            var r = sum / 30 * radius;
            return points[n].map(function (p) {
                return p * r;
            });
        };

        return (
                React.createElement("svg", {className: "rader", width: size * 2, height: size * 2}, 
                    React.createElement("g", {style: {transform: 'translate(' + size + 'px, ' + size + 'px)'}}, 
                        React.createElement("g", {className: "rader"}, 
                            React.createElement("polygon", {points: sumlist.sum.map(rader)}), 
                            React.createElement("polygon", {points: sumlist.growth.map(rader)}), 
                            React.createElement("polygon", {points: sumlist.ability.map(rader)}), 
                            React.createElement("polygon", {points: sumlist.base.map(rader)})
                        ), 
                        React.createElement("g", {className: "grid"}, 
                            points.map(
                                    function (p) {
                                        return (
                                                React.createElement("line", {x1: "0", y1: "0", x2: p[0] * radius, y2: p[1] * radius})
                                               );
                                    }), 
                            
                            React.createElement("polygon", {points: points.map(pmul(radius))}), 
                            React.createElement("polygon", {points: points.map(pmul(radius * 4 / 5))}), 
                            React.createElement("polygon", {points: points.map(pmul(radius * 3 / 5))}), 
                            React.createElement("polygon", {points: points.map(pmul(radius * 2 / 5))}), 
                            React.createElement("polygon", {points: points.map(pmul(radius / 5))})
                        ), 
                        React.createElement("g", {className: "label"}, 
                            points.map(
                                    function (p, n) {
                                        var x = p[0] * (radius + margin / 2);
                                        var y = p[1] * (radius + margin / 2);

                                        var label = ['器用度', '敏捷度', '筋力', '生命力', '知力', '精神力'][n];

                                        if (abilities[n]) {
                                            label += '\n' + abilities[n];
                                        }

                                        var text = label.split('\n').map(
                                                function (line, n) {
                                                    return (React.createElement("text", {x: x, y: y + n * 15 - 7.5}, line));
                                                });

                                        return text;
                                    }.bind(this)), 
                            
                            '技体心'.split('')
                                .map(function (label, n) {
                                    var p1 = points[n * 2];
                                    var p2 = points[n * 2 + 1];
                                    var r = radius + margin / 3 * 2;
                                    var x = (p1[0] + p2[0]) / 2 * r;
                                    var y = (p1[1] + p2[1]) / 2 * r;
                                    return (React.createElement("text", {className: "l", x: x, y: y}, label));
                                })
                            
                        )
                    )
                )
               );
    }
});

module.exports = Ability;

//# sourceMappingURL=../sw2/Ability.js.map