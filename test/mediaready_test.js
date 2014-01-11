(function ($) {
	/*
	======== A Handy Little QUnit Reference ========
	http://api.qunitjs.com/

	Test methods:
	module(name, {[setup][ ,teardown]})
	test(name, callback)
	expect(numberOfAssertions)
	stop(increment)
	start(decrement)
	Test assertions:
	ok(value, [message])
	equal(actual, expected, [message])
	notEqual(actual, expected, [message])
	deepEqual(actual, expected, [message])
	notDeepEqual(actual, expected, [message])
	strictEqual(actual, expected, [message])
	notStrictEqual(actual, expected, [message])
	throws(block, [expected], [message])
	 */

	module('jQuery.mediaReady', {
		teardown: function () {
			// reset window width to a constant value
			window.innerWidth = 400;
			// remove any event listeners
			$.mediaReady.options.mediator.off('mediaReady');
		}
	});

	test('provides public API methods', function () {
		var methods = ['init', 'ready', 'besides', 'on', 'once'];

		expect(methods.length);

		methods.forEach(function (val) {
			strictEqual(typeof $.mediaReady[val], 'function', '$.mediaReady.' + val + ' must be a function');
		});
	});

	test('sets breakpoint classes dependant on window.width', function () {
		expect($.mediaReady.options.breakpoints.length);

		// check all breakpoints
		$.mediaReady.options.breakpoints.forEach(function (breakpoint) {
			window.innerWidth = breakpoint.min;

			$.mediaReady.init();
			ok($('body').hasClass(breakpoint.name), 'body should have class ' + breakpoint.name + ' on window.innerWidth=' + window.innerWidth);
		});
	});

	test('can prevent classes on body', function () {
		expect(1);

		$('body').attr('class', 'foo');
		//$.mediaReady.options.appendClasses = false;
		$.mediaReady.init({appendClasses: false});
		ok($('body').attr('class') === 'foo', 'body should not have any classes from $.mediaReady with $.mediaReady.options.appendClasses=false');
	});

	test('$.mediaReady.ready does run on requiredMedias', function () {
		expect(2);

		$.mediaReady.ready('xss', function () {
			ok(true, 'requiredMedias as string - should get triggered once');
		});

		$.mediaReady.ready(['xss', 'xs'], function () {
			ok(true, 'requiredMedias as array - should get triggered once');
		});

		$.mediaReady.ready('md', function () {
			ok(true, 'this should not get triggered');
		});
	});

	test('$.mediaReady.besides does not run on forbiddenMedia', function () {
		expect(0);

		$.mediaReady.besides(['xss', 'xs'], function () {
			ok(true, 'this should never run on window.innerWidth=400');
		});
	});

	test('$.mediaReady.on accepts an array of arguments', function () {
		expect(1);

		$.mediaReady.on(['xss', 'xs'], function () {
			ok(true, 'this should get triggered for xss');
		});
	});

	test('$.mediaReady.on accepts argument as string', function () {
		expect(1);

		window.innerWidth = 800; // for sm
		$.mediaReady.init();

		$.mediaReady.on('sm', function () {
			ok(true, 'should trigger callback of sm');
		});
	});

	test('$.mediaReady.once fires only once', function () {
		expect(1);

		$.mediaReady.once(['all', 'xs', 'sm', 'md'], function () {
			ok(true, 'this should get triggered only once');
		});

		// trigger some calculations
		$.mediaReady.init();
		window.innerWidth = 800;
		$.mediaReady.init();
		window.innerWidth = 1200;
		$.mediaReady.init();
	});

	asyncTest('publishes events on resize', function () {
		expect(1);

		window.innerWidth = 200;
		$.mediaReady.init();

		$.mediaReady.on('all', function () {
			ok(true, 'mediaReady.all should fire on resize');
		});

		window.innerWidth = 800;
		$(window).trigger('resize');

		setTimeout(function () {
			start();
		}, 500);
	});

}(jQuery));