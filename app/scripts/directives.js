'use strict';
/*global $:false */
angular.module('directives', [])
  .directive('galleria', function() {
    return {
      restrict: 'A',
      link: function(scope, element) {
        element.find('a.galleria').attr('rel', 'gallery').fancybox({
          loop: false
        });
      }
    };
  })
  .directive('kuvausSessio', function($interval) {
    return {
      restrict: 'E',
      transclude: true,
      template: '<div class="sessio" ng-transclude></div>',
      link: function(scope, element, attr) {
        var cache = element.find('a.galleria');
        cache.hide();
        var showHide = function(current, next) {
          next
            .css('position', 'absolute')
            .css('left', 0).css('top', 0)
            .attr('rel', 'gallery')
            .css('z-index', 1)
            .show();
          current
            .css('position', 'relative')
            .css('z-index', 2)
            .animate({
              height: current.height() + 'px',
              opacity: 0
            }, 600, function(){
              current
                .hide()
                .css('opacity', 100)
                .removeAttr('rel')
                .height('auto');
              next
                .css('position', 'static')
                .height('auto');
            });
        };
        var first = cache.filter(':first').show(),
          current = first,
          next = current.next(),
          timeoutId = $interval(function() {
            showHide(current, next);
            current = next;
            next = next.next().length > 0 ? next.next() : first;
          }, attr.timeOut * 1000);

        element.bind('$destroy', function() {
          $interval.cancel(timeoutId);
        });
      }
    };
  })
  .directive('kuva', function() {
    return {
      restrict: 'A',
      replace: true,
      template: '<a class="galleria" href="{{src}}"><img src="{{src}}" class="img-responsive" /></a>',
      scope: true,
      link: function(scope, element, attr) {
        scope.src = attr.src;
      }
    };
  })
  .directive('scrollClick', function() {
    return {
      restrict: 'A',
      link: function(scope, element) {
        element.click(function() {
          var id = element.attr('href');
          $('html, body').stop(true, true).animate({
            scrollTop: $(id).offset().top - 40
          }, 'slow');
        });
      }
    };
  });