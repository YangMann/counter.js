/*
 * Counter.js
 * Copyright (c) ZHANG Yang@SJTU
 * A jQuery plugin designed for this counter.
 * Add a [data-role="counter"] attribute or "counter" class
 * to your counter wrap to render this plugin.
 * Params can be passed in when initializing as data-
 */
(function ($) {

    "use strict";

    $.counterHandler = function (elements, index, options) {
        var defaults = {
                keyInc: {
                    1 : 1,
                    2 : 2,
                    3 : 3,
                    4 : 4,
                    5 : 5,
                    6 : 6,
                    7 : 7,
                    8 : 8,
                    9 : 9
                },
                keyDec: {
                    1 : 'q',
                    2 : 'w',
                    3 : 'e',
                    4 : 'r',
                    5 : 't',
                    6 : 'y',
                    7 : 'u',
                    8 : 'i',
                    9 : 'o'
                },
                maxToll: 150,
                tollMask: "normal"
            },
            plugin = this,
            settings = {},
            $elements = $(elements),
            count,
            overrideKeyInc,
            overrideKeyDec,
            keyDecMap = {
                'q': 81,
                'w': 87,
                'e': 69,
                'r': 82,
                't': 84,
                'y': 89,
                'u': 85,
                'i': 73,
                'o': 79
            };

        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);
            count = 0;
            mainHandler(index);
            maskHandler(plugin.settings.tollMask);
        };

        var mainHandler = function (index) {
            if ($elements.length <= 0) {
                return;
            }
            var digit = parseInt($elements.eq(0).find(".digit").text(), 10);
            $elements.prepend('<div class="toll-mark bg-color-blueLight" style="position:absolute;bottom:0;left:0;right:0;width:100%;height:0;"></div>');
            $elements.find(".badge").css("cursor", "pointer");
            $elements.find(".badge").on("click",
                function () {
                    $elements.eq(0).find(".digit").text(++digit);
                    tollDisplay(digit);
                }
            );
            $(window).on("keyup",
                function (e) {
                    if (e.which === plugin.settings.keyInc[index + 1] + 48) {
                        $elements.eq(0).find(".digit").text(++digit);
                        tollDisplay(digit);
                    }
                    if (e.which === keyDecMap[plugin.settings.keyDec[index + 1]]) {
                        if (digit <= 0) {
                            return;
                        }
                        $elements.eq(0).find(".digit").text(--digit);
                        tollDisplay(digit);
                    }
                }
            );
        };

        var maskHandler = function (type) {
            if (type === "inverse") {
                /* !important
                 * this part should be revised, at this point class for color definition has to be the 2nd className
                 */
                var colorClass = $elements.get(0).className.split(" ")[1];
                $elements.removeClass(colorClass).addClass("bg-color-blueLight");
                $elements.find(".toll-mark").removeClass("bg-color-blueLight").addClass(colorClass);
            }
        };

        var tollDisplay = function (digit) {
            if (digit <= 0) {
                $elements.find(".toll-mark").addClass("bg-color-blueLight").css("height", 0);
            } else if (digit <= plugin.settings.maxToll) {
                $elements.find(".toll-mark").css("height", (digit / plugin.settings.maxToll * 100) + '%');
            }
        };

        plugin.init();

    };

    $.fn.counterHandler = function (index, options) {
        return this.each(function () {
            if (undefined == $(this).data('counterHandler')) {
                var plugin = new $.counterHandler(this, index, options);
                $(this).data('counterHandler', plugin);
            }
        });
    };

})(jQuery);

$(window).ready(function () {
    var counterInstances = $("[data-role='counter'], .counter");
    counterInstances.each(function(index, element) {
        var params = {};
        element = $(element);
        params.keyInc = element.data('paramKeyInc');
        params.keyDec = element.data('paramKeyDec');
        if (element.attr('data-maxToll')) {
            params.maxToll = parseInt(element.attr('data-maxToll'), 10);
        }
        params.tollMask = element.attr('data-tollmask');
        element.counterHandler(index, params);
    });
});
