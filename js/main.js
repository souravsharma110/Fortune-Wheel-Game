window.onload = function() {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function() {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);
}

function Parallax(options) {
    options = options || {};
    this.nameSpaces = {
        // wrapper: options.wrapper || '.parallax',
        wrapper: options.wrapper || 'body',
        layers: options.layers || '.parallax-layer',
        deep: options.deep || 'data-parallax-deep'
    };
    this.init = function() {
        var self = this,
            parallaxWrappers = document.querySelectorAll(this.nameSpaces.wrapper);
        for (var i = 0; i < parallaxWrappers.length; i++) {
            (function(i) {
                parallaxWrappers[i].addEventListener('mousemove', function(e) {
                    var x = e.clientX,
                        y = e.clientY,
                        layers = parallaxWrappers[i].querySelectorAll(self.nameSpaces.layers);
                    for (var j = 0; j < layers.length; j++) {
                        (function(j) {
                            var deep = layers[j].getAttribute(self.nameSpaces.deep),
                                disallow = layers[j].getAttribute('data-parallax-disallow'),
                                itemX = (disallow && disallow === 'x') ? 0 : x / deep,
                                itemY = (disallow && disallow === 'y') ? 0 : y / deep;
                            if (disallow && disallow === 'both') return;
                            layers[j].style.transform = 'translateX(' + itemX + '%) translateY(' + itemY + '%)';
                        })(j);
                    }
                })
            })(i);
        }
    };
    this.init();
    return this;
}

jQuery(document).ready(function($) {
    if (window.innerWidth > 1023) {
        new Parallax();
    }
    var click = 0;
    var timeout = 4250;

    $(document).on('click', '#spinIt', function() {
        click++;
        if (click == 1) {
            rotate = 707;
            setTimeout(function() {
                $('.modal').addClass('firstModal');
            }, timeout);
        } else if (click == 2) {
            rotate = 1487;
            setTimeout(function() {
                $('.modal').addClass('secondModal');
            }, timeout);
        } else if (click == 3) {
            rotate = 2293;
            setTimeout(function() {
                $('.modal').addClass('thirdModal');
            }, timeout);
        } else {
            return;
        }
        var btn = $(this);
        btn.prop('disabled', true);
        setTimeout(function() {
            btn.prop('disabled', false);
            $('.modal').addClass('open');
            $('.modal .modal-content').animate({ opacity: 1 }, {
                step: function(now, fx) {
                    $(this).css('-webkit-transform', 'scale(1)');
                    $(this).css('transform', 'scale(1)');
                },
                duration: 'fast'
            }, 'linear');
            setTimeout(function() {
                party.element(document.getElementById("party"), {
                    count: 200,
                    countVariation: 0.5,
                    angleSpan: 80,
                    yVelocity: -300,
                    yVelocityVariation: 1,
                    rotationVelocityLimit: 6,
                    scaleVariation: 0.8
                });
            }, 500);
        }, timeout);
        $('.wheel-sectors').animate({ opacity: 1 }, {
            step: function(now, fx) {
                $(this).css('-webkit-transform', 'rotate(' + rotate + 'deg)');
                $(this).css('transform', 'rotate(' + rotate + 'deg)');
            },
            duration: 'fast'
        }, 'linear');
    });
    $(document).on('click', '.popup-button button:not(.last)', function() {
        $('.modal').removeClass('open firstModal secondModal thirdModal');
        $('.modal .modal-content').removeAttr('style');
        $('.number-dig').text(+$('.number-dig').text() - 1);
    });
});