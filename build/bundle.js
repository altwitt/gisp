
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
        select.selectedIndex = -1; // no option should be selected
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * Schedules a callback to run immediately after the component has been updated.
     *
     * The first time the callback runs will be after the initial `onMount`
     */
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    /**
     * Schedules a callback to run immediately before the component is unmounted.
     *
     * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
     * only one that runs inside a server-side component.
     *
     * https://svelte.dev/docs#run-time-svelte-ondestroy
     */
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.55.1' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    function construct_svelte_component_dev(component, props) {
        const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
        try {
            const instance = new component(props);
            if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
                throw new Error(error_message);
            }
            return instance;
        }
        catch (err) {
            const { message } = err;
            if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
                throw new Error(error_message);
            }
            else {
                throw err;
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /**
     * @typedef {Object} WrappedComponent Object returned by the `wrap` method
     * @property {SvelteComponent} component - Component to load (this is always asynchronous)
     * @property {RoutePrecondition[]} [conditions] - Route pre-conditions to validate
     * @property {Object} [props] - Optional dictionary of static props
     * @property {Object} [userData] - Optional user data dictionary
     * @property {bool} _sveltesparouter - Internal flag; always set to true
     */

    /**
     * @callback AsyncSvelteComponent
     * @returns {Promise<SvelteComponent>} Returns a Promise that resolves with a Svelte component
     */

    /**
     * @callback RoutePrecondition
     * @param {RouteDetail} detail - Route detail object
     * @returns {boolean|Promise<boolean>} If the callback returns a false-y value, it's interpreted as the precondition failed, so it aborts loading the component (and won't process other pre-condition callbacks)
     */

    /**
     * @typedef {Object} WrapOptions Options object for the call to `wrap`
     * @property {SvelteComponent} [component] - Svelte component to load (this is incompatible with `asyncComponent`)
     * @property {AsyncSvelteComponent} [asyncComponent] - Function that returns a Promise that fulfills with a Svelte component (e.g. `{asyncComponent: () => import('Foo.svelte')}`)
     * @property {SvelteComponent} [loadingComponent] - Svelte component to be displayed while the async route is loading (as a placeholder); when unset or false-y, no component is shown while component
     * @property {object} [loadingParams] - Optional dictionary passed to the `loadingComponent` component as params (for an exported prop called `params`)
     * @property {object} [userData] - Optional object that will be passed to events such as `routeLoading`, `routeLoaded`, `conditionsFailed`
     * @property {object} [props] - Optional key-value dictionary of static props that will be passed to the component. The props are expanded with {...props}, so the key in the dictionary becomes the name of the prop.
     * @property {RoutePrecondition[]|RoutePrecondition} [conditions] - Route pre-conditions to add, which will be executed in order
     */

    /**
     * Wraps a component to enable multiple capabilities:
     * 1. Using dynamically-imported component, with (e.g. `{asyncComponent: () => import('Foo.svelte')}`), which also allows bundlers to do code-splitting.
     * 2. Adding route pre-conditions (e.g. `{conditions: [...]}`)
     * 3. Adding static props that are passed to the component
     * 4. Adding custom userData, which is passed to route events (e.g. route loaded events) or to route pre-conditions (e.g. `{userData: {foo: 'bar}}`)
     * 
     * @param {WrapOptions} args - Arguments object
     * @returns {WrappedComponent} Wrapped component
     */
    function wrap$1(args) {
        if (!args) {
            throw Error('Parameter args is required')
        }

        // We need to have one and only one of component and asyncComponent
        // This does a "XNOR"
        if (!args.component == !args.asyncComponent) {
            throw Error('One and only one of component and asyncComponent is required')
        }

        // If the component is not async, wrap it into a function returning a Promise
        if (args.component) {
            args.asyncComponent = () => Promise.resolve(args.component);
        }

        // Parameter asyncComponent and each item of conditions must be functions
        if (typeof args.asyncComponent != 'function') {
            throw Error('Parameter asyncComponent must be a function')
        }
        if (args.conditions) {
            // Ensure it's an array
            if (!Array.isArray(args.conditions)) {
                args.conditions = [args.conditions];
            }
            for (let i = 0; i < args.conditions.length; i++) {
                if (!args.conditions[i] || typeof args.conditions[i] != 'function') {
                    throw Error('Invalid parameter conditions[' + i + ']')
                }
            }
        }

        // Check if we have a placeholder component
        if (args.loadingComponent) {
            args.asyncComponent.loading = args.loadingComponent;
            args.asyncComponent.loadingParams = args.loadingParams || undefined;
        }

        // Returns an object that contains all the functions to execute too
        // The _sveltesparouter flag is to confirm the object was created by this router
        const obj = {
            component: args.asyncComponent,
            userData: args.userData,
            conditions: (args.conditions && args.conditions.length) ? args.conditions : undefined,
            props: (args.props && Object.keys(args.props).length) ? args.props : {},
            _sveltesparouter: true
        };

        return obj
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    function parse(str, loose) {
    	if (str instanceof RegExp) return { keys:false, pattern:str };
    	var c, o, tmp, ext, keys=[], pattern='', arr = str.split('/');
    	arr[0] || arr.shift();

    	while (tmp = arr.shift()) {
    		c = tmp[0];
    		if (c === '*') {
    			keys.push('wild');
    			pattern += '/(.*)';
    		} else if (c === ':') {
    			o = tmp.indexOf('?', 1);
    			ext = tmp.indexOf('.', 1);
    			keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
    			pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
    			if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
    		} else {
    			pattern += '/' + tmp;
    		}
    	}

    	return {
    		keys: keys,
    		pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
    	};
    }

    /* node_modules\svelte-spa-router\Router.svelte generated by Svelte v3.55.1 */

    const { Error: Error_1, Object: Object_1, console: console_1$1 } = globals;

    // (267:0) {:else}
    function create_else_block(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [/*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*props*/ 4)
    			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*props*/ ctx[2])])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(267:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (260:0) {#if componentParams}
    function create_if_block(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [{ params: /*componentParams*/ ctx[1] }, /*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*componentParams, props*/ 6)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*componentParams*/ 2 && { params: /*componentParams*/ ctx[1] },
    					dirty & /*props*/ 4 && get_spread_object(/*props*/ ctx[2])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(260:0) {#if componentParams}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*componentParams*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function wrap(component, userData, ...conditions) {
    	// Use the new wrap method and show a deprecation warning
    	// eslint-disable-next-line no-console
    	console.warn('Method `wrap` from `svelte-spa-router` is deprecated and will be removed in a future version. Please use `svelte-spa-router/wrap` instead. See http://bit.ly/svelte-spa-router-upgrading');

    	return wrap$1({ component, userData, conditions });
    }

    /**
     * @typedef {Object} Location
     * @property {string} location - Location (page/view), for example `/book`
     * @property {string} [querystring] - Querystring from the hash, as a string not parsed
     */
    /**
     * Returns the current location from the hash.
     *
     * @returns {Location} Location object
     * @private
     */
    function getLocation() {
    	const hashPosition = window.location.href.indexOf('#/');

    	let location = hashPosition > -1
    	? window.location.href.substr(hashPosition + 1)
    	: '/';

    	// Check if there's a querystring
    	const qsPosition = location.indexOf('?');

    	let querystring = '';

    	if (qsPosition > -1) {
    		querystring = location.substr(qsPosition + 1);
    		location = location.substr(0, qsPosition);
    	}

    	return { location, querystring };
    }

    const loc = readable(null, // eslint-disable-next-line prefer-arrow-callback
    function start(set) {
    	set(getLocation());

    	const update = () => {
    		set(getLocation());
    	};

    	window.addEventListener('hashchange', update, false);

    	return function stop() {
    		window.removeEventListener('hashchange', update, false);
    	};
    });

    const location = derived(loc, $loc => $loc.location);
    const querystring = derived(loc, $loc => $loc.querystring);
    const params = writable(undefined);

    async function push(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	// Note: this will include scroll state in history even when restoreScrollState is false
    	history.replaceState(
    		{
    			...history.state,
    			__svelte_spa_router_scrollX: window.scrollX,
    			__svelte_spa_router_scrollY: window.scrollY
    		},
    		undefined
    	);

    	window.location.hash = (location.charAt(0) == '#' ? '' : '#') + location;
    }

    async function pop() {
    	// Execute this code when the current call stack is complete
    	await tick();

    	window.history.back();
    }

    async function replace(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	const dest = (location.charAt(0) == '#' ? '' : '#') + location;

    	try {
    		const newState = { ...history.state };
    		delete newState['__svelte_spa_router_scrollX'];
    		delete newState['__svelte_spa_router_scrollY'];
    		window.history.replaceState(newState, undefined, dest);
    	} catch(e) {
    		// eslint-disable-next-line no-console
    		console.warn('Caught exception while replacing the current page. If you\'re running this in the Svelte REPL, please note that the `replace` method might not work in this environment.');
    	}

    	// The method above doesn't trigger the hashchange event, so let's do that manually
    	window.dispatchEvent(new Event('hashchange'));
    }

    function link(node, opts) {
    	opts = linkOpts(opts);

    	// Only apply to <a> tags
    	if (!node || !node.tagName || node.tagName.toLowerCase() != 'a') {
    		throw Error('Action "link" can only be used with <a> tags');
    	}

    	updateLink(node, opts);

    	return {
    		update(updated) {
    			updated = linkOpts(updated);
    			updateLink(node, updated);
    		}
    	};
    }

    function restoreScroll(state) {
    	// If this exists, then this is a back navigation: restore the scroll position
    	if (state) {
    		window.scrollTo(state.__svelte_spa_router_scrollX, state.__svelte_spa_router_scrollY);
    	} else {
    		// Otherwise this is a forward navigation: scroll to top
    		window.scrollTo(0, 0);
    	}
    }

    // Internal function used by the link function
    function updateLink(node, opts) {
    	let href = opts.href || node.getAttribute('href');

    	// Destination must start with '/' or '#/'
    	if (href && href.charAt(0) == '/') {
    		// Add # to the href attribute
    		href = '#' + href;
    	} else if (!href || href.length < 2 || href.slice(0, 2) != '#/') {
    		throw Error('Invalid value for "href" attribute: ' + href);
    	}

    	node.setAttribute('href', href);

    	node.addEventListener('click', event => {
    		// Prevent default anchor onclick behaviour
    		event.preventDefault();

    		if (!opts.disabled) {
    			scrollstateHistoryHandler(event.currentTarget.getAttribute('href'));
    		}
    	});
    }

    // Internal function that ensures the argument of the link action is always an object
    function linkOpts(val) {
    	if (val && typeof val == 'string') {
    		return { href: val };
    	} else {
    		return val || {};
    	}
    }

    /**
     * The handler attached to an anchor tag responsible for updating the
     * current history state with the current scroll state
     *
     * @param {string} href - Destination
     */
    function scrollstateHistoryHandler(href) {
    	// Setting the url (3rd arg) to href will break clicking for reasons, so don't try to do that
    	history.replaceState(
    		{
    			...history.state,
    			__svelte_spa_router_scrollX: window.scrollX,
    			__svelte_spa_router_scrollY: window.scrollY
    		},
    		undefined
    	);

    	// This will force an update as desired, but this time our scroll state will be attached
    	window.location.hash = href;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, []);
    	let { routes = {} } = $$props;
    	let { prefix = '' } = $$props;
    	let { restoreScrollState = false } = $$props;

    	/**
     * Container for a route: path, component
     */
    	class RouteItem {
    		/**
     * Initializes the object and creates a regular expression from the path, using regexparam.
     *
     * @param {string} path - Path to the route (must start with '/' or '*')
     * @param {SvelteComponent|WrappedComponent} component - Svelte component for the route, optionally wrapped
     */
    		constructor(path, component) {
    			if (!component || typeof component != 'function' && (typeof component != 'object' || component._sveltesparouter !== true)) {
    				throw Error('Invalid component object');
    			}

    			// Path must be a regular or expression, or a string starting with '/' or '*'
    			if (!path || typeof path == 'string' && (path.length < 1 || path.charAt(0) != '/' && path.charAt(0) != '*') || typeof path == 'object' && !(path instanceof RegExp)) {
    				throw Error('Invalid value for "path" argument - strings must start with / or *');
    			}

    			const { pattern, keys } = parse(path);
    			this.path = path;

    			// Check if the component is wrapped and we have conditions
    			if (typeof component == 'object' && component._sveltesparouter === true) {
    				this.component = component.component;
    				this.conditions = component.conditions || [];
    				this.userData = component.userData;
    				this.props = component.props || {};
    			} else {
    				// Convert the component to a function that returns a Promise, to normalize it
    				this.component = () => Promise.resolve(component);

    				this.conditions = [];
    				this.props = {};
    			}

    			this._pattern = pattern;
    			this._keys = keys;
    		}

    		/**
     * Checks if `path` matches the current route.
     * If there's a match, will return the list of parameters from the URL (if any).
     * In case of no match, the method will return `null`.
     *
     * @param {string} path - Path to test
     * @returns {null|Object.<string, string>} List of paramters from the URL if there's a match, or `null` otherwise.
     */
    		match(path) {
    			// If there's a prefix, check if it matches the start of the path.
    			// If not, bail early, else remove it before we run the matching.
    			if (prefix) {
    				if (typeof prefix == 'string') {
    					if (path.startsWith(prefix)) {
    						path = path.substr(prefix.length) || '/';
    					} else {
    						return null;
    					}
    				} else if (prefix instanceof RegExp) {
    					const match = path.match(prefix);

    					if (match && match[0]) {
    						path = path.substr(match[0].length) || '/';
    					} else {
    						return null;
    					}
    				}
    			}

    			// Check if the pattern matches
    			const matches = this._pattern.exec(path);

    			if (matches === null) {
    				return null;
    			}

    			// If the input was a regular expression, this._keys would be false, so return matches as is
    			if (this._keys === false) {
    				return matches;
    			}

    			const out = {};
    			let i = 0;

    			while (i < this._keys.length) {
    				// In the match parameters, URL-decode all values
    				try {
    					out[this._keys[i]] = decodeURIComponent(matches[i + 1] || '') || null;
    				} catch(e) {
    					out[this._keys[i]] = null;
    				}

    				i++;
    			}

    			return out;
    		}

    		/**
     * Dictionary with route details passed to the pre-conditions functions, as well as the `routeLoading`, `routeLoaded` and `conditionsFailed` events
     * @typedef {Object} RouteDetail
     * @property {string|RegExp} route - Route matched as defined in the route definition (could be a string or a reguar expression object)
     * @property {string} location - Location path
     * @property {string} querystring - Querystring from the hash
     * @property {object} [userData] - Custom data passed by the user
     * @property {SvelteComponent} [component] - Svelte component (only in `routeLoaded` events)
     * @property {string} [name] - Name of the Svelte component (only in `routeLoaded` events)
     */
    		/**
     * Executes all conditions (if any) to control whether the route can be shown. Conditions are executed in the order they are defined, and if a condition fails, the following ones aren't executed.
     * 
     * @param {RouteDetail} detail - Route detail
     * @returns {boolean} Returns true if all the conditions succeeded
     */
    		async checkConditions(detail) {
    			for (let i = 0; i < this.conditions.length; i++) {
    				if (!await this.conditions[i](detail)) {
    					return false;
    				}
    			}

    			return true;
    		}
    	}

    	// Set up all routes
    	const routesList = [];

    	if (routes instanceof Map) {
    		// If it's a map, iterate on it right away
    		routes.forEach((route, path) => {
    			routesList.push(new RouteItem(path, route));
    		});
    	} else {
    		// We have an object, so iterate on its own properties
    		Object.keys(routes).forEach(path => {
    			routesList.push(new RouteItem(path, routes[path]));
    		});
    	}

    	// Props for the component to render
    	let component = null;

    	let componentParams = null;
    	let props = {};

    	// Event dispatcher from Svelte
    	const dispatch = createEventDispatcher();

    	// Just like dispatch, but executes on the next iteration of the event loop
    	async function dispatchNextTick(name, detail) {
    		// Execute this code when the current call stack is complete
    		await tick();

    		dispatch(name, detail);
    	}

    	// If this is set, then that means we have popped into this var the state of our last scroll position
    	let previousScrollState = null;

    	let popStateChanged = null;

    	if (restoreScrollState) {
    		popStateChanged = event => {
    			// If this event was from our history.replaceState, event.state will contain
    			// our scroll history. Otherwise, event.state will be null (like on forward
    			// navigation)
    			if (event.state && (event.state.__svelte_spa_router_scrollY || event.state.__svelte_spa_router_scrollX)) {
    				previousScrollState = event.state;
    			} else {
    				previousScrollState = null;
    			}
    		};

    		// This is removed in the destroy() invocation below
    		window.addEventListener('popstate', popStateChanged);

    		afterUpdate(() => {
    			restoreScroll(previousScrollState);
    		});
    	}

    	// Always have the latest value of loc
    	let lastLoc = null;

    	// Current object of the component loaded
    	let componentObj = null;

    	// Handle hash change events
    	// Listen to changes in the $loc store and update the page
    	// Do not use the $: syntax because it gets triggered by too many things
    	const unsubscribeLoc = loc.subscribe(async newLoc => {
    		lastLoc = newLoc;

    		// Find a route matching the location
    		let i = 0;

    		while (i < routesList.length) {
    			const match = routesList[i].match(newLoc.location);

    			if (!match) {
    				i++;
    				continue;
    			}

    			const detail = {
    				route: routesList[i].path,
    				location: newLoc.location,
    				querystring: newLoc.querystring,
    				userData: routesList[i].userData,
    				params: match && typeof match == 'object' && Object.keys(match).length
    				? match
    				: null
    			};

    			// Check if the route can be loaded - if all conditions succeed
    			if (!await routesList[i].checkConditions(detail)) {
    				// Don't display anything
    				$$invalidate(0, component = null);

    				componentObj = null;

    				// Trigger an event to notify the user, then exit
    				dispatchNextTick('conditionsFailed', detail);

    				return;
    			}

    			// Trigger an event to alert that we're loading the route
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoading', Object.assign({}, detail));

    			// If there's a component to show while we're loading the route, display it
    			const obj = routesList[i].component;

    			// Do not replace the component if we're loading the same one as before, to avoid the route being unmounted and re-mounted
    			if (componentObj != obj) {
    				if (obj.loading) {
    					$$invalidate(0, component = obj.loading);
    					componentObj = obj;
    					$$invalidate(1, componentParams = obj.loadingParams);
    					$$invalidate(2, props = {});

    					// Trigger the routeLoaded event for the loading component
    					// Create a copy of detail so we don't modify the object for the dynamic route (and the dynamic route doesn't modify our object too)
    					dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    						component,
    						name: component.name,
    						params: componentParams
    					}));
    				} else {
    					$$invalidate(0, component = null);
    					componentObj = null;
    				}

    				// Invoke the Promise
    				const loaded = await obj();

    				// Now that we're here, after the promise resolved, check if we still want this component, as the user might have navigated to another page in the meanwhile
    				if (newLoc != lastLoc) {
    					// Don't update the component, just exit
    					return;
    				}

    				// If there is a "default" property, which is used by async routes, then pick that
    				$$invalidate(0, component = loaded && loaded.default || loaded);

    				componentObj = obj;
    			}

    			// Set componentParams only if we have a match, to avoid a warning similar to `<Component> was created with unknown prop 'params'`
    			// Of course, this assumes that developers always add a "params" prop when they are expecting parameters
    			if (match && typeof match == 'object' && Object.keys(match).length) {
    				$$invalidate(1, componentParams = match);
    			} else {
    				$$invalidate(1, componentParams = null);
    			}

    			// Set static props, if any
    			$$invalidate(2, props = routesList[i].props);

    			// Dispatch the routeLoaded event then exit
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    				component,
    				name: component.name,
    				params: componentParams
    			})).then(() => {
    				params.set(componentParams);
    			});

    			return;
    		}

    		// If we're still here, there was no match, so show the empty component
    		$$invalidate(0, component = null);

    		componentObj = null;
    		params.set(undefined);
    	});

    	onDestroy(() => {
    		unsubscribeLoc();
    		popStateChanged && window.removeEventListener('popstate', popStateChanged);
    	});

    	const writable_props = ['routes', 'prefix', 'restoreScrollState'];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	function routeEvent_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function routeEvent_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
    		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
    	};

    	$$self.$capture_state = () => ({
    		readable,
    		writable,
    		derived,
    		tick,
    		_wrap: wrap$1,
    		wrap,
    		getLocation,
    		loc,
    		location,
    		querystring,
    		params,
    		push,
    		pop,
    		replace,
    		link,
    		restoreScroll,
    		updateLink,
    		linkOpts,
    		scrollstateHistoryHandler,
    		onDestroy,
    		createEventDispatcher,
    		afterUpdate,
    		parse,
    		routes,
    		prefix,
    		restoreScrollState,
    		RouteItem,
    		routesList,
    		component,
    		componentParams,
    		props,
    		dispatch,
    		dispatchNextTick,
    		previousScrollState,
    		popStateChanged,
    		lastLoc,
    		componentObj,
    		unsubscribeLoc
    	});

    	$$self.$inject_state = $$props => {
    		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
    		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
    		if ('component' in $$props) $$invalidate(0, component = $$props.component);
    		if ('componentParams' in $$props) $$invalidate(1, componentParams = $$props.componentParams);
    		if ('props' in $$props) $$invalidate(2, props = $$props.props);
    		if ('previousScrollState' in $$props) previousScrollState = $$props.previousScrollState;
    		if ('popStateChanged' in $$props) popStateChanged = $$props.popStateChanged;
    		if ('lastLoc' in $$props) lastLoc = $$props.lastLoc;
    		if ('componentObj' in $$props) componentObj = $$props.componentObj;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*restoreScrollState*/ 32) {
    			// Update history.scrollRestoration depending on restoreScrollState
    			history.scrollRestoration = restoreScrollState ? 'manual' : 'auto';
    		}
    	};

    	return [
    		component,
    		componentParams,
    		props,
    		routes,
    		prefix,
    		restoreScrollState,
    		routeEvent_handler,
    		routeEvent_handler_1
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
    			routes: 3,
    			prefix: 4,
    			restoreScrollState: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get routes() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routes(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get prefix() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set prefix(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get restoreScrollState() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set restoreScrollState(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Home.svelte generated by Svelte v3.55.1 */

    function create_fragment$4(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    let chapters = [
    	{ id: 1, text: `Chapter 1: Conceptual Foundations` },
    	{ id: 2, text: `Chapter 2: Geospatial Data Fundamentals` },
    	{ id: 3, text: `Chapter 3: Cartography and Visualization` },
    	{ id: 4, text: `Chapter 4: Data Acquisition` },
    	{ id: 5, text: `Chapter 5: Data Manipulation` },
    	{ id: 6, text: `Chapter 6: Analytical Methods` },
    	{ id: 7, text: `Chapter 7: Database Design and Management` }
    ];

    const quiz = [
    	[
    		{
    			question: 'Georeferencing',
    			answer: '101- associating a map or image with spatial location'
    		},
    		{
    			question: 'control points',
    			answer:
    				'101- points come in pairs that match the spatial location with a point on an unreferenced image or map'
    		},
    		{
    			question: 'Spatial Reference Systems (SRS)',
    			answer:
    				'101- coordinate based local, regional, or global system used to location geographical entities (aka Coordinate Reference System (CRS))'
    		},
    		{
    			question: 'Coordinate Reference System (CRS)',
    			answer:
    				'101- coordinate based local, regional, or global system used to location geographical entities (aka Spatial Reference Systems (SRS))'
    		},
    		{
    			question: 'International Terrestrial Reference System (ITRS)',
    			answer:
    				'101- a three-dimensional coordinate system with a well-defined origin (the center of mass of the Earth) and three orthogonal coordinate axes (X,Y,Z)'
    		},
    		{
    			question: 'Map projection',
    			answer: '101- transforming coordinated from a curved surface (Earth) to a flat map'
    		},
    		{
    			question: 'Horizontal datum',
    			answer:
    				'101- model of the earth as a spheroid (2 components, reference ellipsoid and a set of survey points both the shape of the spheroid and its position relative to the earth)'
    		},
    		{
    			question: 'Vertical Datum',
    			answer: '101- reference point for measuring elevations'
    		},
    		{
    			question: 'NAVD88',
    			answer: '101- Gravity based geodetic datum in North America'
    		},
    		{
    			question: 'WGS 84 (World Geodetic System)',
    			answer: '101- reference coordinate system used by the Global Positioning System (GPS)'
    		},
    		{
    			question: 'SRID integer',
    			answer:
    				'101- Spatial reference system id numbers, including EPSG codes defined by the International Association of Oil and Gas Producers'
    		},
    		{
    			question: 'types of distortion',
    			answer: '101- Distance, Direction, Shape, Area (sometimes bearing and scale)'
    		},
    		{
    			question: 'Mercator Projection- distortions',
    			answer: '101- preserves shape and direction, area gets distorted'
    		},
    		{
    			question: 'Mercator Projection',
    			answer: '101- projecting the Earth onto a cylinder tangent to a meridian'
    		},
    		{
    			question: 'Azimuthal Projection- distortions',
    			answer: '101- distance from center is true, other properties distort with distance'
    		},
    		{
    			question: 'Azimuthal Projection',
    			answer:
    				'101- planar or tangent (meaning they are formed when a flat piece of paper is placed on top of the globe and a light source projects the surrounding areas on to a map.) Either the North Pole or the South pole is orientated at the center of the map, giving the viewer an impression of looking up or down at Earth.'
    		},
    		{
    			question: 'Cylindrical Projection- distortions',
    			answer:
    				'101- preserve area and shape, distance gets distorted, especially on upper and lower regions of the map'
    		},
    		{
    			question: 'Cylindrical Projection',
    			answer:
    				'101- 2 types Tangent (1 intersect) and Secant (2 intersects)Straight meridians and parallelsmeridians are equally spaced while parallels are not'
    		},
    		{
    			question: 'Conical Projection- distortions',
    			answer:
    				'101- preserves direction and area in limited areas, distorts distance and scale except along standard parallels'
    		},
    		{
    			question: 'Conic Projections',
    			answer: '101- mapped to equally spaced lines by projecting a spherical surface onto a cone'
    		},
    		{
    			question: 'Choosing a Projection- Low LATITUDE, (near Equator)',
    			answer: '101- use conical projection'
    		},
    		{
    			question: 'Choosing a Projection- High LATITUDE, Polar Regions',
    			answer: '101- use azimuthal planar projections'
    		},
    		{
    			question: 'Choosing a Projection- EXTENT, broad East-West (e.g. USA)',
    			answer: '101- use conical projection'
    		},
    		{
    			question: 'Choosing a Projection- EXTENT, broad North-South (e.g. Africa)',
    			answer: '101- use transverse-case cylindrical projection'
    		},
    		{
    			question:
    				'Choosing a Projection- THEMATIC, analysis that compares different values in different locations',
    			answer: '101- use an equal-area projection'
    		},
    		{
    			question: 'Discrete features',
    			answer: '102- feature has a definable boundary (think, vector)'
    		},
    		{
    			question: 'continuous phenomena',
    			answer:
    				'102- each location is a measure of something, often temperature or elevation (think raster, but not always)'
    		},
    		{
    			question: 'Geoid',
    			answer:
    				"103- the shape that the surface of the oceans would take under the influence of Earth's gravitation and rotation alone (absent of the influence of wind or tide)"
    		},
    		{
    			question: 'Mean Sea Level (MSL)',
    			answer:
    				"103- is determined by referencing the geoid model which registers ocean's water level at coastal places using tide gauges"
    		},
    		{
    			question: 'Reference Ellipsoid',
    			answer:
    				'103- is a mathematically defined surface that approximates the geoid (a truer model of shape that geoid)'
    		},
    		{
    			question: 'oblate ellipsoid',
    			answer:
    				'103- fits the geiod model to a first order approximationformed when an ellipse is rotated about its minor axis (The shape of the Earth, slightly bulging at the Equator.)'
    		},
    		{
    			question: 'sphere',
    			answer:
    				'103- can be seen from dimensions of the Earth ellipsoidthe semi-major axis (a) and semi-minor axis (b) differ by little more than 21 kilometers'
    		},
    		{
    			question: 'first (direct) geodetic problem',
    			answer:
    				'103- Given a point (coordinates) and direction (azimuth) and distance from that point to a second point, determine the coordinates of a second pointBe prepared for Word Problems like this one'
    		},
    		{
    			question: 'Second (inverse) geodetic problem',
    			answer:
    				'103- given two points, determine the azimuth and length of the line that connects them (line may be straight, arc, or geodesic)Be prepared for Word Problems like this one'
    		},
    		{
    			question: 'Geomatics',
    			answer:
    				'104- branch of science (and technology) of collection, analysis, interpretation of geographic information(includes surveying, mapping, remote sensing, GIS, GPS)'
    		},
    		{
    			question: 'GPS (global positioning system)',
    			answer:
    				'104- A system that determines the precise position of something on Earth through a series of satellites, tracking stations, and receivers.'
    		}
    	],
    	[
    		{
    			question: 'Spatial Modeling',
    			answer:
    				'201- A methodology or set of analytical procedures used to derive information about spatial relationships between geographic phenomena.'
    		},
    		{
    			question: 'Types of spatial models',
    			answer: '201-VectorRasterPixelGeodatabaseGridTINTopologicalHierarchicalNetworkObject Oriented'
    		},
    		{
    			question: 'Vector Spatial Modeling',
    			answer: '201- coordinated based data model (points, lines, and polygons)'
    		},
    		{
    			question: 'Vector Spatial Modeling- Points',
    			answer:
    				'201- Discrete locations represented by a coordinate pair, attributes can be associated(e.g. Sign, city centers, geocoding addresses)'
    		},
    		{
    			question: 'Vector Spatial Modeling- Lines',
    			answer:
    				'201- Linear features composed of an ordered list of vertices, attributes can be associated(e.g. rivers, roads, utility lines)'
    		},
    		{
    			question: 'Vector Spatial Modeling- Polygons',
    			answer:
    				'201- composed of nodes and vertices forming bounded areas; start and end node are the same, attributes can be associated(e.g. water bodies, parcels, land masses)'
    		},
    		{
    			question: 'Raster Spatial Modeling',
    			answer:
    				'201- composed of a rectangular array of regularly spaced square grid cells, each cell having an independent value (attribute)Single or multi bandRaster coordinated are stored by ordering the matrix(e.g. elevation, temperature)'
    		},
    		{
    			question: 'Pixel Spatial Modeling',
    			answer:
    				'201- smallest resolvable piece of scanned imagea pixel is always a cell but a cell is not always a pixel'
    		},
    		{
    			question: 'Geodatabase Spatial Modeling',
    			answer:
    				'201- object oriented spatial modelBasic Components- feature classes, feature datasets, non-spatial tablesComplex Components- topology, relation ship classes, geometric networksRelationship Classes- model real-world relationships that exist between objects (such as parcels and buildings)'
    		},
    		{
    			question: 'Grid Spatial Modeling',
    			answer:
    				'201- parallel and perpendicular lines for reference as a map projection or coordinate system'
    		},
    		{
    			question: 'Triangulated Irregular Network (TIN) Spatial Modeling',
    			answer:
    				'201- Composite vector data that approximate the terrain with a set of contiguous, non-overlapping (Delaunay) triangles, circumcircle can not contain more than three pointsMay be asked to create Delaunay Triangles'
    		},
    		{
    			question: 'Advantages of TIN Spatial Modeling',
    			answer:
    				'201- small areas with high precision elevation data,more efficient storage than DEM or contour lines'
    		},
    		{
    			question: 'Disadvantages of TIN Spatial Modeling',
    			answer:
    				'201- high cost,requires highly accurate data source,TIN production is computing intensive'
    		},
    		{
    			question: 'Topological Spatial Modeling',
    			answer:
    				'201- topology is implemented through a set of rules that define how features may share a geographic space and a set of editing tools that work with features that share geometry in an integrated fashion. (ESRI). The physical and logical design of a network; examples include mesh, bus, ring and star; the physical layout of the network devices and the vectoring, and how all the components communicate with each other'
    		},
    		{
    			question: 'Hierarchical Spatial Modeling',
    			answer: '201- database that stores related information in a tree-like structure'
    		},
    		{
    			question: 'Network Spatial Modeling',
    			answer:
    				'201- collection of topologically connected network elements (edges, junctions, turns)Each element is associated with a collection of network attributes'
    		},
    		{
    			question: 'Object Oriented Spatial Modeling',
    			answer:
    				'201- data management structure, stores data as objects (classes), instead of rows and tables like a relational database(e.g. SQL Server, Oracle, PostgreSQL)'
    		},
    		{
    			question: 'Bolstad Spatial Modeling- Cartographic Model',
    			answer:
    				'201- Temporally Static, combined spatial datasets, operations and functions for problem-solving'
    		},
    		{
    			question: 'Bolstad Spatial Modeling- Spatio-temporal Models',
    			answer: '201- dynamic in time and spacetime-driven processes'
    		},
    		{
    			question: 'Bolstad Spatial Modeling- Network Models',
    			answer: '210- modeling of resources (flow, accumulation) as limited to networks'
    		},
    		{
    			question: 'Goodchild Spatial Modeling- Data Models',
    			answer: '201- entities and fields as conceptual models'
    		},
    		{
    			question: 'Goodchild Spatial Modeling- Static Modeling',
    			answer: '201- taking inputs to transform them into outputs using sets of tools and functions'
    		},
    		{
    			question: 'Goodchild Spatial Modeling- Dynamic Modeling',
    			answer:
    				'201- iterative, sets of initial conditions, apply transformations to obtain a series of predictions at time intervals'
    		},
    		{
    			question: 'DeMers Spatial Modeling',
    			answer:
    				'201- Based on purpose descriptive- passive, description of the study area,perspective- active, imposing beat solution'
    		},
    		{
    			question: 'DeMers Spatial Modeling- Methodology Stochastic',
    			answer:
    				'201- based on statistical probability deterministic- based on knowing functional linkages and interaction'
    		},
    		{
    			question: 'DeMers Spatial Modeling- logic inductive',
    			answer:
    				'201- general models based on individual data, deductive- from general to specific using known factor and relationships'
    		},
    		{
    			question: 'Types of Spatial Data Relationships',
    			answer:
    				'202- 1 to 1- Each object of the origin table can be related to 0 or 1 object of the destination table.. 1 to Many- Each object of the origin table can be related to multiple objects in the destination table. Many to Many- Multiple objects in the origin table can be related to multiple objects in the destination table'
    		},
    		{
    			question: 'Equal Spatial Data Relationships (topological relations)',
    			answer: '202- a=b (topologically equal)'
    		},
    		{
    			question: 'Disjointed Spatial Data Relationships (topological relations)',
    			answer:
    				'202- a and b are disjointed, have no point in common. They form a set of disconnected geometries.'
    		},
    		{
    			question: 'Intersects Spatial Data Relationships (topological relations)',
    			answer: '202- some common interior points'
    		},
    		{
    			question: 'Touches Spatial Data Relationships (topological relations)',
    			answer: '202- a touches b, at least one boundary point in common but no interior points'
    		},
    		{
    			question: 'Contains Spatial Data Relationships (topological relations)',
    			answer: '202- feature b is within feature a'
    		},
    		{
    			question: 'Covers by Spatial Data Relationships (topological relations)',
    			answer:
    				'202- b lies in the interior of a (extends Contains)Other definitions: no points of b lie in the exterior of a, or Every point of b is a point of (the interior of) a'
    		},
    		{
    			question: 'Covered by Spatial Data Relationships (topological relations)',
    			answer: '202- every point of feature b is a point of feature a'
    		},
    		{
    			question: 'Within Spatial Data Relationships (topological relations)',
    			answer: '202- a is within b'
    		},
    		{
    			question: 'Crosses Spatial Data Relationships (topological relations)',
    			answer: '202- a crosses b at some point'
    		},
    		{
    			question: 'Overlaps Spatial Data Relationships (topological relations)',
    			answer: '202- a and b have common interior points'
    		},
    		{
    			question: 'Basic Topology Rules- Polygons',
    			answer:
    				'202- Must: be larger than cluster tolerance, be covered by feature class of, cover each other, be cover by, boundary must be covered by, area boundary must be covered by, contains pointMust not: overlap, have gaps, not overlap with'
    		},
    		{
    			question: 'Basic Topology Rules- Lines',
    			answer:
    				'202- Must: be larger than cluster tolerance, be covered by feature class of, be covered by boundary of, be inside, endpoint must be covered by, be single part. Must not: overlap, intersect, not intersect with, have dangles, have pseudo nodes, intersect or touch interior, intersect or have interior with, overlap with, self-overlap, self-intersect'
    		},
    		{
    			question: 'Basic Topology Rules- Points',
    			answer:
    				'202- Must: coincide with, be disjoint, be covered by boundary of, be properly inside, be covered by endpoint of, be covered by line'
    		},
    		{
    			question: 'Geometric Accuracy- Data Quality',
    			answer:
    				"203- how close the x-y values of a data set correspond to the actual locations on the earth's surface"
    		},
    		{
    			question: 'Root Mean Squared Error (RMS)- Data Quality',
    			answer:
    				'203- a calculation to describe the difference between the measurement and the true value, applies to georectificationcalculated as the square root of the average squared errors'
    		},
    		{
    			question: 'Thematic Accuracy- Data Quality',
    			answer: '203- accuracy of non-spatial (attribute) data'
    		},
    		{
    			question: 'Resolution- Data Quality',
    			answer: '203- smallest separation between two coordinate values (e.g. raster cell size)'
    		},
    		{
    			question: 'Precision- Data Quality',
    			answer: '203- level of measurement and exactness of attribute data'
    		},
    		{
    			question: 'Fitness for Use- Data Quality',
    			answer: '203- Does the data fulfill the needs of the project'
    		},
    		{
    			question: 'Confusion Matrix- Data Quality',
    			answer: '203- assesses accuracy of image classification based on additional ground truths'
    		},
    		{
    			question: 'Quality Assurance- Data Quality',
    			answer:
    				'203- Process oriented and focuses on defect preventionEstablished a good quality management system and assessment of its adequacy- periodic audits- managerial tool'
    		},
    		{
    			question: 'Quality Control- Data Quality',
    			answer:
    				'203- product oriented and focuses on defect identificationFinding and eliminating sources of quality problems through tools and equipment- corrective tool'
    		},
    		{
    			question: 'Imprecision- Data Quality',
    			answer:
    				'203- all data is taken from a 3D globe and transferred to a 2D surface through spatial transformations (projections and datums) which caused inherent distortions with the data'
    		},
    		{
    			question: 'Uncertainty- Data Quality',
    			answer:
    				'203- The GIS data was created/collected at a certain point of time, may already be out of date'
    		},
    		{
    			question: 'Data Resolution',
    			answer:
    				'204- the cell size of a rasterthat area covered by the ground represented by just one cell'
    		},
    		{
    			question: 'Data Validation',
    			answer:
    				'205- to ensure the accuracy of the data is preserved,-ground observations to ensure data accuracy-can also be compared to model generated data (less accurate)'
    		},
    		{
    			question: 'Data Uncertainty',
    			answer:
    				'205- difference between real world and GIS,-may be visible from the original data or measuring that data,-assumptions made when creating data-model structure-retrieval errors, sampling errors, and inadequate ground observations'
    		},
    		{
    			question: 'Metadata',
    			answer:
    				'206- information that describes the content quality, condition, origin, and other characteristics of data, databases, or other pieces of information'
    		},
    		{
    			question: 'Temporal Data',
    			answer: '207- data that represents a state in time (e.g. rain fall for one day)'
    		},
    		{
    			question: 'Federal Geographic Data Committee (FGDC)',
    			answer:
    				'208- purpose is to build a data infrastructure for improved public and private sector application of geospatial data and decision-makingInclude title, abstract, date, geographic extent and projection info, attribute label definitions and domain values'
    		},
    		{
    			question: 'Content Standard for Digital Geospatial Metadata (CSDGM)',
    			answer:
    				'208-ISO 19115- developed for documenting vector and point data and geospatial services (web-mapping, data catalogs, and data modeling applications)ISO 19115-2 adds elements to describe imagery and grid data, as well as data collected using instruments (monitoring stations and measurement devices)'
    		},
    		{
    			question: 'Open GIS Consortium (OGC)',
    			answer: '208- Describes basic data model for holding geographic data (such as KML)'
    		}
    	],
    	[
    		{
    			question: 'Thematic Map',
    			answer:
    				'301- map especially designed to show a particular theme connected with a geographic area (population, income level)'
    		},
    		{
    			question: 'Choloropleth Maps',
    			answer:
    				'301- areas shaded according to prearranged key, each shading or color type represent a range of values'
    		},
    		{
    			question: 'Proportional Symbol',
    			answer: '301- size of the symbol corresponds to the magnitude of the mapped feature'
    		},
    		{
    			question: 'Isarithmic or Isopleth',
    			answer:
    				'301- lines of equal value are drawn (contour lines) or ranges of similar values are filled with similar colors or patterns'
    		},
    		{
    			question: 'Dot',
    			answer:
    				'301- Shows distribution of phenomena where values and location are known - place a dot where the location of variable is'
    		},
    		{
    			question: 'Dasymetric',
    			answer:
    				'301- alternative to choropleth - ancillary information is used to model internal distribution of the phenomenon'
    		},
    		{
    			question: 'Multivariate displays',
    			answer: '301- more than 2 sets of data on a single map'
    		},
    		{
    			question: 'Web Mapping',
    			answer:
    				'301- The use of the internet to generate and distribute (share) spatial data and maps'
    		},
    		{
    			question: 'Map layout elements',
    			answer:
    				'302- title, map, legend, map scale, supporting media, north arrow, metadata (sources, currency of information, projection, copyright, authorship)'
    		},
    		{
    			question: 'Symbols',
    			answer: '302- representations of feature of a map'
    		},
    		{
    			question: 'Map Accuracy',
    			answer:
    				'302- difficult to assess, all maps show a selective view of reality - should ask instead if map is appropriate for my purposes'
    		},
    		{
    			question: 'Map Scale',
    			answer:
    				"302- The relationship between the size of an object on a map and the size of the actual feature on Earth's surface."
    		},
    		{
    			question: 'Symbolization Variables',
    			answer: '302- size, shape, orientation, pattern, hue, value'
    		},
    		{
    			question: 'Quantitative Map Elements',
    			answer:
    				'302- Size- the size of the point or thickness of lineValue- the shade of the color such as dark red or light red'
    		},
    		{
    			question: 'Qualitative Map Elements',
    			answer:
    				'302- Shape- symbology of a pointPattern- lines having different styles such as dashed linesHue- different colors'
    		},
    		{
    			question: 'Typography Map Elements',
    			answer:
    				'302- the style, arrangement, and appearance of text, point size, line length, typefaces'
    		},
    		{
    			question: 'Verbal Map Scale',
    			answer:
    				"302- States in words the relationship between the distance on the map and the actual distance on Earth's surface"
    		},
    		{
    			question: 'Visual Map Scale',
    			answer: '302- graphic scale or bar scale'
    		},
    		{
    			question: 'Representative Map Scale',
    			answer: '302- representative fraction or ratio scale 1:24,000 or 1 in-24,000 feet'
    		},
    		{
    			question: 'Absolute Map Scale',
    			answer:
    				'302- system of measurement that begins at a minimum or zero point and progresses in only one direction'
    		},
    		{
    			question: 'Relative Map Scale',
    			answer:
    				'302- Arbitrary; begins as some point defined by author and can progress in both directions'
    		},
    		{
    			question: 'Display vs Data',
    			answer:
    				'302- the data is built at a certain scale/accuracy but once the data is displayed in any other format that the one it was made for, the scale gets warped. Ex. a map made as 9x10 that is then scaled down and printed in a newspaper'
    		},
    		{
    			question: 'Large Map Scale',
    			answer: '302- larg ratio between map units and ground units, zoomed in (USGS Topo map)'
    		},
    		{
    			question: 'Small Map Scale',
    			answer:
    				'302- small ratio between map units and ground units small, zoomed out (whole country)'
    		},
    		{
    			question: '3D Mapping brings... (visualization)',
    			answer: '304- a z-value, typically elevation or height-including building modeling (BIM)'
    		},
    		{
    			question: 'Contour Line (visualization)',
    			answer:
    				'304- isoline, isopleth, or isarithm; a function of two variables is a curve along which the function has a constant value-joins points of an equal value on a line'
    		},
    		{
    			question: 'Contour Interval (visualization)',
    			answer: '304- difference in elevation between successive contour lines'
    		},
    		{
    			question: 'Index Contour (visualization)',
    			answer: '304- the contour that is thicker and typically labeled'
    		},
    		{
    			question: 'Iso (line) (visualization)',
    			answer: '304- iso=equal, equal distance between lines'
    		}
    	],
    	[
    		{
    			question: 'Primary Data',
    			answer:
    				"401- information that is collected for the first time for the author's purpose; used for solving the particular problem under investigation"
    		},
    		{
    			question: 'Secondary Data',
    			answer:
    				'401- information that already exists somewhere, having been collected for another purpose by someone other than the author'
    		},
    		{
    			question: '5 types of measurement',
    			answer:
    				'physical measurement, observation of behavior, archives, explicit reports, computational modeling'
    		},
    		{
    			question: 'Physical Measurement',
    			answer:
    				'401- Recording physical properties of the earth or its inhabitants - size, number, temperature, chemical makeup, moisture etc.'
    		},
    		{
    			question: 'Observation of Behavior',
    			answer:
    				'401- Observable actions or activities of individuals or groups - not thoughts, feelings or motivations'
    		},
    		{
    			question: 'Archives',
    			answer:
    				'401- records that have been collected primarily for non-research purposes (secondary)'
    		},
    		{
    			question: 'Explicit Reports',
    			answer: '401- beliefs people express about things -surveys'
    		},
    		{
    			question: 'Computational Modeling',
    			answer: '401- Models as simplified representations of portions of reality'
    		},
    		{
    			question: 'Quantitative Data',
    			answer:
    				'401- numerical values, measured on at least an ordinal level but could be on a metric level'
    		},
    		{
    			question: 'Qualitative Data',
    			answer: '401- non-numerical or numeral (nominal) values that have no quantitative meaning'
    		},
    		{
    			question: 'Deceptive Mapping',
    			answer: '401- a map purposely distorted for gain (e.g. propaganda, military deception)'
    		},
    		{
    			question: 'Layer',
    			answer: 'mechanism to display geographic data'
    		},
    		{
    			question: 'Data Transfer Standards- Transfer',
    			answer:
    				'401- a robust way of transferring GIS data between computers with no information loss, including metadatafollow Spatial Data Transfer Standards (SDTS) or Federal Information Processing Standard (173)-'
    		},
    		{
    			question: 'Data Transfer Standards- Industry Standards',
    			answer:
    				'401- typically don not exchange topology, only graphic info; large number of format translators'
    		},
    		{
    			question: 'Data Transfer Standards- Open GIS Consortium (OGC)',
    			answer:
    				'401- non-profit, international, voluntary consensus standards organization-Created Geography Markup Language (GML) an xML based encoding standard'
    		},
    		{
    			question: 'Field Data Collection- Remote Sensing',
    			answer: '402- 3 resolutions- spatial, spectral (EM Spectrum), and temporal (repeat cycle)'
    		},
    		{
    			question: 'Spatial Resolution',
    			answer:
    				'503- size of object that can be resolved and the most usual measure is the pixel size'
    		},
    		{
    			question: 'Spectral Resolution',
    			answer: '503- parts of the electromagnetic spectrum that are measurable'
    		},
    		{
    			question: 'Temporal Resolution',
    			answer: '503- repeat cycle- frequency with which images are collected for the same area'
    		},
    		{
    			question: 'Field Data Collection- Ground Survey',
    			answer:
    				'402- based on principle that the 3-D location of any known point can be determined by measuring angles and distances from other known points-expensive and time consuming'
    		},
    		{
    			question: 'Field Data Collection- GPS',
    			answer:
    				'402- Using a GPS receiver to receive signals from the GPS satellites to calculate the current position and time'
    		},
    		{
    			question: 'Field Data Collection- Inspection',
    			answer: '402- data has already been geographically located and needs to be verified'
    		},
    		{
    			question: 'Field collection process',
    			answer:
    				'402- Determine the result of field work-determine what needs to be collected, inspected, or surveyed (field collection survey form)-determine how it will be collected (tablet, pen and paper)-begin collection, review a sample and make adjustments-plan location and timing-start collection'
    		},
    		{
    			question: 'Types of Remote Sensing Systems',
    			answer:
    				'404- passive- gather radiation emitted from objects (photography, infrared) -active- emits energy and measures the amount of energy returned from target objects (RADAR, LIDAR)'
    		}
    	],
    	[
    		{
    			question: 'Data Format Conversion',
    			answer: '501- converting data from one form to another (such as a vector to a raster)'
    		},
    		{
    			question: 'Data Transformation',
    			answer:
    				'501- Process of changing the data from their original form to a format suitable for performing a data analysis addressing research objectives. (Converting data from different coordinate systems, or one data structure to another)'
    		},
    		{
    			question: 'Spatial Data Generalization',
    			answer:
    				'502- Selection- only selecting certain features to be displayedRemoving DetailSimplification- smoothing out detailed and complicated featuresDissolve and Merge- combining similar neighbor elementsAggregation- combining features into a new composite featureExaggeration- making features larger or smaller in scale than they are'
    		},
    		{
    			question: 'Vector Spatial File Type - Advantages',
    			answer:
    				'503- Represent point line and area accurately-more efficient that raters in storage-supports topology-interactive retrieval-enables map generalization'
    		},
    		{
    			question: 'Vector Spatial File Type - Disadvantages',
    			answer:
    				'503- Less intuitively understood-multiple vectors overlay is computationally intensive-display and plotting vectors can be expensive'
    		},
    		{
    			question: 'Raster Spatial File Type - Advantages',
    			answer:
    				'503- Easy to understand-good to represent surfaces-easy to input and outputeasy to draw on a screen-analytical operations are easier'
    		},
    		{
    			question: 'Raster Spatial File Type - Disadvantages',
    			answer:
    				'503- inefficient for storage-compression techniques not efficient with variable data-large cells could potentially cause information loss-poor at representing points, lines, areas-each cell can be owned buy only one feature-must include redundant or missing data'
    		},
    		{
    			question: 'Vector File Types',
    			answer:
    				'503- PostScript- page definition language to export or print a map Digital Exchange Format (DXF)- AutoCAD- no topology but lots of detail Digital Line Graph (DLG)- distributed by the government and most GIS packages will import but extra manipulation is needed TIGER- block level maps of every village, town, and city in the US Shapefile- vector data format stores location, shape and attributes Scalable Vector Graphics (SVG)- extension of the XML language ArcInfo Coverage- stores set of thematically associated data considered to be a unit ArcInfo Interchange File (.eoo) - known as ArcGIS export file Geodatabase- object oriented data model represents features and attributes as objects'
    		},
    		{
    			question: 'Raster File Types',
    			answer:
    				'503- standard- rows and columns with header information Tagged Image File Formats (TIFF)- associated with scanners GEO-TIFF- puts latitude/longitude at edge of pixels Graphic Interchange Format (GIF)- image files for sharp edges and few gradations of color Joint Photograph Experts Group (JPEG)- variable-resolution compression system with both partial and full resolution recovery Digital Elevation Model (DEM)- 30 meter elevation data 1:24,000, 7.5 minute quadrangle maps or 1:250,000 3 second arc second digital terrain data Band Interleaved by Pixel (BIP) or by Line (BIL)- good as storing different brightness levels RS Landsat- satellite imagery and BIL information are combined'
    		},
    		{
    			question: 'Vector and Raster Transformations',
    			answer:
    				'503- R to V- not difficult based on pixel valueV to R- very difficult because pixels may distort the lines or exact point locations and would need to be re-digitized'
    		},
    		{
    			question: 'Shapefile File Type (SHP)',
    			answer:
    				'503- .shp** - shape format -feature geometry itself-.shx- shape index format- positional index of the feature geometry to allow seeking forward and backwards quickly-.dbf**- Database File- attribute information-.prj**- projection format- information pertaining to coordinate system, all text on a single line with no extra spaces-.sbn & .sbx- optional spatial index files to optimize spatial queries shp.xml - geospatial metadata in XML format**required for proper visualization of a Shapefile and its attributes'
    		},
    		{
    			question: 'Geodatabase (.gdb)',
    			answer:
    				'503- data structure for ArcGIS and is the primary data format used for editing and data management-.gdb- file geodatabase-.mdb- personal geodatabase based on Microsoft Access'
    		},
    		{
    			question: 'Coverage File',
    			answer: '503- point, arc, node, route, route system, section, polygon, and region'
    		},
    		{
    			question: 'DGN File',
    			answer: '503- A file format supported by MicroStation and AutoCAD'
    		},
    		{
    			question: 'TXT File',
    			answer:
    				'A simple file consisting of lines of text with no formatting that almost any computer can open and display'
    		},
    		{
    			question: 'IMG File',
    			answer: '503- image'
    		},
    		{
    			question: 'LAS File',
    			answer:
    				'503- an industry-standard binary format for storing airborne LiDAR data, point cloud file'
    		},
    		{
    			question: 'Raster file types',
    			answer: '503- .jpg, .tif, .gif-rendered file formats'
    		},
    		{
    			question: 'Databases',
    			answer:
    				'503- direct connection to relational database management systems and big databases - manage tables and features classes in databases'
    		},
    		{
    			question: 'Geodatabase',
    			answer:
    				'503- A database or file structure used primarily to store, query, and manipulate spatial/GIS data for central access-An object-based vector data model developed by Esri'
    		},
    		{
    			question: 'Cloud Computing',
    			answer:
    				'503- the practice of using a network of remote servers hosted on the Internet to store, manage, and process data, rather than a local server or a personal computer.-Allows single and multiple user editing'
    		},
    		{
    			question: 'Integrate Enterprise',
    			answer: '503- data stored in big business systems to extend their analytical capabilities'
    		},
    		{
    			question: 'Data Rules and Relationships',
    			answer: '503- define relationship between data sets and set rules (domains and subtypes)'
    		},
    		{
    			question: 'Metadata Management',
    			answer: '503- describes content, quality, origin, and other characteristics of data'
    		},
    		{
    			question: 'Secures Data',
    			answer:
    				'503- flexibility and control over how GIS platform is deployed, maintained, secured, and used'
    		},
    		{
    			question: 'Versioning Data',
    			answer:
    				'504- Used to standardize data across systems, that allow it to be queried-extract data from current source-transform data into the current format-load data to final storage point and format'
    		}
    	],
    	[
    		{
    			question: 'ETL (extraction, transformation, and loading)',
    			answer:
    				'601- select features based on filters of attributes- new selection, add to selection, remove from selection, subset selection, switch selection, clear selection'
    		},
    		{
    			question: 'Attribute Data Selection',
    			answer:
    				'601- Intersect, within a distance, contains, completely contains, contains Clementini, within, completely within, within Clementini, are identical to, boundary touches, shares a line segment with, crossed by the outline of, have their center in, contained by'
    		},
    		{
    			question: 'Spatial Data Selection',
    			answer:
    				'601- Intersect, within a distance, contains, completely contains, contains Clementini, within, completely within, within Clementini, are identical to, boundary touches, shares a line segment with, crossed by the outline of, have their center in, contained by'
    		},
    		{
    			question: 'Location Data Selection',
    			answer: '601- select features within a certain distance of a location'
    		},
    		{
    			question: 'Data Editing- Buffer',
    			answer: '601- Creates buffer polygons around input features to a specified distance'
    		},
    		{
    			question: 'Data Editing- Dissolve',
    			answer: '601- Aggregates features based on specified attributes'
    		},
    		{
    			question: 'Data Editing- Merge',
    			answer: '601- combines tow attribute tables into one using a common key between tables'
    		},
    		{
    			question: 'Data Editing- Append',
    			answer: '601- combines datasets of same data type into an existing dataset'
    		},
    		{
    			question: 'Data Editing- Union',
    			answer: '601- combines input features with another feature dataset'
    		},
    		{
    			question: 'Data Editing- Clip',
    			answer: '601- extracts input features that overlay the clip features (keeps input attributes)'
    		},
    		{
    			question: 'Data Editing- Intersect',
    			answer:
    				'601- extracts feature which overlap in all layers to new feature class (joins attribute tables)'
    		},
    		{
    			question: 'Data Editing- Join',
    			answer: '601- combine two attribute tables into one using a common key between tables'
    		},
    		{
    			question: 'Data Classification',
    			answer:
    				'602- objects with similar symbols- up to 7 feature classed (5 is preferred)-classes should be exhaustive and should not overlap'
    		},
    		{
    			question: 'Data Classification Categories',
    			answer:
    				'602- Equal Range- equal distance between class breaks -quantiles- equal number of observations in each class -standard deviation- class breaks based on distance of standard deviation from the mean -natural breaks- class breaks conform to gaps in data distribution-symbology- one layer can be symbolized by selected attribute'
    		},
    		{
    			question: 'Overlay Analysis Methodology',
    			answer:
    				'603- GIS analysis that evaluates what features are on top of other features in order to answer spatial questions, based on Boolean logic.Used to define a problem, break problem into submodels, determine significant layer, reclassify or transform data within a layer'
    		},
    		{
    			question: 'Spatial Overlay Analysis',
    			answer:
    				'603- Overlays are the combination of spatial and attribute data from two or more spatial layers that cover the same area to study the relationship between them'
    		},
    		{
    			question: 'Overlay Analysis',
    			answer:
    				'603- GIS analysis that evaluates what features are on top of other features in order to answer spatial questions.'
    		},
    		{
    			question: 'Vector Overlay Tools',
    			answer:
    				'603- identity- input features, split by overlay features-intersect- only features common to all input layers-symmetrical difference- features common to either input layer or overlay layer but not both-union- all input features-update- input feature geometry replaced by update layer'
    		},
    		{
    			question: 'Raster Overlay Tools',
    			answer:
    				'603- zonal statistics- summarizes values in a rater layer by zones (categories) in another layer (e.g. calculate the mean elevation for each vegetation category) combine- assigns a value to each cell in the output layer based on unique combinations of values from several input layers single output map algebra- combines multiple raster layer using an expression (e.g. add several ranked layer to create and overall ranking) weighted overlay- automates the raster overlay process and provides an option to assign weights to each layer before adding weighted sum- overlays several rasters multiplying each by their given weight and sums them together'
    		},
    		{
    			question: 'Map Algebra',
    			answer: '604- various functions performed on neighboring cells for raster datasets'
    		},
    		{
    			question: 'Local Operations (Map Algebra)',
    			answer:
    				'604- combine rasters that overlay each other-add/subtract/etc. the cells that are in the same location'
    		},
    		{
    			question: 'Global Operations (Map Algebra)',
    			answer:
    				'604- applies a formula to all cells-add/subtract/etc. all cells based on one value-find the distance from one cell to all cells'
    		},
    		{
    			question: 'Focal Operations (Map Algebra)',
    			answer:
    				'604- calculated a value based on all neighboring cells-find the average of all the cells around a chosen cell'
    		},
    		{
    			question: 'Zonal Operations (Map Algebra)',
    			answer: '604- computing a value based on cells in a particular zone (such as a watershed)'
    		},
    		{
    			question: 'Descriptive Statistics',
    			answer:
    				'605- numerical data used to measure and describe characteristics of groups. Includes measures of central tendency and measures of variation.-Summarizes a sample to learn about the population'
    		},
    		{
    			question: 'Summary Statistics',
    			answer:
    				'605- statistics that summarize a great deal of numerical information about a distribution, such as the mean and the standard deviation'
    		},
    		{
    			question: 'Coefficient of Determination',
    			answer:
    				'605- R squared - number that indicates how well data fit in a statistical model-fit a line or curve-1 indicated the line fits perfectly with the data-0 indicated the line does not fit at all, data is random'
    		}
    	],
    	[
    		{
    			question: 'Schema (Database Object)',
    			answer:
    				'701- structure or design of the database or database object (table, view, index, stored procedure, trigger)-defines tables, fields in each table, relationships between fields-a schema will include information on which fields have domains and what those domains are'
    		},
    		{
    			question: 'Data Dictionary',
    			answer: '701- catalog or table containing information about the datasets stored in a database'
    		},
    		{
    			question: 'Domain',
    			answer: '701- the range of values for a particular metadata element'
    		},
    		{
    			question: 'Attribute Domain',
    			answer:
    				'701- enforces data integrity, identify what values are allowed in a field in a feature class'
    		},
    		{
    			question: 'Coded Value Domain',
    			answer:
    				'701- attribute domain that defines a set of permissible values for an attribute in a geodatabase - it has a code and its equivalent'
    		},
    		{
    			question: 'Range Domain',
    			answer:
    				'701- attribute domain that specifies a valid range of permissible numerical attribute'
    		},
    		{
    			question: 'Spatial Domain',
    			answer: '701- allowable range for x,y coordinated and for m, z values'
    		},
    		{
    			question: 'Tables (Database Object)',
    			answer:
    				'701- collection of related data held in structured formation within a database, contains fields and rows'
    		},
    		{
    			question: 'Views (Database Object)',
    			answer:
    				'701- resulting set of a stored query on the data - users can query- virtual table computed dynamically from data when the view is accessed'
    		},
    		{
    			question: 'Sequences (Database Object)',
    			answer:
    				'701- ordered collection of objects in which repetition are allowed (finite or infinite) number of elements is the length of the sequence'
    		},
    		{
    			question: 'Synonyms (Database Objects)',
    			answer: '701- alias or alternate name for a table, view, sequence or other object'
    		},
    		{
    			question: 'Indexes (Database Objects)',
    			answer:
    				'701- data structure that improves the speed of data retrieval operations in a database table-causes more storage space and additional writes-quickly locate data in database-indexes can be on multiple columns'
    		},
    		{
    			question: 'Clusters (Database Objects)',
    			answer:
    				'701- multiple servers share one storage--typically used to handle user load balancing databases distributed to different servers using replication--typically used if you have multiple users utilizing the same data in different physical locations--there is a master database that the replica databases sync between'
    		},
    		{
    			question: 'Database Links',
    			answer:
    				'701- data stored in a different database but accessible to the database currently being accessed'
    		},
    		{
    			question: 'Snapshot (Database Objects)',
    			answer: '701- state of a system at a particular point in time, can be a backup copy'
    		},
    		{
    			question: 'Procedure (Database Objects)',
    			answer:
    				'701- subroutine available to applications that access a relational database system (data validation, access control mechanisms)'
    		},
    		{
    			question: 'Trigger (Database Objects)',
    			answer:
    				'701- procedural code automatically executed in response to certain events on a particular table or view in a database'
    		},
    		{
    			question: 'Functions and Subroutines',
    			answer:
    				"701- sequence of program instructions that perform a specific taskThe difference between a function and a subroutine is that a function can return data, whereas a sub can't."
    		},
    		{
    			question: 'Package (Database Objects)',
    			answer: '701- built from source with one of the available package management systems'
    		},
    		{
    			question: 'Non-schema Objects',
    			answer: '701- users, roles, contexts, directory objects'
    		},
    		{
    			question: 'Database Design',
    			answer:
    				'702- process of determining fields, tables and relationships needed to satisfy the data and processing requirements, a detailed model of the database'
    		},
    		{
    			question: 'Database Design Process',
    			answer:
    				'702- (pre-created list on quizlet)System AnalysisConceptual DesignPhysical DesignImplementation & ConversionOperation & Maintenance'
    		},
    		{
    			question: 'Conceptual Schema (Database Design Process)',
    			answer:
    				'702- Step 1 of Database Design ProcessDetermine where relationships and dependency is within the data'
    		},
    		{
    			question: 'Logical Data Model (Database Design Process)',
    			answer:
    				'702- Step 2 of Database Design ProcessArrange data in a logical structure that can be mapped into the storage objects supported by the database management system'
    		},
    		{
    			question: 'Physical Model (Database Design Process)',
    			answer:
    				'702- Step 3 of Database Design Process-physical configuration of the database on the storage media-detailed specification of data elements, data types, indexing options, and other parameters residing in the DBMS data dictionary-models, hardware, software'
    		},
    		{
    			question: 'Database Field Type',
    			answer:
    				'702-short integer- between -32768 and 32768long integer- between -2,147,483,648 and 2,147,483,648float- single-precision floating-point numbersdouble- double-precision floating-point numberstext- free-text, could be a coded value-assign to and integer through a domaindates- a calendar date and/or timeBLOB- (Binary Large Object) data stored as a long sequence of binary numbers - ArcGIS stores annotation and dimensions as BLOB - images, multimedia, bits of codeObject Identifiers- Unique IDs and FIDsGlobal Identifiers- Global ID and GUID - data types store registry sing style strings consisting of 36 characters enclosed in curly bracketsRaster field types- raster can be stored within the geodatabasegeometry -point, line, polygon, multipoint, multipatch'
    		},
    		{
    			question: 'Database Administration Basic Tasks',
    			answer:
    				'703-Backup and recoveryDatabase SecurityStorage and capacity planningPerformance monitoring and tuningTroubleshootingother- high availability and ETL'
    		},
    		{
    			question: 'Database Administration Archiving',
    			answer:
    				'703- captures, manages, and analyzes data changes (most often done with geodatabases)'
    		},
    		{
    			question: 'Database Administration Retrieval',
    			answer: '703- extracting data from a backup due to data loss or data corruption'
    		},
    		{
    			question: 'Data Owner',
    			answer:
    				'704- Individuals, normally managers or directors, who have responsibility for the integrity, accurate reporting and use of computerized data.-user who creates tables, feature classes'
    		},
    		{
    			question: 'User Access',
    			answer:
    				'704- Refers to what permissions each user should be granted in a particular database, and which database objects they will be able to see and use. Administrator- full control of the database; can read, create, update, delete (features and data sets) Editor- can read, update, create, and delete features Creator- can create additional feature classes, tables, and can read update, create, and delete Reader- can only view data'
    		},
    		{
    			question: 'Authentication (Data Security)',
    			answer:
    				'704- database checks the list of users to make sure a user is allowed to make a connection-Operating System (OS) authentication-Database Authentication'
    		},
    		{
    			question: 'Groups (Data Security)',
    			answer: '704- grant users based on their common functions'
    		},
    		{
    			question: 'Public Role (Data Security)',
    			answer: '704- right granted to anyone connected to database'
    		}
    	],
    	[
    		{
    			question: 'File Based Transfer',
    			answer: '801- data is in a structured file format'
    		},
    		{
    			question: 'Application Programming Interface (API)',
    			answer:
    				'801- A set of software routines that allows one software system to work with another.'
    		},
    		{
    			question: 'Web Services',
    			answer:
    				'801- Small pieces of code that are accessed via the application server which permit inter-operable machine-to-machine interaction over a network.'
    		},
    		{
    			question: 'SSL (Secure Sockets Layer)',
    			answer:
    				'801- a protocol that provides security when communicating on the Internet (encryption)'
    		},
    		{
    			question: 'TLS (Transport Layer Security)',
    			answer:
    				'801- used to encrypt traffic on the wire. TLS is the replacement for SSL and like SSL, it uses certificates issued by CAs.'
    		},
    		{
    			question: 'NTP (Network Transport Protocol)',
    			answer:
    				'801- communication packet is constructed at different intervals, transferred form host to receiver Transmission Control Protocol (TCP)- header package for the data at the transport layer Internet Protocol (IP)- header is added to internet layer Media Access Control (MAC) address- added at the physical network layer'
    		},
    		{
    			question: 'NFS (Network File System)',
    			answer:
    				'801- A client/server application that enables users to access shared files stored on different types of computers and work with those files as if they were stored locally on their own computers.'
    		},
    		{
    			question: 'CIFS Common Internet File System',
    			answer:
    				'801- a network file system protocol used for providing shared access to files and printers between machines on the network.'
    		},
    		{
    			question: 'HTTP (Hypertext Transfer Protocol)',
    			answer:
    				'801- the protocol used for transmitting web pages over the Internet, a way of delivering map images or map data to web browsers'
    		},
    		{
    			question: 'Scripting',
    			answer:
    				'802- used to manipulate, customize, and automate existing softwareinterpreted by the computer rather than compiled'
    		},
    		{
    			question: 'Object-Oriented Programming (OOP)',
    			answer:
    				'802- designing a program by discovering objects, their properties, and their relationships -contain data in the form of fields (aka attributes) and procedures (aka methods)'
    		},
    		{
    			question: 'Extensibility (system design principle)',
    			answer:
    				'802- implementation take future growth into consideration-level of effort to extend the system and implement the extension'
    		},
    		{
    			question: 'Query Expression',
    			answer:
    				'A type of expression that evaluates to a Boolean (true or false) value, that is typically used to select those rows in a table in which the expression evaluates to true. Query expressions are generally part of a SQL statement.'
    		},
    		{
    			question: 'Expression (Scripting Basics)',
    			answer:
    				'802- most basic programming instruction-contains vales and operators that can reduce to a single value'
    		},
    		{
    			question: 'Variables (Scripting Basics)',
    			answer:
    				'802- value that can change depending on the program or information passed to the program'
    		},
    		{
    			question: 'Iterations (Scripting Basics)',
    			answer:
    				'802- repeating a process to generate an outcome-for loops, do while loops, do until loops'
    		},
    		{
    			question: 'Condition Statement (Scripting Basics)',
    			answer:
    				"802- the result must meet the requirements of the statement-if- a conditional statement expression that is either true or false-else- combined with an if statement and if the statement is false, defaults to the else condition-elif- check if a different condition from the first 'if' is true"
    		},
    		{
    			question: 'Agile (Application Development)',
    			answer:
    				'803- A software development methodology that delivers functionality in mini-increments or rapid iterations, measured in weeks, requiring frequent communication, development, testing, and delivery.Scrum, Crystal, Extreme Programming (XP) and feature-driven developments are types of Agile'
    		},
    		{
    			question: 'DevOps (Application Development)',
    			answer:
    				'803- An approach based on lean and agile principles in which business owners and the development, operations, and quality assurance departments collaborate. -organization changes that enhances collaboration between departments'
    		},
    		{
    			question: 'Waterfall (Application Development)',
    			answer:
    				'803- A series of steps in which a software system trickles down-Requirements, Design, implementation, verification, maintenance'
    		},
    		{
    			question: 'Rapid Application Development (RAD) (Application Development)',
    			answer:
    				'803- A development method that uses special tools and an iterative approach to rapidly produce a high-quality system with low investment cost'
    		},
    		{
    			question: 'Spiral Development (Application Development)',
    			answer:
    				'803- The spiral model is a risk-driven process model generator for software projects. Based on the unique risk patterns of a given project, the spiral model guides a team to adopt elements of one or more process models, such as incremental, waterfall, or evolutionary prototyping.Combines top-down and bottom-up concepts'
    		}
    	],
    	[
    		{
    			question: 'GPS Basics',
    			answer:
    				"MISC- 24 satellites, revolution 12 hours (aka 2 Earth orbits a day), Altitude 12,000 miles-Started by DOD in 1970's for military use only-Calculates location by measuring time interval between the transmission and reception of a satellite signal"
    		},
    		{
    			question: 'GPS Standard Positioning Service',
    			answer:
    				'MISC- signal broadcast for civilian useHorizontal location requires 3 satellites (concept is called Trilateration)Vertical location requires 4 satellites'
    		},
    		{
    			question: 'NAVSTAR GPS',
    			answer:
    				'MISC- as of 2010, the only fully-operational GNSS constellationNAVigation Satellite Timing and Ranging-transmits signals on two phase modulated frequencies-transmits a navigation message that contains orbital data for computing the position of all satellites'
    		},
    		{
    			question: 'Types of GPS Receivers',
    			answer: 'MISC- Recreational Grade, Mapping Grade, Survey or High Accuracy Grade'
    		},
    		{
    			question: 'GPS accuracy is depend on...',
    			answer:
    				'MISC- type of GPS receiver, field techniques, post processing of data and errors from other sources'
    		},
    		{
    			question: 'GPS Errors',
    			answer:
    				'MISC- Multipatch- errors caused by reflected GPS signals arriving at the GPS receiver-structures and reflective surfaces Atmosphere- signals can experience delays when traveling through the atmosphere (tropospheric and ionospheric delays) Distance from Base Station- differential correction will increase the quality of the data, accuracy is degraded slightly as the distance from base station increases Selective availability- intentional degradation of the GPS signals by the DOD to limit accuracy fro non-US military/government users (currently not a factor) Jammers, Spoofing risk'
    		},
    		{
    			question: 'Noise Error (signal)',
    			answer:
    				'MISC- is the distortion of the satellite signal prior to reaching the GPS receiver and/or and additional signal piggy-backing onto the GPS satellite signal'
    		},
    		{
    			question: 'PDOP (Position Dilution of Precision)',
    			answer:
    				'MISC- conditional collection only when there is an optimum satellite availability (4 or more) and configuration to produce and acceptable (lower, 6 or less) PDOP value (higher PDOP values are bad)'
    		},
    		{
    			question: 'Signal-to-noise ratio (SNR) Mask',
    			answer:
    				'MISC- method of setting a threshold to control the strength of the radiation exposure compared with the amount of noise apparent in a digital image to minimize error'
    		},
    		{
    			question: 'Elevation Mask',
    			answer:
    				'MISC- Set to 15 degrees, default angle to minimize the amount of atmosphere through which the satellite signal must travel'
    		},
    		{
    			question: 'Data Collection Rate',
    			answer:
    				'MISC- (aka sync rate) -collect point data at 1 second intervals or same interval as base station-collect polygon and line data at 5 second intervals'
    		},
    		{
    			question: 'Datum',
    			answer:
    				'MISC- A theoretically exact point, axis, or plane derived from the true geometric counterpart of a specific datum feature. The origin from which the location is established.-GPS receivers are designed to collect GPS position relative to WGS84 datum, but can be manipulated'
    		},
    		{
    			question: 'Coordinates (latitude and longitude)',
    			answer:
    				"MISC Degrees/Minutes/Seconds (DMS) 43 5' 20Decimal Degrees (DD) 43.088889 Latitude is positive in Norther HemisphereLongitude is negative in Western Hemisphere"
    		},
    		{
    			question: 'Latitude and Longitude Conversion (DMS and DD)',
    			answer: 'MISC- DD = d + m/60 + s/3600'
    		},
    		{
    			question: 'Coordinate Systems',
    			answer: 'DMS, DD, UTM, State Plane, MGRS'
    		},
    		{
    			question: 'Euclidean distance',
    			answer:
    				'A method of distance measurement using the straight line mileage between two places. (2D)'
    		},
    		{
    			question: 'Manhattan Distance',
    			answer:
    				'distance measured in terms of roadways, walkways, and other paths that avoid obstruction and reduce both distance and travel time'
    		}
    	]
    ];

    /* src\Cardbox.svelte generated by Svelte v3.55.1 */

    const file$3 = "src\\Cardbox.svelte";

    function create_fragment$3(ctx) {
    	let div0;
    	let h20;
    	let t0;
    	let t1;
    	let div1;
    	let h21;
    	let t2;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			h20 = element("h2");
    			t0 = text(/*question*/ ctx[0]);
    			t1 = space();
    			div1 = element("div");
    			h21 = element("h2");
    			t2 = text(/*answer*/ ctx[1]);
    			add_location(h20, file$3, 11, 2, 158);
    			attr_dev(div0, "class", "flip-box-front svelte-5o8p7x");
    			add_location(div0, file$3, 9, 0, 123);
    			add_location(h21, file$3, 16, 1, 258);
    			attr_dev(div1, "class", "flip-box-back svelte-5o8p7x");
    			toggle_class(div1, "conceal-answer", /*showCardBack*/ ctx[2]);
    			add_location(div1, file$3, 15, 0, 192);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, h20);
    			append_dev(h20, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h21);
    			append_dev(h21, t2);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*question*/ 1) set_data_dev(t0, /*question*/ ctx[0]);
    			if (dirty & /*answer*/ 2) set_data_dev(t2, /*answer*/ ctx[1]);

    			if (dirty & /*showCardBack*/ 4) {
    				toggle_class(div1, "conceal-answer", /*showCardBack*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Cardbox', slots, []);
    	let { question } = $$props;
    	let { answer } = $$props;
    	let { showCardBack = false } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (question === undefined && !('question' in $$props || $$self.$$.bound[$$self.$$.props['question']])) {
    			console.warn("<Cardbox> was created without expected prop 'question'");
    		}

    		if (answer === undefined && !('answer' in $$props || $$self.$$.bound[$$self.$$.props['answer']])) {
    			console.warn("<Cardbox> was created without expected prop 'answer'");
    		}
    	});

    	const writable_props = ['question', 'answer', 'showCardBack'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Cardbox> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('question' in $$props) $$invalidate(0, question = $$props.question);
    		if ('answer' in $$props) $$invalidate(1, answer = $$props.answer);
    		if ('showCardBack' in $$props) $$invalidate(2, showCardBack = $$props.showCardBack);
    	};

    	$$self.$capture_state = () => ({ question, answer, showCardBack });

    	$$self.$inject_state = $$props => {
    		if ('question' in $$props) $$invalidate(0, question = $$props.question);
    		if ('answer' in $$props) $$invalidate(1, answer = $$props.answer);
    		if ('showCardBack' in $$props) $$invalidate(2, showCardBack = $$props.showCardBack);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [question, answer, showCardBack];
    }

    class Cardbox extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { question: 0, answer: 1, showCardBack: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Cardbox",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get question() {
    		throw new Error("<Cardbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set question(value) {
    		throw new Error("<Cardbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get answer() {
    		throw new Error("<Cardbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set answer(value) {
    		throw new Error("<Cardbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get showCardBack() {
    		throw new Error("<Cardbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showCardBack(value) {
    		throw new Error("<Cardbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Flashcards.svelte generated by Svelte v3.55.1 */

    const { console: console_1 } = globals;
    const file$2 = "src\\Flashcards.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    // (45:12) {#each chapters as chapter (chapter.id)}
    function create_each_block(key_1, ctx) {
    	let option;
    	let t_value = /*chapter*/ ctx[9].text + "";
    	let t;

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = /*chapter*/ ctx[9].id;
    			option.value = option.__value;
    			add_location(option, file$2, 45, 16, 1592);
    			this.first = option;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(45:12) {#each chapters as chapter (chapter.id)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let main;
    	let section;
    	let h1;
    	let t1;
    	let div0;
    	let select;
    	let option;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t3;
    	let div3;
    	let div1;
    	let cardbox;
    	let t4;
    	let div2;
    	let button0;
    	let t6;
    	let button1;
    	let t7_value = (/*showCardBack*/ ctx[3] ? "Hide Answer" : "Show Answer") + "";
    	let t7;
    	let t8;
    	let button2;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = chapters;
    	validate_each_argument(each_value);
    	const get_key = ctx => /*chapter*/ ctx[9].id;
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	cardbox = new Cardbox({
    			props: {
    				question: /*question*/ ctx[2],
    				answer: /*answer*/ ctx[1],
    				showCardBack: /*showCardBack*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			section = element("section");
    			h1 = element("h1");
    			h1.textContent = "GISP STUDY GUIDE";
    			t1 = space();
    			div0 = element("div");
    			select = element("select");
    			option = element("option");
    			option.textContent = "Choose a chapter";

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			div3 = element("div");
    			div1 = element("div");
    			create_component(cardbox.$$.fragment);
    			t4 = space();
    			div2 = element("div");
    			button0 = element("button");
    			button0.textContent = "←";
    			t6 = space();
    			button1 = element("button");
    			t7 = text(t7_value);
    			t8 = space();
    			button2 = element("button");
    			button2.textContent = "→";
    			attr_dev(h1, "class", "header svelte-10lm3em");
    			add_location(h1, file$2, 40, 8, 1348);
    			option.__value = "";
    			option.value = option.__value;
    			add_location(option, file$2, 43, 12, 1475);
    			if (/*selected*/ ctx[0] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[8].call(select));
    			add_location(select, file$2, 42, 8, 1430);
    			attr_dev(div0, "class", "dropdown svelte-10lm3em");
    			add_location(div0, file$2, 41, 8, 1398);
    			attr_dev(div1, "class", "flip-box-inner svelte-10lm3em");
    			toggle_class(div1, "flip-it", /*showCardBack*/ ctx[3]);
    			add_location(div1, file$2, 52, 16, 1800);
    			attr_dev(button0, "class", "arrow-btn svelte-10lm3em");
    			add_location(button0, file$2, 60, 20, 2125);
    			attr_dev(button1, "class", "svelte-10lm3em");
    			add_location(button1, file$2, 62, 20, 2231);
    			attr_dev(button2, "class", "arrow-btn svelte-10lm3em");
    			add_location(button2, file$2, 66, 20, 2412);
    			attr_dev(div2, "id", "btn-cont");
    			attr_dev(div2, "class", "svelte-10lm3em");
    			add_location(div2, file$2, 59, 16, 2084);
    			attr_dev(div3, "class", "flip-box svelte-10lm3em");
    			add_location(div3, file$2, 51, 12, 1760);
    			attr_dev(section, "class", "flash");
    			add_location(section, file$2, 39, 8, 1315);
    			add_location(main, file$2, 38, 8, 1299);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, section);
    			append_dev(section, h1);
    			append_dev(section, t1);
    			append_dev(section, div0);
    			append_dev(div0, select);
    			append_dev(select, option);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*selected*/ ctx[0]);
    			append_dev(section, t3);
    			append_dev(section, div3);
    			append_dev(div3, div1);
    			mount_component(cardbox, div1, null);
    			append_dev(div3, t4);
    			append_dev(div3, div2);
    			append_dev(div2, button0);
    			append_dev(div2, t6);
    			append_dev(div2, button1);
    			append_dev(button1, t7);
    			append_dev(div2, t8);
    			append_dev(div2, button2);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(select, "change", /*select_change_handler*/ ctx[8]),
    					listen_dev(button0, "click", /*prevCard*/ ctx[5], false, false, false),
    					listen_dev(button1, "click", /*toggleShowBack*/ ctx[4], false, false, false),
    					listen_dev(button2, "click", /*nextCard*/ ctx[6], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*chapters*/ 0) {
    				each_value = chapters;
    				validate_each_argument(each_value);
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, select, destroy_block, create_each_block, null, get_each_context);
    			}

    			if (dirty & /*selected, chapters*/ 1) {
    				select_option(select, /*selected*/ ctx[0]);
    			}

    			const cardbox_changes = {};
    			if (dirty & /*question*/ 4) cardbox_changes.question = /*question*/ ctx[2];
    			if (dirty & /*answer*/ 2) cardbox_changes.answer = /*answer*/ ctx[1];
    			if (dirty & /*showCardBack*/ 8) cardbox_changes.showCardBack = /*showCardBack*/ ctx[3];
    			cardbox.$set(cardbox_changes);

    			if (!current || dirty & /*showCardBack*/ 8) {
    				toggle_class(div1, "flip-it", /*showCardBack*/ ctx[3]);
    			}

    			if ((!current || dirty & /*showCardBack*/ 8) && t7_value !== (t7_value = (/*showCardBack*/ ctx[3] ? "Hide Answer" : "Show Answer") + "")) set_data_dev(t7, t7_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cardbox.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cardbox.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			destroy_component(cardbox);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Flashcards', slots, []);
    	let answer = quiz[0][0].answer;
    	let question = quiz[0][0].question;
    	let selected = 1;
    	let flashcardIndex = 0;

    	// $: selected = chapters[selected-1].id;
    	let showCardBack = false;

    	const toggleShowBack = () => $$invalidate(3, showCardBack = !showCardBack);

    	const prevCard = () => {
    		$$invalidate(3, showCardBack = false);

    		if (flashcardIndex === 0) {
    			$$invalidate(7, flashcardIndex = quiz.length - 1);
    		} else {
    			$$invalidate(7, flashcardIndex -= 1);
    		}
    	};

    	const nextCard = () => {
    		$$invalidate(3, showCardBack = false);

    		if (flashcardIndex === quiz.length - 1) {
    			$$invalidate(7, flashcardIndex = 0);
    		} else {
    			$$invalidate(7, flashcardIndex += 1);
    		}
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Flashcards> was created with unknown prop '${key}'`);
    	});

    	function select_change_handler() {
    		selected = select_value(this);
    		$$invalidate(0, selected);
    	}

    	$$self.$capture_state = () => ({
    		quiz,
    		chapters,
    		Cardbox,
    		answer,
    		question,
    		selected,
    		flashcardIndex,
    		showCardBack,
    		toggleShowBack,
    		prevCard,
    		nextCard
    	});

    	$$self.$inject_state = $$props => {
    		if ('answer' in $$props) $$invalidate(1, answer = $$props.answer);
    		if ('question' in $$props) $$invalidate(2, question = $$props.question);
    		if ('selected' in $$props) $$invalidate(0, selected = $$props.selected);
    		if ('flashcardIndex' in $$props) $$invalidate(7, flashcardIndex = $$props.flashcardIndex);
    		if ('showCardBack' in $$props) $$invalidate(3, showCardBack = $$props.showCardBack);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*selected, flashcardIndex*/ 129) {
    			// let chapterIndex = 0;
    			$$invalidate(2, question = quiz[selected - 1][flashcardIndex].question);
    		}

    		if ($$self.$$.dirty & /*selected, flashcardIndex*/ 129) {
    			$$invalidate(1, answer = quiz[selected - 1][flashcardIndex].answer);
    		}

    		if ($$self.$$.dirty & /*selected*/ 1) {
    			console.log(selected);
    		}
    	};

    	return [
    		selected,
    		answer,
    		question,
    		showCardBack,
    		toggleShowBack,
    		prevCard,
    		nextCard,
    		flashcardIndex,
    		select_change_handler
    	];
    }

    class Flashcards extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Flashcards",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\Resources.svelte generated by Svelte v3.55.1 */

    const file$1 = "src\\Resources.svelte";

    function create_fragment$1(ctx) {
    	let div;
    	let a;

    	const block = {
    		c: function create() {
    			div = element("div");
    			a = element("a");
    			a.textContent = "Exam Prep";
    			attr_dev(a, "href", "https://www.gisci.org/Exam-Info/Exam-Candidate-Information/Exam-Preparation-Info");
    			add_location(a, file$1, 2, 4, 28);
    			attr_dev(div, "class", "corner");
    			add_location(div, file$1, 1, 0, 2);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, a);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Resources', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Resources> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Resources extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Resources",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.55.1 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let header;
    	let div0;
    	let a0;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let nav;
    	let a1;
    	let t2;
    	let a2;
    	let t4;
    	let a3;
    	let t6;
    	let div1;
    	let a4;
    	let img1;
    	let img1_src_value;
    	let t7;
    	let h10;
    	let t9;
    	let p;
    	let t11;
    	let h11;
    	let t13;
    	let router;
    	let current;

    	router = new Router({
    			props: {
    				routes: {
    					'/': Home,
    					'/flashcards': Flashcards,
    					'/resources': Resources
    				}
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			header = element("header");
    			div0 = element("div");
    			a0 = element("a");
    			img0 = element("img");
    			t0 = space();
    			nav = element("nav");
    			a1 = element("a");
    			a1.textContent = "Home";
    			t2 = space();
    			a2 = element("a");
    			a2.textContent = "Flashcards";
    			t4 = space();
    			a3 = element("a");
    			a3.textContent = "Resources";
    			t6 = space();
    			div1 = element("div");
    			a4 = element("a");
    			img1 = element("img");
    			t7 = space();
    			h10 = element("h1");
    			h10.textContent = "Welcome to the GISCI GISP Study guide";
    			t9 = space();
    			p = element("p");
    			p.textContent = "Resources include links to study guide pdf's, videos's, and flashcards to play with.";
    			t11 = space();
    			h11 = element("h1");
    			h11.textContent = "GOOD LUCK!";
    			t13 = space();
    			create_component(router.$$.fragment);
    			if (!src_url_equal(img0.src, img0_src_value = "/black.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "black-gisci");
    			attr_dev(img0, "class", "svelte-1lf5ubu");
    			add_location(img0, file, 11, 3, 288);
    			attr_dev(a0, "href", "https://www.gisci.org/Exam-Info");
    			attr_dev(a0, "class", "svelte-1lf5ubu");
    			add_location(a0, file, 10, 2, 242);
    			attr_dev(div0, "class", "corner svelte-1lf5ubu");
    			add_location(div0, file, 9, 1, 219);
    			attr_dev(a1, "href", "#/");
    			attr_dev(a1, "class", "svelte-1lf5ubu");
    			add_location(a1, file, 15, 2, 355);
    			attr_dev(a2, "href", "#/flashcards");
    			attr_dev(a2, "class", "svelte-1lf5ubu");
    			add_location(a2, file, 16, 2, 380);
    			attr_dev(a3, "href", "#/resources");
    			attr_dev(a3, "class", "svelte-1lf5ubu");
    			add_location(a3, file, 17, 2, 420);
    			attr_dev(nav, "class", "svelte-1lf5ubu");
    			add_location(nav, file, 14, 1, 347);
    			if (!src_url_equal(img1.src, img1_src_value = "/black.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "black-gisci");
    			attr_dev(img1, "class", "svelte-1lf5ubu");
    			add_location(img1, file, 23, 3, 527);
    			attr_dev(a4, "href", "https://www.gisci.org");
    			attr_dev(a4, "class", "svelte-1lf5ubu");
    			add_location(a4, file, 22, 2, 491);
    			attr_dev(div1, "class", "corner svelte-1lf5ubu");
    			add_location(div1, file, 21, 1, 468);
    			attr_dev(header, "class", "svelte-1lf5ubu");
    			add_location(header, file, 8, 0, 209);
    			add_location(h10, file, 28, 0, 596);
    			add_location(p, file, 29, 0, 643);
    			add_location(h11, file, 30, 0, 735);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div0);
    			append_dev(div0, a0);
    			append_dev(a0, img0);
    			append_dev(header, t0);
    			append_dev(header, nav);
    			append_dev(nav, a1);
    			append_dev(nav, t2);
    			append_dev(nav, a2);
    			append_dev(nav, t4);
    			append_dev(nav, a3);
    			append_dev(header, t6);
    			append_dev(header, div1);
    			append_dev(div1, a4);
    			append_dev(a4, img1);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, h10, anchor);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, p, anchor);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, h11, anchor);
    			insert_dev(target, t13, anchor);
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(h10);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(h11);
    			if (detaching) detach_dev(t13);
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Router,
    		location,
    		link,
    		Home,
    		Flashcards,
    		Resources
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
      props: {
        name: "black",
      },
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
