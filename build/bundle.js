
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
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
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
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function stop_propagation(fn) {
        return function (event) {
            event.stopPropagation();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function set_custom_element_data_map(node, data_map) {
        Object.keys(data_map).forEach((key) => {
            set_custom_element_data(node, key, data_map[key]);
        });
    }
    function set_custom_element_data(node, prop, value) {
        if (prop in node) {
            node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
        }
        else {
            attr(node, prop, value);
        }
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
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
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
    /**
     * Associates an arbitrary `context` object with the current component and the specified `key`
     * and returns that object. The context is then available to children of the component
     * (including slotted content) with `getContext`.
     *
     * Like lifecycle functions, this must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-setcontext
     */
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
        return context;
    }
    /**
     * Retrieves the context that belongs to the closest parent component with the specified `key`.
     * Must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-getcontext
     */
    function getContext(key) {
        return get_current_component().$$.context.get(key);
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

    /** regex of all html void element names */
    const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
    function is_void(name) {
        return void_element_names.test(name) || name.toLowerCase() === '!doctype';
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
    function validate_dynamic_element(tag) {
        const is_string = typeof tag === 'string';
        if (tag && !is_string) {
            throw new Error('<svelte:element> expects "this" attribute to be a string.');
        }
    }
    function validate_void_dynamic_element(tag) {
        if (tag && is_void(tag)) {
            console.warn(`<svelte:element this="${tag}"> is self-closing and cannot have content.`);
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
    function create_else_block$1(ctx) {
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
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(267:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (260:0) {#if componentParams}
    function create_if_block$2(ctx) {
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
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(260:0) {#if componentParams}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$2, create_else_block$1];
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
    		id: create_fragment$a.name,
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

    function instance$8($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$8, create_fragment$a, safe_not_equal, {
    			routes: 3,
    			prefix: 4,
    			restoreScrollState: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$a.name
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

    function create_fragment$9(ctx) {
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
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props) {
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
    		init(this, options, instance$7, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$9.name
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
      { id: 7, text: `Chapter 7: Database Design and Management` },
    ];

    const resources = [
      [
        {
          name: "Direction Magazine Podcast and many other resources",
          link: "https://www.directionsmag.com/article/8411",
        },
        {
          name: "Geotech Concept Modules and Demonstration Videos",
          link: "https://www.geotechcenter.org/concept-modules-and-demonstration-videos8203.html",
        },
        {
          name: "GeoTech Center Personal Assessment Center",
          link: "https://www.geotechcenter.org/personal-assessment-center.html",
        },
      ],

      [
        {
          name: "Free GIS Fundamentals, 6th Edition book",
          link: "https://www.paulbolstad.net/gisbook.html",
        },
        {
          name: "A to Z GIS: An Illustrated Dictionary of Geographic Information Systems",
          link: "https://archive.org/details/tozgisillustrate0000unse",
        },
      ],

      [
        {
          name: "EXAM BLUEPRINT (2019) REVISED BP CROSSWALK",
          link: "https://www.gisci.org/Portals/0/PDF's/REVISED%20BP%20-%20Official%20-%20July%202019.pdf",
        },
        {
          name: "EXAM CANDIDATE MANUAL",
          link: "https://www.gisci.org/Portals/0/PDF's/Exam%20Candidate%20Manual%20Word%20June%202022.pdf?ver=EDJzxaULPf3ORUrX_YjxcQ%3d%3d",
        },
        {
          name: "GIS&T BODY OF KNOWLEDGE",
          link: "https://ucgis.memberclicks.net/assets/docs/gist_body_of_knowledge.pdf",
        },
        {
          name: "TEACHMEGIS PREP COURSE",
          link: "https://www.gisci.org/Portals/0/PDF's/Exam%20Candidate%20Manual%20Word%20June%202022.pdf?ver=EDJzxaULPf3ORUrX_YjxcQ%3d%3d",
        },
        {
          name: "UNOFFICIAL EXAM STUDY GUIDE",
          link: "https://www.gisci.org/Portals/0/PDF's/GISP%20Unofficial%20Study%20Guide%202019%20v2.pdf?ver=hWEX0NspSVz4XcX0FFf3YA%3d%3d",
        },
      ],

      [
        {
          name: "Getting started on your GISP",
          link: "https://www.youtube.com/watch?v=maisz8INlt8",
        },
        {
          name: "MAGIC Webinar: GISP Certification",
          link: "https://www.youtube.com/watch?v=Qwn3xuJ7YT0",
        },
        {
          name: "Why Pursue the GISP Designation - Lunch and Learn",
          link: "https://www.youtube.com/watch?v=f4gIfJSwaZw",
        },
        {
          name: "GISP - A Student Perspective Webinar (Nov. 18th, 2015, BIll Hodge, GISP)",
          link: "https://snhu.adobeconnect.com/_a798560077/p18d75wxkj8/?OWASP_CSRFTOKEN=9349efa6d6e2165ddbd37aa389f54fa3c2d7ef724f9d428d4d3f9446ed5b4db1",
        },
        {
          name: "Mapscaping Podcast: How to Become a Certified GIS Professional",
          link: "https://mapscaping.com/podcast/how-to-become-a-certified-gis-professional/",
        },
      ],
    ];

    const quiz = [
      [
        {
          question: "Georeferencing",
          answer: "101- associating a map or image with spatial location",
        },
        {
          question: "control points",
          answer:
            "101- points come in pairs that match the spatial location with a point on an unreferenced image or map",
        },
        {
          question: "Spatial Reference Systems (SRS)",
          answer:
            "101- coordinate based local, regional, or global system used to location geographical entities (aka Coordinate Reference System (CRS))",
        },
        {
          question: "Coordinate Reference System (CRS)",
          answer:
            "101- coordinate based local, regional, or global system used to location geographical entities (aka Spatial Reference Systems (SRS))",
        },
        {
          question: "International Terrestrial Reference System (ITRS)",
          answer:
            "101- a three-dimensional coordinate system with a well-defined origin (the center of mass of the Earth) and three orthogonal coordinate axes (X,Y,Z)",
        },
        {
          question: "Map projection",
          answer:
            "101- transforming coordinated from a curved surface (Earth) to a flat map",
        },
        {
          question: "Horizontal datum",
          answer:
            "101- model of the earth as a spheroid (2 components, reference ellipsoid and a set of survey points both the shape of the spheroid and its position relative to the earth)",
        },
        {
          question: "Vertical Datum",
          answer: "101- reference point for measuring elevations",
        },
        {
          question: "NAVD88",
          answer: "101- Gravity based geodetic datum in North America",
        },
        {
          question: "WGS 84 (World Geodetic System)",
          answer:
            "101- reference coordinate system used by the Global Positioning System (GPS)",
        },
        {
          question: "SRID integer",
          answer:
            "101- Spatial reference system id numbers, including EPSG codes defined by the International Association of Oil and Gas Producers",
        },
        {
          question: "types of distortion",
          answer:
            "101- Distance, Direction, Shape, Area (sometimes bearing and scale)",
        },
        {
          question: "Mercator Projection- distortions",
          answer: "101- preserves shape and direction, area gets distorted",
        },
        {
          question: "Mercator Projection",
          answer: "101- projecting the Earth onto a cylinder tangent to a meridian",
        },
        {
          question: "Azimuthal Projection- distortions",
          answer:
            "101- distance from center is true, other properties distort with distance",
        },
        {
          question: "Azimuthal Projection",
          answer:
            "101- planar or tangent (meaning they are formed when a flat piece of paper is placed on top of the globe and a light source projects the surrounding areas on to a map.) Either the North Pole or the South pole is orientated at the center of the map, giving the viewer an impression of looking up or down at Earth.",
        },
        {
          question: "Cylindrical Projection- distortions",
          answer:
            "101- preserve area and shape, distance gets distorted, especially on upper and lower regions of the map",
        },
        {
          question: "Cylindrical Projection",
          answer:
            "101- 2 types Tangent (1 intersect) and Secant (2 intersects)Straight meridians and parallelsmeridians are equally spaced while parallels are not",
        },
        {
          question: "Conical Projection- distortions",
          answer:
            "101- preserves direction and area in limited areas, distorts distance and scale except along standard parallels",
        },
        {
          question: "Conic Projections",
          answer:
            "101- mapped to equally spaced lines by projecting a spherical surface onto a cone",
        },
        {
          question: "Choosing a Projection- Low LATITUDE, (near Equator)",
          answer: "101- use conical projection",
        },
        {
          question: "Choosing a Projection- High LATITUDE, Polar Regions",
          answer: "101- use azimuthal planar projections",
        },
        {
          question: "Choosing a Projection- EXTENT, broad East-West (e.g. USA)",
          answer: "101- use conical projection",
        },
        {
          question:
            "Choosing a Projection- EXTENT, broad North-South (e.g. Africa)",
          answer: "101- use transverse-case cylindrical projection",
        },
        {
          question:
            "Choosing a Projection- THEMATIC, analysis that compares different values in different locations",
          answer: "101- use an equal-area projection",
        },
        {
          question: "Discrete features",
          answer: "102- feature has a definable boundary (think, vector)",
        },
        {
          question: "continuous phenomena",
          answer:
            "102- each location is a measure of something, often temperature or elevation (think raster, but not always)",
        },
        {
          question: "Geoid",
          answer:
            "103- the shape that the surface of the oceans would take under the influence of Earth's gravitation and rotation alone (absent of the influence of wind or tide)",
        },
        {
          question: "Mean Sea Level (MSL)",
          answer:
            "103- is determined by referencing the geoid model which registers ocean's water level at coastal places using tide gauges",
        },
        {
          question: "Reference Ellipsoid",
          answer:
            "103- is a mathematically defined surface that approximates the geoid (a truer model of shape that geoid)",
        },
        {
          question: "oblate ellipsoid",
          answer:
            "103- fits the geiod model to a first order approximationformed when an ellipse is rotated about its minor axis (The shape of the Earth, slightly bulging at the Equator.)",
        },
        {
          question: "sphere",
          answer:
            "103- can be seen from dimensions of the Earth ellipsoidthe semi-major axis (a) and semi-minor axis (b) differ by little more than 21 kilometers",
        },
        {
          question: "first (direct) geodetic problem",
          answer:
            "103- Given a point (coordinates) and direction (azimuth) and distance from that point to a second point, determine the coordinates of a second pointBe prepared for Word Problems like this one",
        },
        {
          question: "Second (inverse) geodetic problem",
          answer:
            "103- given two points, determine the azimuth and length of the line that connects them (line may be straight, arc, or geodesic)Be prepared for Word Problems like this one",
        },
        {
          question: "Geomatics",
          answer:
            "104- branch of science (and technology) of collection, analysis, interpretation of geographic information(includes surveying, mapping, remote sensing, GIS, GPS)",
        },
        {
          question: "GPS (global positioning system)",
          answer:
            "104- A system that determines the precise position of something on Earth through a series of satellites, tracking stations, and receivers.",
        },
      ],
      [
        {
          question: "Spatial Modeling",
          answer:
            "201- A methodology or set of analytical procedures used to derive information about spatial relationships between geographic phenomena.",
        },
        {
          question: "Types of spatial models",
          answer:
            "201-VectorRasterPixelGeodatabaseGridTINTopologicalHierarchicalNetworkObject Oriented",
        },
        {
          question: "Vector Spatial Modeling",
          answer: "201- coordinated based data model (points, lines, and polygons)",
        },
        {
          question: "Vector Spatial Modeling- Points",
          answer:
            "201- Discrete locations represented by a coordinate pair, attributes can be associated(e.g. Sign, city centers, geocoding addresses)",
        },
        {
          question: "Vector Spatial Modeling- Lines",
          answer:
            "201- Linear features composed of an ordered list of vertices, attributes can be associated(e.g. rivers, roads, utility lines)",
        },
        {
          question: "Vector Spatial Modeling- Polygons",
          answer:
            "201- composed of nodes and vertices forming bounded areas; start and end node are the same, attributes can be associated(e.g. water bodies, parcels, land masses)",
        },
        {
          question: "Raster Spatial Modeling",
          answer:
            "201- composed of a rectangular array of regularly spaced square grid cells, each cell having an independent value (attribute)Single or multi bandRaster coordinated are stored by ordering the matrix(e.g. elevation, temperature)",
        },
        {
          question: "Pixel Spatial Modeling",
          answer:
            "201- smallest resolvable piece of scanned imagea pixel is always a cell but a cell is not always a pixel",
        },
        {
          question: "Geodatabase Spatial Modeling",
          answer:
            "201- object oriented spatial modelBasic Components- feature classes, feature datasets, non-spatial tablesComplex Components- topology, relation ship classes, geometric networksRelationship Classes- model real-world relationships that exist between objects (such as parcels and buildings)",
        },
        {
          question: "Grid Spatial Modeling",
          answer:
            "201- parallel and perpendicular lines for reference as a map projection or coordinate system",
        },
        {
          question: "Triangulated Irregular Network (TIN) Spatial Modeling",
          answer:
            "201- Composite vector data that approximate the terrain with a set of contiguous, non-overlapping (Delaunay) triangles, circumcircle can not contain more than three pointsMay be asked to create Delaunay Triangles",
        },
        {
          question: "Advantages of TIN Spatial Modeling",
          answer:
            "201- small areas with high precision elevation data,more efficient storage than DEM or contour lines",
        },
        {
          question: "Disadvantages of TIN Spatial Modeling",
          answer:
            "201- high cost,requires highly accurate data source,TIN production is computing intensive",
        },
        {
          question: "Topological Spatial Modeling",
          answer:
            "201- topology is implemented through a set of rules that define how features may share a geographic space and a set of editing tools that work with features that share geometry in an integrated fashion. (ESRI). The physical and logical design of a network; examples include mesh, bus, ring and star; the physical layout of the network devices and the vectoring, and how all the components communicate with each other",
        },
        {
          question: "Hierarchical Spatial Modeling",
          answer:
            "201- database that stores related information in a tree-like structure",
        },
        {
          question: "Network Spatial Modeling",
          answer:
            "201- collection of topologically connected network elements (edges, junctions, turns)Each element is associated with a collection of network attributes",
        },
        {
          question: "Object Oriented Spatial Modeling",
          answer:
            "201- data management structure, stores data as objects (classes), instead of rows and tables like a relational database(e.g. SQL Server, Oracle, PostgreSQL)",
        },
        {
          question: "Bolstad Spatial Modeling- Cartographic Model",
          answer:
            "201- Temporally Static, combined spatial datasets, operations and functions for problem-solving",
        },
        {
          question: "Bolstad Spatial Modeling- Spatio-temporal Models",
          answer: "201- dynamic in time and spacetime-driven processes",
        },
        {
          question: "Bolstad Spatial Modeling- Network Models",
          answer:
            "210- modeling of resources (flow, accumulation) as limited to networks",
        },
        {
          question: "Goodchild Spatial Modeling- Data Models",
          answer: "201- entities and fields as conceptual models",
        },
        {
          question: "Goodchild Spatial Modeling- Static Modeling",
          answer:
            "201- taking inputs to transform them into outputs using sets of tools and functions",
        },
        {
          question: "Goodchild Spatial Modeling- Dynamic Modeling",
          answer:
            "201- iterative, sets of initial conditions, apply transformations to obtain a series of predictions at time intervals",
        },
        {
          question: "DeMers Spatial Modeling",
          answer:
            "201- Based on purpose descriptive- passive, description of the study area,perspective- active, imposing beat solution",
        },
        {
          question: "DeMers Spatial Modeling- Methodology Stochastic",
          answer:
            "201- based on statistical probability deterministic- based on knowing functional linkages and interaction",
        },
        {
          question: "DeMers Spatial Modeling- logic inductive",
          answer:
            "201- general models based on individual data, deductive- from general to specific using known factor and relationships",
        },
        {
          question: "Types of Spatial Data Relationships",
          answer:
            "202- 1 to 1- Each object of the origin table can be related to 0 or 1 object of the destination table.. 1 to Many- Each object of the origin table can be related to multiple objects in the destination table. Many to Many- Multiple objects in the origin table can be related to multiple objects in the destination table",
        },
        {
          question: "Equal Spatial Data Relationships (topological relations)",
          answer: "202- a=b (topologically equal)",
        },
        {
          question: "Disjointed Spatial Data Relationships (topological relations)",
          answer:
            "202- a and b are disjointed, have no point in common. They form a set of disconnected geometries.",
        },
        {
          question: "Intersects Spatial Data Relationships (topological relations)",
          answer: "202- some common interior points",
        },
        {
          question: "Touches Spatial Data Relationships (topological relations)",
          answer:
            "202- a touches b, at least one boundary point in common but no interior points",
        },
        {
          question: "Contains Spatial Data Relationships (topological relations)",
          answer: "202- feature b is within feature a",
        },
        {
          question: "Covers by Spatial Data Relationships (topological relations)",
          answer:
            "202- b lies in the interior of a (extends Contains)Other definitions: no points of b lie in the exterior of a, or Every point of b is a point of (the interior of) a",
        },
        {
          question: "Covered by Spatial Data Relationships (topological relations)",
          answer: "202- every point of feature b is a point of feature a",
        },
        {
          question: "Within Spatial Data Relationships (topological relations)",
          answer: "202- a is within b",
        },
        {
          question: "Crosses Spatial Data Relationships (topological relations)",
          answer: "202- a crosses b at some point",
        },
        {
          question: "Overlaps Spatial Data Relationships (topological relations)",
          answer: "202- a and b have common interior points",
        },
        {
          question: "Basic Topology Rules- Polygons",
          answer:
            "202- Must: be larger than cluster tolerance, be covered by feature class of, cover each other, be cover by, boundary must be covered by, area boundary must be covered by, contains pointMust not: overlap, have gaps, not overlap with",
        },
        {
          question: "Basic Topology Rules- Lines",
          answer:
            "202- Must: be larger than cluster tolerance, be covered by feature class of, be covered by boundary of, be inside, endpoint must be covered by, be single part. Must not: overlap, intersect, not intersect with, have dangles, have pseudo nodes, intersect or touch interior, intersect or have interior with, overlap with, self-overlap, self-intersect",
        },
        {
          question: "Basic Topology Rules- Points",
          answer:
            "202- Must: coincide with, be disjoint, be covered by boundary of, be properly inside, be covered by endpoint of, be covered by line",
        },
        {
          question: "Geometric Accuracy- Data Quality",
          answer:
            "203- how close the x-y values of a data set correspond to the actual locations on the earth's surface",
        },
        {
          question: "Root Mean Squared Error (RMS)- Data Quality",
          answer:
            "203- a calculation to describe the difference between the measurement and the true value, applies to georectificationcalculated as the square root of the average squared errors",
        },
        {
          question: "Thematic Accuracy- Data Quality",
          answer: "203- accuracy of non-spatial (attribute) data",
        },
        {
          question: "Resolution- Data Quality",
          answer:
            "203- smallest separation between two coordinate values (e.g. raster cell size)",
        },
        {
          question: "Precision- Data Quality",
          answer: "203- level of measurement and exactness of attribute data",
        },
        {
          question: "Fitness for Use- Data Quality",
          answer: "203- Does the data fulfill the needs of the project",
        },
        {
          question: "Confusion Matrix- Data Quality",
          answer:
            "203- assesses accuracy of image classification based on additional ground truths",
        },
        {
          question: "Quality Assurance- Data Quality",
          answer:
            "203- Process oriented and focuses on defect preventionEstablished a good quality management system and assessment of its adequacy- periodic audits- managerial tool",
        },
        {
          question: "Quality Control- Data Quality",
          answer:
            "203- product oriented and focuses on defect identificationFinding and eliminating sources of quality problems through tools and equipment- corrective tool",
        },
        {
          question: "Imprecision- Data Quality",
          answer:
            "203- all data is taken from a 3D globe and transferred to a 2D surface through spatial transformations (projections and datums) which caused inherent distortions with the data",
        },
        {
          question: "Uncertainty- Data Quality",
          answer:
            "203- The GIS data was created/collected at a certain point of time, may already be out of date",
        },
        {
          question: "Data Resolution",
          answer:
            "204- the cell size of a rasterthat area covered by the ground represented by just one cell",
        },
        {
          question: "Data Validation",
          answer:
            "205- to ensure the accuracy of the data is preserved,-ground observations to ensure data accuracy-can also be compared to model generated data (less accurate)",
        },
        {
          question: "Data Uncertainty",
          answer:
            "205- difference between real world and GIS,-may be visible from the original data or measuring that data,-assumptions made when creating data-model structure-retrieval errors, sampling errors, and inadequate ground observations",
        },
        {
          question: "Metadata",
          answer:
            "206- information that describes the content quality, condition, origin, and other characteristics of data, databases, or other pieces of information",
        },
        {
          question: "Temporal Data",
          answer:
            "207- data that represents a state in time (e.g. rain fall for one day)",
        },
        {
          question: "Federal Geographic Data Committee (FGDC)",
          answer:
            "208- purpose is to build a data infrastructure for improved public and private sector application of geospatial data and decision-makingInclude title, abstract, date, geographic extent and projection info, attribute label definitions and domain values",
        },
        {
          question: "Content Standard for Digital Geospatial Metadata (CSDGM)",
          answer:
            "208-ISO 19115- developed for documenting vector and point data and geospatial services (web-mapping, data catalogs, and data modeling applications)ISO 19115-2 adds elements to describe imagery and grid data, as well as data collected using instruments (monitoring stations and measurement devices)",
        },
        {
          question: "Open GIS Consortium (OGC)",
          answer:
            "208- Describes basic data model for holding geographic data (such as KML)",
        },
      ],
      [
        {
          question: "Thematic Map",
          answer:
            "301- map especially designed to show a particular theme connected with a geographic area (population, income level)",
        },
        {
          question: "Choloropleth Maps",
          answer:
            "301- areas shaded according to prearranged key, each shading or color type represent a range of values",
        },
        {
          question: "Proportional Symbol",
          answer:
            "301- size of the symbol corresponds to the magnitude of the mapped feature",
        },
        {
          question: "Isarithmic or Isopleth",
          answer:
            "301- lines of equal value are drawn (contour lines) or ranges of similar values are filled with similar colors or patterns",
        },
        {
          question: "Dot",
          answer:
            "301- Shows distribution of phenomena where values and location are known - place a dot where the location of variable is",
        },
        {
          question: "Dasymetric",
          answer:
            "301- alternative to choropleth - ancillary information is used to model internal distribution of the phenomenon",
        },
        {
          question: "Multivariate displays",
          answer: "301- more than 2 sets of data on a single map",
        },
        {
          question: "Web Mapping",
          answer:
            "301- The use of the internet to generate and distribute (share) spatial data and maps",
        },
        {
          question: "Map layout elements",
          answer:
            "302- title, map, legend, map scale, supporting media, north arrow, metadata (sources, currency of information, projection, copyright, authorship)",
        },
        {
          question: "Symbols",
          answer: "302- representations of feature of a map",
        },
        {
          question: "Map Accuracy",
          answer:
            "302- difficult to assess, all maps show a selective view of reality - should ask instead if map is appropriate for my purposes",
        },
        {
          question: "Map Scale",
          answer:
            "302- The relationship between the size of an object on a map and the size of the actual feature on Earth's surface.",
        },
        {
          question: "Symbolization Variables",
          answer: "302- size, shape, orientation, pattern, hue, value",
        },
        {
          question: "Quantitative Map Elements",
          answer:
            "302- Size- the size of the point or thickness of lineValue- the shade of the color such as dark red or light red",
        },
        {
          question: "Qualitative Map Elements",
          answer:
            "302- Shape- symbology of a pointPattern- lines having different styles such as dashed linesHue- different colors",
        },
        {
          question: "Typography Map Elements",
          answer:
            "302- the style, arrangement, and appearance of text, point size, line length, typefaces",
        },
        {
          question: "Verbal Map Scale",
          answer:
            "302- States in words the relationship between the distance on the map and the actual distance on Earth's surface",
        },
        {
          question: "Visual Map Scale",
          answer: "302- graphic scale or bar scale",
        },
        {
          question: "Representative Map Scale",
          answer:
            "302- representative fraction or ratio scale 1:24,000 or 1 in-24,000 feet",
        },
        {
          question: "Absolute Map Scale",
          answer:
            "302- system of measurement that begins at a minimum or zero point and progresses in only one direction",
        },
        {
          question: "Relative Map Scale",
          answer:
            "302- Arbitrary; begins as some point defined by author and can progress in both directions",
        },
        {
          question: "Display vs Data",
          answer:
            "302- the data is built at a certain scale/accuracy but once the data is displayed in any other format that the one it was made for, the scale gets warped. Ex. a map made as 9x10 that is then scaled down and printed in a newspaper",
        },
        {
          question: "Large Map Scale",
          answer:
            "302- larg ratio between map units and ground units, zoomed in (USGS Topo map)",
        },
        {
          question: "Small Map Scale",
          answer:
            "302- small ratio between map units and ground units small, zoomed out (whole country)",
        },
        {
          question: "3D Mapping brings... (visualization)",
          answer:
            "304- a z-value, typically elevation or height-including building modeling (BIM)",
        },
        {
          question: "Contour Line (visualization)",
          answer:
            "304- isoline, isopleth, or isarithm; a function of two variables is a curve along which the function has a constant value-joins points of an equal value on a line",
        },
        {
          question: "Contour Interval (visualization)",
          answer: "304- difference in elevation between successive contour lines",
        },
        {
          question: "Index Contour (visualization)",
          answer: "304- the contour that is thicker and typically labeled",
        },
        {
          question: "Iso (line) (visualization)",
          answer: "304- iso=equal, equal distance between lines",
        },
      ],
      [
        {
          question: "Primary Data",
          answer:
            "401- information that is collected for the first time for the author's purpose; used for solving the particular problem under investigation",
        },
        {
          question: "Secondary Data",
          answer:
            "401- information that already exists somewhere, having been collected for another purpose by someone other than the author",
        },
        {
          question: "5 types of measurement",
          answer:
            "physical measurement, observation of behavior, archives, explicit reports, computational modeling",
        },
        {
          question: "Physical Measurement",
          answer:
            "401- Recording physical properties of the earth or its inhabitants - size, number, temperature, chemical makeup, moisture etc.",
        },
        {
          question: "Observation of Behavior",
          answer:
            "401- Observable actions or activities of individuals or groups - not thoughts, feelings or motivations",
        },
        {
          question: "Archives",
          answer:
            "401- records that have been collected primarily for non-research purposes (secondary)",
        },
        {
          question: "Explicit Reports",
          answer: "401- beliefs people express about things -surveys",
        },
        {
          question: "Computational Modeling",
          answer:
            "401- Models as simplified representations of portions of reality",
        },
        {
          question: "Quantitative Data",
          answer:
            "401- numerical values, measured on at least an ordinal level but could be on a metric level",
        },
        {
          question: "Qualitative Data",
          answer:
            "401- non-numerical or numeral (nominal) values that have no quantitative meaning",
        },
        {
          question: "Deceptive Mapping",
          answer:
            "401- a map purposely distorted for gain (e.g. propaganda, military deception)",
        },
        {
          question: "Layer",
          answer: "mechanism to display geographic data",
        },
        {
          question: "Data Transfer Standards- Transfer",
          answer:
            "401- a robust way of transferring GIS data between computers with no information loss, including metadatafollow Spatial Data Transfer Standards (SDTS) or Federal Information Processing Standard (173)-",
        },
        {
          question: "Data Transfer Standards- Industry Standards",
          answer:
            "401- typically don not exchange topology, only graphic info; large number of format translators",
        },
        {
          question: "Data Transfer Standards- Open GIS Consortium (OGC)",
          answer:
            "401- non-profit, international, voluntary consensus standards organization-Created Geography Markup Language (GML) an xML based encoding standard",
        },
        {
          question: "Field Data Collection- Remote Sensing",
          answer:
            "402- 3 resolutions- spatial, spectral (EM Spectrum), and temporal (repeat cycle)",
        },
        {
          question: "Spatial Resolution",
          answer:
            "503- size of object that can be resolved and the most usual measure is the pixel size",
        },
        {
          question: "Spectral Resolution",
          answer: "503- parts of the electromagnetic spectrum that are measurable",
        },
        {
          question: "Temporal Resolution",
          answer:
            "503- repeat cycle- frequency with which images are collected for the same area",
        },
        {
          question: "Field Data Collection- Ground Survey",
          answer:
            "402- based on principle that the 3-D location of any known point can be determined by measuring angles and distances from other known points-expensive and time consuming",
        },
        {
          question: "Field Data Collection- GPS",
          answer:
            "402- Using a GPS receiver to receive signals from the GPS satellites to calculate the current position and time",
        },
        {
          question: "Field Data Collection- Inspection",
          answer:
            "402- data has already been geographically located and needs to be verified",
        },
        {
          question: "Field collection process",
          answer:
            "402- Determine the result of field work-determine what needs to be collected, inspected, or surveyed (field collection survey form)-determine how it will be collected (tablet, pen and paper)-begin collection, review a sample and make adjustments-plan location and timing-start collection",
        },
        {
          question: "Types of Remote Sensing Systems",
          answer:
            "404- passive- gather radiation emitted from objects (photography, infrared) -active- emits energy and measures the amount of energy returned from target objects (RADAR, LIDAR)",
        },
      ],
      [
        {
          question: "Data Format Conversion",
          answer:
            "501- converting data from one form to another (such as a vector to a raster)",
        },
        {
          question: "Data Transformation",
          answer:
            "501- Process of changing the data from their original form to a format suitable for performing a data analysis addressing research objectives. (Converting data from different coordinate systems, or one data structure to another)",
        },
        {
          question: "Spatial Data Generalization",
          answer:
            "502- Selection- only selecting certain features to be displayedRemoving DetailSimplification- smoothing out detailed and complicated featuresDissolve and Merge- combining similar neighbor elementsAggregation- combining features into a new composite featureExaggeration- making features larger or smaller in scale than they are",
        },
        {
          question: "Vector Spatial File Type - Advantages",
          answer:
            "503- Represent point line and area accurately-more efficient that raters in storage-supports topology-interactive retrieval-enables map generalization",
        },
        {
          question: "Vector Spatial File Type - Disadvantages",
          answer:
            "503- Less intuitively understood-multiple vectors overlay is computationally intensive-display and plotting vectors can be expensive",
        },
        {
          question: "Raster Spatial File Type - Advantages",
          answer:
            "503- Easy to understand-good to represent surfaces-easy to input and outputeasy to draw on a screen-analytical operations are easier",
        },
        {
          question: "Raster Spatial File Type - Disadvantages",
          answer:
            "503- inefficient for storage-compression techniques not efficient with variable data-large cells could potentially cause information loss-poor at representing points, lines, areas-each cell can be owned buy only one feature-must include redundant or missing data",
        },
        {
          question: "Vector File Types",
          answer:
            "503- PostScript- page definition language to export or print a map Digital Exchange Format (DXF)- AutoCAD- no topology but lots of detail Digital Line Graph (DLG)- distributed by the government and most GIS packages will import but extra manipulation is needed TIGER- block level maps of every village, town, and city in the US Shapefile- vector data format stores location, shape and attributes Scalable Vector Graphics (SVG)- extension of the XML language ArcInfo Coverage- stores set of thematically associated data considered to be a unit ArcInfo Interchange File (.eoo) - known as ArcGIS export file Geodatabase- object oriented data model represents features and attributes as objects",
        },
        {
          question: "Raster File Types",
          answer:
            "503- standard- rows and columns with header information Tagged Image File Formats (TIFF)- associated with scanners GEO-TIFF- puts latitude/longitude at edge of pixels Graphic Interchange Format (GIF)- image files for sharp edges and few gradations of color Joint Photograph Experts Group (JPEG)- variable-resolution compression system with both partial and full resolution recovery Digital Elevation Model (DEM)- 30 meter elevation data 1:24,000, 7.5 minute quadrangle maps or 1:250,000 3 second arc second digital terrain data Band Interleaved by Pixel (BIP) or by Line (BIL)- good as storing different brightness levels RS Landsat- satellite imagery and BIL information are combined",
        },
        {
          question: "Vector and Raster Transformations",
          answer:
            "503- R to V- not difficult based on pixel valueV to R- very difficult because pixels may distort the lines or exact point locations and would need to be re-digitized",
        },
        {
          question: "Shapefile File Type (SHP)",
          answer:
            "503- .shp** - shape format -feature geometry itself-.shx- shape index format- positional index of the feature geometry to allow seeking forward and backwards quickly-.dbf**- Database File- attribute information-.prj**- projection format- information pertaining to coordinate system, all text on a single line with no extra spaces-.sbn & .sbx- optional spatial index files to optimize spatial queries shp.xml - geospatial metadata in XML format**required for proper visualization of a Shapefile and its attributes",
        },
        {
          question: "Geodatabase (.gdb)",
          answer:
            "503- data structure for ArcGIS and is the primary data format used for editing and data management-.gdb- file geodatabase-.mdb- personal geodatabase based on Microsoft Access",
        },
        {
          question: "Coverage File",
          answer:
            "503- point, arc, node, route, route system, section, polygon, and region",
        },
        {
          question: "DGN File",
          answer: "503- A file format supported by MicroStation and AutoCAD",
        },
        {
          question: "TXT File",
          answer:
            "A simple file consisting of lines of text with no formatting that almost any computer can open and display",
        },
        {
          question: "IMG File",
          answer: "503- image",
        },
        {
          question: "LAS File",
          answer:
            "503- an industry-standard binary format for storing airborne LiDAR data, point cloud file",
        },
        {
          question: "Raster file types",
          answer: "503- .jpg, .tif, .gif-rendered file formats",
        },
        {
          question: "Databases",
          answer:
            "503- direct connection to relational database management systems and big databases - manage tables and features classes in databases",
        },
        {
          question: "Geodatabase",
          answer:
            "503- A database or file structure used primarily to store, query, and manipulate spatial/GIS data for central access-An object-based vector data model developed by Esri",
        },
        {
          question: "Cloud Computing",
          answer:
            "503- the practice of using a network of remote servers hosted on the Internet to store, manage, and process data, rather than a local server or a personal computer.-Allows single and multiple user editing",
        },
        {
          question: "Integrate Enterprise",
          answer:
            "503- data stored in big business systems to extend their analytical capabilities",
        },
        {
          question: "Data Rules and Relationships",
          answer:
            "503- define relationship between data sets and set rules (domains and subtypes)",
        },
        {
          question: "Metadata Management",
          answer:
            "503- describes content, quality, origin, and other characteristics of data",
        },
        {
          question: "Secures Data",
          answer:
            "503- flexibility and control over how GIS platform is deployed, maintained, secured, and used",
        },
        {
          question: "Versioning Data",
          answer:
            "504- Used to standardize data across systems, that allow it to be queried-extract data from current source-transform data into the current format-load data to final storage point and format",
        },
      ],
      [
        {
          question: "ETL (extraction, transformation, and loading)",
          answer:
            "601- select features based on filters of attributes- new selection, add to selection, remove from selection, subset selection, switch selection, clear selection",
        },
        {
          question: "Attribute Data Selection",
          answer:
            "601- Intersect, within a distance, contains, completely contains, contains Clementini, within, completely within, within Clementini, are identical to, boundary touches, shares a line segment with, crossed by the outline of, have their center in, contained by",
        },
        {
          question: "Spatial Data Selection",
          answer:
            "601- Intersect, within a distance, contains, completely contains, contains Clementini, within, completely within, within Clementini, are identical to, boundary touches, shares a line segment with, crossed by the outline of, have their center in, contained by",
        },
        {
          question: "Location Data Selection",
          answer: "601- select features within a certain distance of a location",
        },
        {
          question: "Data Editing- Buffer",
          answer:
            "601- Creates buffer polygons around input features to a specified distance",
        },
        {
          question: "Data Editing- Dissolve",
          answer: "601- Aggregates features based on specified attributes",
        },
        {
          question: "Data Editing- Merge",
          answer:
            "601- combines tow attribute tables into one using a common key between tables",
        },
        {
          question: "Data Editing- Append",
          answer:
            "601- combines datasets of same data type into an existing dataset",
        },
        {
          question: "Data Editing- Union",
          answer: "601- combines input features with another feature dataset",
        },
        {
          question: "Data Editing- Clip",
          answer:
            "601- extracts input features that overlay the clip features (keeps input attributes)",
        },
        {
          question: "Data Editing- Intersect",
          answer:
            "601- extracts feature which overlap in all layers to new feature class (joins attribute tables)",
        },
        {
          question: "Data Editing- Join",
          answer:
            "601- combine two attribute tables into one using a common key between tables",
        },
        {
          question: "Data Classification",
          answer:
            "602- objects with similar symbols- up to 7 feature classed (5 is preferred)-classes should be exhaustive and should not overlap",
        },
        {
          question: "Data Classification Categories",
          answer:
            "602- Equal Range- equal distance between class breaks -quantiles- equal number of observations in each class -standard deviation- class breaks based on distance of standard deviation from the mean -natural breaks- class breaks conform to gaps in data distribution-symbology- one layer can be symbolized by selected attribute",
        },
        {
          question: "Overlay Analysis Methodology",
          answer:
            "603- GIS analysis that evaluates what features are on top of other features in order to answer spatial questions, based on Boolean logic.Used to define a problem, break problem into submodels, determine significant layer, reclassify or transform data within a layer",
        },
        {
          question: "Spatial Overlay Analysis",
          answer:
            "603- Overlays are the combination of spatial and attribute data from two or more spatial layers that cover the same area to study the relationship between them",
        },
        {
          question: "Overlay Analysis",
          answer:
            "603- GIS analysis that evaluates what features are on top of other features in order to answer spatial questions.",
        },
        {
          question: "Vector Overlay Tools",
          answer:
            "603- identity- input features, split by overlay features-intersect- only features common to all input layers-symmetrical difference- features common to either input layer or overlay layer but not both-union- all input features-update- input feature geometry replaced by update layer",
        },
        {
          question: "Raster Overlay Tools",
          answer:
            "603- zonal statistics- summarizes values in a rater layer by zones (categories) in another layer (e.g. calculate the mean elevation for each vegetation category) combine- assigns a value to each cell in the output layer based on unique combinations of values from several input layers single output map algebra- combines multiple raster layer using an expression (e.g. add several ranked layer to create and overall ranking) weighted overlay- automates the raster overlay process and provides an option to assign weights to each layer before adding weighted sum- overlays several rasters multiplying each by their given weight and sums them together",
        },
        {
          question: "Map Algebra",
          answer:
            "604- various functions performed on neighboring cells for raster datasets",
        },
        {
          question: "Local Operations (Map Algebra)",
          answer:
            "604- combine rasters that overlay each other-add/subtract/etc. the cells that are in the same location",
        },
        {
          question: "Global Operations (Map Algebra)",
          answer:
            "604- applies a formula to all cells-add/subtract/etc. all cells based on one value-find the distance from one cell to all cells",
        },
        {
          question: "Focal Operations (Map Algebra)",
          answer:
            "604- calculated a value based on all neighboring cells-find the average of all the cells around a chosen cell",
        },
        {
          question: "Zonal Operations (Map Algebra)",
          answer:
            "604- computing a value based on cells in a particular zone (such as a watershed)",
        },
        {
          question: "Descriptive Statistics",
          answer:
            "605- numerical data used to measure and describe characteristics of groups. Includes measures of central tendency and measures of variation.-Summarizes a sample to learn about the population",
        },
        {
          question: "Summary Statistics",
          answer:
            "605- statistics that summarize a great deal of numerical information about a distribution, such as the mean and the standard deviation",
        },
        {
          question: "Coefficient of Determination",
          answer:
            "605- R squared - number that indicates how well data fit in a statistical model-fit a line or curve-1 indicated the line fits perfectly with the data-0 indicated the line does not fit at all, data is random",
        },
      ],
      [
        {
          question: "Schema (Database Object)",
          answer:
            "701- structure or design of the database or database object (table, view, index, stored procedure, trigger)-defines tables, fields in each table, relationships between fields-a schema will include information on which fields have domains and what those domains are",
        },
        {
          question: "Data Dictionary",
          answer:
            "701- catalog or table containing information about the datasets stored in a database",
        },
        {
          question: "Domain",
          answer: "701- the range of values for a particular metadata element",
        },
        {
          question: "Attribute Domain",
          answer:
            "701- enforces data integrity, identify what values are allowed in a field in a feature class",
        },
        {
          question: "Coded Value Domain",
          answer:
            "701- attribute domain that defines a set of permissible values for an attribute in a geodatabase - it has a code and its equivalent",
        },
        {
          question: "Range Domain",
          answer:
            "701- attribute domain that specifies a valid range of permissible numerical attribute",
        },
        {
          question: "Spatial Domain",
          answer: "701- allowable range for x,y coordinated and for m, z values",
        },
        {
          question: "Tables (Database Object)",
          answer:
            "701- collection of related data held in structured formation within a database, contains fields and rows",
        },
        {
          question: "Views (Database Object)",
          answer:
            "701- resulting set of a stored query on the data - users can query- virtual table computed dynamically from data when the view is accessed",
        },
        {
          question: "Sequences (Database Object)",
          answer:
            "701- ordered collection of objects in which repetition are allowed (finite or infinite) number of elements is the length of the sequence",
        },
        {
          question: "Synonyms (Database Objects)",
          answer:
            "701- alias or alternate name for a table, view, sequence or other object",
        },
        {
          question: "Indexes (Database Objects)",
          answer:
            "701- data structure that improves the speed of data retrieval operations in a database table-causes more storage space and additional writes-quickly locate data in database-indexes can be on multiple columns",
        },
        {
          question: "Clusters (Database Objects)",
          answer:
            "701- multiple servers share one storage--typically used to handle user load balancing databases distributed to different servers using replication--typically used if you have multiple users utilizing the same data in different physical locations--there is a master database that the replica databases sync between",
        },
        {
          question: "Database Links",
          answer:
            "701- data stored in a different database but accessible to the database currently being accessed",
        },
        {
          question: "Snapshot (Database Objects)",
          answer:
            "701- state of a system at a particular point in time, can be a backup copy",
        },
        {
          question: "Procedure (Database Objects)",
          answer:
            "701- subroutine available to applications that access a relational database system (data validation, access control mechanisms)",
        },
        {
          question: "Trigger (Database Objects)",
          answer:
            "701- procedural code automatically executed in response to certain events on a particular table or view in a database",
        },
        {
          question: "Functions and Subroutines",
          answer:
            "701- sequence of program instructions that perform a specific taskThe difference between a function and a subroutine is that a function can return data, whereas a sub can't.",
        },
        {
          question: "Package (Database Objects)",
          answer:
            "701- built from source with one of the available package management systems",
        },
        {
          question: "Non-schema Objects",
          answer: "701- users, roles, contexts, directory objects",
        },
        {
          question: "Database Design",
          answer:
            "702- process of determining fields, tables and relationships needed to satisfy the data and processing requirements, a detailed model of the database",
        },
        {
          question: "Database Design Process",
          answer:
            "702- (pre-created list on quizlet)System AnalysisConceptual DesignPhysical DesignImplementation & ConversionOperation & Maintenance",
        },
        {
          question: "Conceptual Schema (Database Design Process)",
          answer:
            "702- Step 1 of Database Design ProcessDetermine where relationships and dependency is within the data",
        },
        {
          question: "Logical Data Model (Database Design Process)",
          answer:
            "702- Step 2 of Database Design ProcessArrange data in a logical structure that can be mapped into the storage objects supported by the database management system",
        },
        {
          question: "Physical Model (Database Design Process)",
          answer:
            "702- Step 3 of Database Design Process-physical configuration of the database on the storage media-detailed specification of data elements, data types, indexing options, and other parameters residing in the DBMS data dictionary-models, hardware, software",
        },
        {
          question: "Database Field Type",
          answer:
            "702-short integer- between -32768 and 32768long integer- between -2,147,483,648 and 2,147,483,648float- single-precision floating-point numbersdouble- double-precision floating-point numberstext- free-text, could be a coded value-assign to and integer through a domaindates- a calendar date and/or timeBLOB- (Binary Large Object) data stored as a long sequence of binary numbers - ArcGIS stores annotation and dimensions as BLOB - images, multimedia, bits of codeObject Identifiers- Unique IDs and FIDsGlobal Identifiers- Global ID and GUID - data types store registry sing style strings consisting of 36 characters enclosed in curly bracketsRaster field types- raster can be stored within the geodatabasegeometry -point, line, polygon, multipoint, multipatch",
        },
        {
          question: "Database Administration Basic Tasks",
          answer:
            "703-Backup and recoveryDatabase SecurityStorage and capacity planningPerformance monitoring and tuningTroubleshootingother- high availability and ETL",
        },
        {
          question: "Database Administration Archiving",
          answer:
            "703- captures, manages, and analyzes data changes (most often done with geodatabases)",
        },
        {
          question: "Database Administration Retrieval",
          answer:
            "703- extracting data from a backup due to data loss or data corruption",
        },
        {
          question: "Data Owner",
          answer:
            "704- Individuals, normally managers or directors, who have responsibility for the integrity, accurate reporting and use of computerized data.-user who creates tables, feature classes",
        },
        {
          question: "User Access",
          answer:
            "704- Refers to what permissions each user should be granted in a particular database, and which database objects they will be able to see and use. Administrator- full control of the database; can read, create, update, delete (features and data sets) Editor- can read, update, create, and delete features Creator- can create additional feature classes, tables, and can read update, create, and delete Reader- can only view data",
        },
        {
          question: "Authentication (Data Security)",
          answer:
            "704- database checks the list of users to make sure a user is allowed to make a connection-Operating System (OS) authentication-Database Authentication",
        },
        {
          question: "Groups (Data Security)",
          answer: "704- grant users based on their common functions",
        },
        {
          question: "Public Role (Data Security)",
          answer: "704- right granted to anyone connected to database",
        },
      ],
      [
        {
          question: "File Based Transfer",
          answer: "801- data is in a structured file format",
        },
        {
          question: "Application Programming Interface (API)",
          answer:
            "801- A set of software routines that allows one software system to work with another.",
        },
        {
          question: "Web Services",
          answer:
            "801- Small pieces of code that are accessed via the application server which permit inter-operable machine-to-machine interaction over a network.",
        },
        {
          question: "SSL (Secure Sockets Layer)",
          answer:
            "801- a protocol that provides security when communicating on the Internet (encryption)",
        },
        {
          question: "TLS (Transport Layer Security)",
          answer:
            "801- used to encrypt traffic on the wire. TLS is the replacement for SSL and like SSL, it uses certificates issued by CAs.",
        },
        {
          question: "NTP (Network Transport Protocol)",
          answer:
            "801- communication packet is constructed at different intervals, transferred form host to receiver Transmission Control Protocol (TCP)- header package for the data at the transport layer Internet Protocol (IP)- header is added to internet layer Media Access Control (MAC) address- added at the physical network layer",
        },
        {
          question: "NFS (Network File System)",
          answer:
            "801- A client/server application that enables users to access shared files stored on different types of computers and work with those files as if they were stored locally on their own computers.",
        },
        {
          question: "CIFS Common Internet File System",
          answer:
            "801- a network file system protocol used for providing shared access to files and printers between machines on the network.",
        },
        {
          question: "HTTP (Hypertext Transfer Protocol)",
          answer:
            "801- the protocol used for transmitting web pages over the Internet, a way of delivering map images or map data to web browsers",
        },
        {
          question: "Scripting",
          answer:
            "802- used to manipulate, customize, and automate existing softwareinterpreted by the computer rather than compiled",
        },
        {
          question: "Object-Oriented Programming (OOP)",
          answer:
            "802- designing a program by discovering objects, their properties, and their relationships -contain data in the form of fields (aka attributes) and procedures (aka methods)",
        },
        {
          question: "Extensibility (system design principle)",
          answer:
            "802- implementation take future growth into consideration-level of effort to extend the system and implement the extension",
        },
        {
          question: "Query Expression",
          answer:
            "A type of expression that evaluates to a Boolean (true or false) value, that is typically used to select those rows in a table in which the expression evaluates to true. Query expressions are generally part of a SQL statement.",
        },
        {
          question: "Expression (Scripting Basics)",
          answer:
            "802- most basic programming instruction-contains vales and operators that can reduce to a single value",
        },
        {
          question: "Variables (Scripting Basics)",
          answer:
            "802- value that can change depending on the program or information passed to the program",
        },
        {
          question: "Iterations (Scripting Basics)",
          answer:
            "802- repeating a process to generate an outcome-for loops, do while loops, do until loops",
        },
        {
          question: "Condition Statement (Scripting Basics)",
          answer:
            "802- the result must meet the requirements of the statement-if- a conditional statement expression that is either true or false-else- combined with an if statement and if the statement is false, defaults to the else condition-elif- check if a different condition from the first 'if' is true",
        },
        {
          question: "Agile (Application Development)",
          answer:
            "803- A software development methodology that delivers functionality in mini-increments or rapid iterations, measured in weeks, requiring frequent communication, development, testing, and delivery.Scrum, Crystal, Extreme Programming (XP) and feature-driven developments are types of Agile",
        },
        {
          question: "DevOps (Application Development)",
          answer:
            "803- An approach based on lean and agile principles in which business owners and the development, operations, and quality assurance departments collaborate. -organization changes that enhances collaboration between departments",
        },
        {
          question: "Waterfall (Application Development)",
          answer:
            "803- A series of steps in which a software system trickles down-Requirements, Design, implementation, verification, maintenance",
        },
        {
          question: "Rapid Application Development (RAD) (Application Development)",
          answer:
            "803- A development method that uses special tools and an iterative approach to rapidly produce a high-quality system with low investment cost",
        },
        {
          question: "Spiral Development (Application Development)",
          answer:
            "803- The spiral model is a risk-driven process model generator for software projects. Based on the unique risk patterns of a given project, the spiral model guides a team to adopt elements of one or more process models, such as incremental, waterfall, or evolutionary prototyping.Combines top-down and bottom-up concepts",
        },
      ],
      [
        {
          question: "GPS Basics",
          answer:
            "MISC- 24 satellites, revolution 12 hours (aka 2 Earth orbits a day), Altitude 12,000 miles-Started by DOD in 1970's for military use only-Calculates location by measuring time interval between the transmission and reception of a satellite signal",
        },
        {
          question: "GPS Standard Positioning Service",
          answer:
            "MISC- signal broadcast for civilian useHorizontal location requires 3 satellites (concept is called Trilateration)Vertical location requires 4 satellites",
        },
        {
          question: "NAVSTAR GPS",
          answer:
            "MISC- as of 2010, the only fully-operational GNSS constellationNAVigation Satellite Timing and Ranging-transmits signals on two phase modulated frequencies-transmits a navigation message that contains orbital data for computing the position of all satellites",
        },
        {
          question: "Types of GPS Receivers",
          answer:
            "MISC- Recreational Grade, Mapping Grade, Survey or High Accuracy Grade",
        },
        {
          question: "GPS accuracy is depend on...",
          answer:
            "MISC- type of GPS receiver, field techniques, post processing of data and errors from other sources",
        },
        {
          question: "GPS Errors",
          answer:
            "MISC- Multipatch- errors caused by reflected GPS signals arriving at the GPS receiver-structures and reflective surfaces Atmosphere- signals can experience delays when traveling through the atmosphere (tropospheric and ionospheric delays) Distance from Base Station- differential correction will increase the quality of the data, accuracy is degraded slightly as the distance from base station increases Selective availability- intentional degradation of the GPS signals by the DOD to limit accuracy fro non-US military/government users (currently not a factor) Jammers, Spoofing risk",
        },
        {
          question: "Noise Error (signal)",
          answer:
            "MISC- is the distortion of the satellite signal prior to reaching the GPS receiver and/or and additional signal piggy-backing onto the GPS satellite signal",
        },
        {
          question: "PDOP (Position Dilution of Precision)",
          answer:
            "MISC- conditional collection only when there is an optimum satellite availability (4 or more) and configuration to produce and acceptable (lower, 6 or less) PDOP value (higher PDOP values are bad)",
        },
        {
          question: "Signal-to-noise ratio (SNR) Mask",
          answer:
            "MISC- method of setting a threshold to control the strength of the radiation exposure compared with the amount of noise apparent in a digital image to minimize error",
        },
        {
          question: "Elevation Mask",
          answer:
            "MISC- Set to 15 degrees, default angle to minimize the amount of atmosphere through which the satellite signal must travel",
        },
        {
          question: "Data Collection Rate",
          answer:
            "MISC- (aka sync rate) -collect point data at 1 second intervals or same interval as base station-collect polygon and line data at 5 second intervals",
        },
        {
          question: "Datum",
          answer:
            "MISC- A theoretically exact point, axis, or plane derived from the true geometric counterpart of a specific datum feature. The origin from which the location is established.-GPS receivers are designed to collect GPS position relative to WGS84 datum, but can be manipulated",
        },
        {
          question: "Coordinates (latitude and longitude)",
          answer:
            "MISC Degrees/Minutes/Seconds (DMS) 43 5' 20Decimal Degrees (DD) 43.088889 Latitude is positive in Norther HemisphereLongitude is negative in Western Hemisphere",
        },
        {
          question: "Latitude and Longitude Conversion (DMS and DD)",
          answer: "MISC- DD = d + m/60 + s/3600",
        },
        {
          question: "Coordinate Systems",
          answer: "DMS, DD, UTM, State Plane, MGRS",
        },
        {
          question: "Euclidean distance",
          answer:
            "A method of distance measurement using the straight line mileage between two places. (2D)",
        },
        {
          question: "Manhattan Distance",
          answer:
            "distance measured in terms of roadways, walkways, and other paths that avoid obstruction and reduce both distance and travel time",
        },
      ],
    ];

    /* src\Cardbox.svelte generated by Svelte v3.55.1 */

    const file$6 = "src\\Cardbox.svelte";

    function create_fragment$8(ctx) {
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
    			add_location(h20, file$6, 11, 2, 158);
    			attr_dev(div0, "class", "flip-box-front svelte-5o8p7x");
    			add_location(div0, file$6, 9, 0, 123);
    			add_location(h21, file$6, 16, 1, 258);
    			attr_dev(div1, "class", "flip-box-back svelte-5o8p7x");
    			toggle_class(div1, "conceal-answer", /*showCardBack*/ ctx[2]);
    			add_location(div1, file$6, 15, 0, 192);
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
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$6, create_fragment$8, safe_not_equal, { question: 0, answer: 1, showCardBack: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Cardbox",
    			options,
    			id: create_fragment$8.name
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
    const file$5 = "src\\Flashcards.svelte";

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
    			add_location(option, file$5, 45, 16, 1554);
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

    function create_fragment$7(ctx) {
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
    			add_location(h1, file$5, 40, 8, 1310);
    			option.__value = "";
    			option.value = option.__value;
    			add_location(option, file$5, 43, 12, 1437);
    			if (/*selected*/ ctx[0] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[8].call(select));
    			add_location(select, file$5, 42, 8, 1392);
    			attr_dev(div0, "class", "dropdown svelte-10lm3em");
    			add_location(div0, file$5, 41, 8, 1360);
    			attr_dev(div1, "class", "flip-box-inner svelte-10lm3em");
    			toggle_class(div1, "flip-it", /*showCardBack*/ ctx[3]);
    			add_location(div1, file$5, 52, 16, 1762);
    			attr_dev(button0, "class", "arrow-btn svelte-10lm3em");
    			add_location(button0, file$5, 60, 20, 2087);
    			attr_dev(button1, "class", "svelte-10lm3em");
    			add_location(button1, file$5, 62, 20, 2193);
    			attr_dev(button2, "class", "arrow-btn svelte-10lm3em");
    			add_location(button2, file$5, 66, 20, 2374);
    			attr_dev(div2, "id", "btn-cont");
    			attr_dev(div2, "class", "svelte-10lm3em");
    			add_location(div2, file$5, 59, 16, 2046);
    			attr_dev(div3, "class", "flip-box svelte-10lm3em");
    			add_location(div3, file$5, 51, 12, 1722);
    			attr_dev(section, "class", "flash");
    			add_location(section, file$5, 39, 8, 1277);
    			add_location(main, file$5, 38, 8, 1261);
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
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
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
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Flashcards> was created with unknown prop '${key}'`);
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
    		init(this, options, instance$5, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Flashcards",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCFoundation = /** @class */ (function () {
        function MDCFoundation(adapter) {
            if (adapter === void 0) { adapter = {}; }
            this.adapter = adapter;
        }
        Object.defineProperty(MDCFoundation, "cssClasses", {
            get: function () {
                // Classes extending MDCFoundation should implement this method to return an object which exports every
                // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
                return {};
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCFoundation, "strings", {
            get: function () {
                // Classes extending MDCFoundation should implement this method to return an object which exports all
                // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
                return {};
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCFoundation, "numbers", {
            get: function () {
                // Classes extending MDCFoundation should implement this method to return an object which exports all
                // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
                return {};
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCFoundation, "defaultAdapter", {
            get: function () {
                // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
                // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
                // validation.
                return {};
            },
            enumerable: false,
            configurable: true
        });
        MDCFoundation.prototype.init = function () {
            // Subclasses should override this method to perform initialization routines (registering events, etc.)
        };
        MDCFoundation.prototype.destroy = function () {
            // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
        };
        return MDCFoundation;
    }());

    /**
     * @license
     * Copyright 2020 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var FOCUS_SENTINEL_CLASS = 'mdc-dom-focus-sentinel';
    /**
     * Utility to trap focus in a given root element, e.g. for modal components such
     * as dialogs. The root should have at least one focusable child element,
     * for setting initial focus when trapping focus.
     * Also tracks the previously focused element, and restores focus to that
     * element when releasing focus.
     */
    var FocusTrap = /** @class */ (function () {
        function FocusTrap(root, options) {
            if (options === void 0) { options = {}; }
            this.root = root;
            this.options = options;
            // Previously focused element before trapping focus.
            this.elFocusedBeforeTrapFocus = null;
        }
        /**
         * Traps focus in `root`. Also focuses on either `initialFocusEl` if set;
         * otherwises sets initial focus to the first focusable child element.
         */
        FocusTrap.prototype.trapFocus = function () {
            var focusableEls = this.getFocusableElements(this.root);
            if (focusableEls.length === 0) {
                throw new Error('FocusTrap: Element must have at least one focusable child.');
            }
            this.elFocusedBeforeTrapFocus =
                document.activeElement instanceof HTMLElement ? document.activeElement :
                    null;
            this.wrapTabFocus(this.root);
            if (!this.options.skipInitialFocus) {
                this.focusInitialElement(focusableEls, this.options.initialFocusEl);
            }
        };
        /**
         * Releases focus from `root`. Also restores focus to the previously focused
         * element.
         */
        FocusTrap.prototype.releaseFocus = function () {
            [].slice.call(this.root.querySelectorAll("." + FOCUS_SENTINEL_CLASS))
                .forEach(function (sentinelEl) {
                sentinelEl.parentElement.removeChild(sentinelEl);
            });
            if (!this.options.skipRestoreFocus && this.elFocusedBeforeTrapFocus) {
                this.elFocusedBeforeTrapFocus.focus();
            }
        };
        /**
         * Wraps tab focus within `el` by adding two hidden sentinel divs which are
         * used to mark the beginning and the end of the tabbable region. When
         * focused, these sentinel elements redirect focus to the first/last
         * children elements of the tabbable region, ensuring that focus is trapped
         * within that region.
         */
        FocusTrap.prototype.wrapTabFocus = function (el) {
            var _this = this;
            var sentinelStart = this.createSentinel();
            var sentinelEnd = this.createSentinel();
            sentinelStart.addEventListener('focus', function () {
                var focusableEls = _this.getFocusableElements(el);
                if (focusableEls.length > 0) {
                    focusableEls[focusableEls.length - 1].focus();
                }
            });
            sentinelEnd.addEventListener('focus', function () {
                var focusableEls = _this.getFocusableElements(el);
                if (focusableEls.length > 0) {
                    focusableEls[0].focus();
                }
            });
            el.insertBefore(sentinelStart, el.children[0]);
            el.appendChild(sentinelEnd);
        };
        /**
         * Focuses on `initialFocusEl` if defined and a child of the root element.
         * Otherwise, focuses on the first focusable child element of the root.
         */
        FocusTrap.prototype.focusInitialElement = function (focusableEls, initialFocusEl) {
            var focusIndex = 0;
            if (initialFocusEl) {
                focusIndex = Math.max(focusableEls.indexOf(initialFocusEl), 0);
            }
            focusableEls[focusIndex].focus();
        };
        FocusTrap.prototype.getFocusableElements = function (root) {
            var focusableEls = [].slice.call(root.querySelectorAll('[autofocus], [tabindex], a, input, textarea, select, button'));
            return focusableEls.filter(function (el) {
                var isDisabledOrHidden = el.getAttribute('aria-disabled') === 'true' ||
                    el.getAttribute('disabled') != null ||
                    el.getAttribute('hidden') != null ||
                    el.getAttribute('aria-hidden') === 'true';
                var isTabbableAndVisible = el.tabIndex >= 0 &&
                    el.getBoundingClientRect().width > 0 &&
                    !el.classList.contains(FOCUS_SENTINEL_CLASS) && !isDisabledOrHidden;
                var isProgrammaticallyHidden = false;
                if (isTabbableAndVisible) {
                    var style = getComputedStyle(el);
                    isProgrammaticallyHidden =
                        style.display === 'none' || style.visibility === 'hidden';
                }
                return isTabbableAndVisible && !isProgrammaticallyHidden;
            });
        };
        FocusTrap.prototype.createSentinel = function () {
            var sentinel = document.createElement('div');
            sentinel.setAttribute('tabindex', '0');
            // Don't announce in screen readers.
            sentinel.setAttribute('aria-hidden', 'true');
            sentinel.classList.add(FOCUS_SENTINEL_CLASS);
            return sentinel;
        };
        return FocusTrap;
    }());

    var domFocusTrap = /*#__PURE__*/Object.freeze({
        __proto__: null,
        FocusTrap: FocusTrap
    });

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
     * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
     */
    function closest(element, selector) {
        if (element.closest) {
            return element.closest(selector);
        }
        var el = element;
        while (el) {
            if (matches$1(el, selector)) {
                return el;
            }
            el = el.parentElement;
        }
        return null;
    }
    function matches$1(element, selector) {
        var nativeMatches = element.matches
            || element.webkitMatchesSelector
            || element.msMatchesSelector;
        return nativeMatches.call(element, selector);
    }
    /**
     * Used to compute the estimated scroll width of elements. When an element is
     * hidden due to display: none; being applied to a parent element, the width is
     * returned as 0. However, the element will have a true width once no longer
     * inside a display: none context. This method computes an estimated width when
     * the element is hidden or returns the true width when the element is visble.
     * @param {Element} element the element whose width to estimate
     */
    function estimateScrollWidth(element) {
        // Check the offsetParent. If the element inherits display: none from any
        // parent, the offsetParent property will be null (see
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent).
        // This check ensures we only clone the node when necessary.
        var htmlEl = element;
        if (htmlEl.offsetParent !== null) {
            return htmlEl.scrollWidth;
        }
        var clone = htmlEl.cloneNode(true);
        clone.style.setProperty('position', 'absolute');
        clone.style.setProperty('transform', 'translate(-9999px, -9999px)');
        document.documentElement.appendChild(clone);
        var scrollWidth = clone.scrollWidth;
        document.documentElement.removeChild(clone);
        return scrollWidth;
    }

    var ponyfill = /*#__PURE__*/Object.freeze({
        __proto__: null,
        closest: closest,
        matches: matches$1,
        estimateScrollWidth: estimateScrollWidth
    });

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var _a, _b;
    var cssClasses$2 = {
        LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated',
        LIST_ITEM_CLASS: 'mdc-list-item',
        LIST_ITEM_DISABLED_CLASS: 'mdc-list-item--disabled',
        LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
        LIST_ITEM_TEXT_CLASS: 'mdc-list-item__text',
        LIST_ITEM_PRIMARY_TEXT_CLASS: 'mdc-list-item__primary-text',
        ROOT: 'mdc-list',
    };
    (_a = {},
        _a["" + cssClasses$2.LIST_ITEM_ACTIVATED_CLASS] = 'mdc-list-item--activated',
        _a["" + cssClasses$2.LIST_ITEM_CLASS] = 'mdc-list-item',
        _a["" + cssClasses$2.LIST_ITEM_DISABLED_CLASS] = 'mdc-list-item--disabled',
        _a["" + cssClasses$2.LIST_ITEM_SELECTED_CLASS] = 'mdc-list-item--selected',
        _a["" + cssClasses$2.LIST_ITEM_PRIMARY_TEXT_CLASS] = 'mdc-list-item__primary-text',
        _a["" + cssClasses$2.ROOT] = 'mdc-list',
        _a);
    var deprecatedClassNameMap = (_b = {},
        _b["" + cssClasses$2.LIST_ITEM_ACTIVATED_CLASS] = 'mdc-deprecated-list-item--activated',
        _b["" + cssClasses$2.LIST_ITEM_CLASS] = 'mdc-deprecated-list-item',
        _b["" + cssClasses$2.LIST_ITEM_DISABLED_CLASS] = 'mdc-deprecated-list-item--disabled',
        _b["" + cssClasses$2.LIST_ITEM_SELECTED_CLASS] = 'mdc-deprecated-list-item--selected',
        _b["" + cssClasses$2.LIST_ITEM_TEXT_CLASS] = 'mdc-deprecated-list-item__text',
        _b["" + cssClasses$2.LIST_ITEM_PRIMARY_TEXT_CLASS] = 'mdc-deprecated-list-item__primary-text',
        _b["" + cssClasses$2.ROOT] = 'mdc-deprecated-list',
        _b);
    var strings$2 = {
        ACTION_EVENT: 'MDCList:action',
        SELECTION_CHANGE_EVENT: 'MDCList:selectionChange',
        ARIA_CHECKED: 'aria-checked',
        ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
        ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
        ARIA_CURRENT: 'aria-current',
        ARIA_DISABLED: 'aria-disabled',
        ARIA_ORIENTATION: 'aria-orientation',
        ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
        ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
        ARIA_SELECTED: 'aria-selected',
        ARIA_INTERACTIVE_ROLES_SELECTOR: '[role="listbox"], [role="menu"]',
        ARIA_MULTI_SELECTABLE_SELECTOR: '[aria-multiselectable="true"]',
        CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"], input[type="radio"]',
        CHECKBOX_SELECTOR: 'input[type="checkbox"]',
        CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + cssClasses$2.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses$2.LIST_ITEM_CLASS + " a,\n    ." + deprecatedClassNameMap[cssClasses$2.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses$2.LIST_ITEM_CLASS] + " a\n  ",
        DEPRECATED_SELECTOR: '.mdc-deprecated-list',
        FOCUSABLE_CHILD_ELEMENTS: "\n    ." + cssClasses$2.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses$2.LIST_ITEM_CLASS + " a,\n    ." + cssClasses$2.LIST_ITEM_CLASS + " input[type=\"radio\"]:not(:disabled),\n    ." + cssClasses$2.LIST_ITEM_CLASS + " input[type=\"checkbox\"]:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses$2.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses$2.LIST_ITEM_CLASS] + " a,\n    ." + deprecatedClassNameMap[cssClasses$2.LIST_ITEM_CLASS] + " input[type=\"radio\"]:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses$2.LIST_ITEM_CLASS] + " input[type=\"checkbox\"]:not(:disabled)\n  ",
        RADIO_SELECTOR: 'input[type="radio"]',
        SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]',
    };
    var numbers$1 = {
        UNSET_INDEX: -1,
        TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300
    };

    /**
     * @license
     * Copyright 2020 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * KEY provides normalized string values for keys.
     */
    var KEY = {
        UNKNOWN: 'Unknown',
        BACKSPACE: 'Backspace',
        ENTER: 'Enter',
        SPACEBAR: 'Spacebar',
        PAGE_UP: 'PageUp',
        PAGE_DOWN: 'PageDown',
        END: 'End',
        HOME: 'Home',
        ARROW_LEFT: 'ArrowLeft',
        ARROW_UP: 'ArrowUp',
        ARROW_RIGHT: 'ArrowRight',
        ARROW_DOWN: 'ArrowDown',
        DELETE: 'Delete',
        ESCAPE: 'Escape',
        TAB: 'Tab',
    };
    var normalizedKeys = new Set();
    // IE11 has no support for new Map with iterable so we need to initialize this
    // by hand.
    normalizedKeys.add(KEY.BACKSPACE);
    normalizedKeys.add(KEY.ENTER);
    normalizedKeys.add(KEY.SPACEBAR);
    normalizedKeys.add(KEY.PAGE_UP);
    normalizedKeys.add(KEY.PAGE_DOWN);
    normalizedKeys.add(KEY.END);
    normalizedKeys.add(KEY.HOME);
    normalizedKeys.add(KEY.ARROW_LEFT);
    normalizedKeys.add(KEY.ARROW_UP);
    normalizedKeys.add(KEY.ARROW_RIGHT);
    normalizedKeys.add(KEY.ARROW_DOWN);
    normalizedKeys.add(KEY.DELETE);
    normalizedKeys.add(KEY.ESCAPE);
    normalizedKeys.add(KEY.TAB);
    var KEY_CODE = {
        BACKSPACE: 8,
        ENTER: 13,
        SPACEBAR: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        DELETE: 46,
        ESCAPE: 27,
        TAB: 9,
    };
    var mappedKeyCodes = new Map();
    // IE11 has no support for new Map with iterable so we need to initialize this
    // by hand.
    mappedKeyCodes.set(KEY_CODE.BACKSPACE, KEY.BACKSPACE);
    mappedKeyCodes.set(KEY_CODE.ENTER, KEY.ENTER);
    mappedKeyCodes.set(KEY_CODE.SPACEBAR, KEY.SPACEBAR);
    mappedKeyCodes.set(KEY_CODE.PAGE_UP, KEY.PAGE_UP);
    mappedKeyCodes.set(KEY_CODE.PAGE_DOWN, KEY.PAGE_DOWN);
    mappedKeyCodes.set(KEY_CODE.END, KEY.END);
    mappedKeyCodes.set(KEY_CODE.HOME, KEY.HOME);
    mappedKeyCodes.set(KEY_CODE.ARROW_LEFT, KEY.ARROW_LEFT);
    mappedKeyCodes.set(KEY_CODE.ARROW_UP, KEY.ARROW_UP);
    mappedKeyCodes.set(KEY_CODE.ARROW_RIGHT, KEY.ARROW_RIGHT);
    mappedKeyCodes.set(KEY_CODE.ARROW_DOWN, KEY.ARROW_DOWN);
    mappedKeyCodes.set(KEY_CODE.DELETE, KEY.DELETE);
    mappedKeyCodes.set(KEY_CODE.ESCAPE, KEY.ESCAPE);
    mappedKeyCodes.set(KEY_CODE.TAB, KEY.TAB);
    var navigationKeys = new Set();
    // IE11 has no support for new Set with iterable so we need to initialize this
    // by hand.
    navigationKeys.add(KEY.PAGE_UP);
    navigationKeys.add(KEY.PAGE_DOWN);
    navigationKeys.add(KEY.END);
    navigationKeys.add(KEY.HOME);
    navigationKeys.add(KEY.ARROW_LEFT);
    navigationKeys.add(KEY.ARROW_UP);
    navigationKeys.add(KEY.ARROW_RIGHT);
    navigationKeys.add(KEY.ARROW_DOWN);
    /**
     * normalizeKey returns the normalized string for a navigational action.
     */
    function normalizeKey(evt) {
        var key = evt.key;
        // If the event already has a normalized key, return it
        if (normalizedKeys.has(key)) {
            return key;
        }
        // tslint:disable-next-line:deprecation
        var mappedKey = mappedKeyCodes.get(evt.keyCode);
        if (mappedKey) {
            return mappedKey;
        }
        return KEY.UNKNOWN;
    }

    /**
     * @license
     * Copyright 2020 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select'];
    /**
     * Ensures that preventDefault is only called if the containing element
     * doesn't consume the event, and it will cause an unintended scroll.
     *
     * @param evt keyboard event to be prevented.
     */
    var preventDefaultEvent = function (evt) {
        var target = evt.target;
        if (!target) {
            return;
        }
        var tagName = ("" + target.tagName).toLowerCase();
        if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
            evt.preventDefault();
        }
    };

    /**
     * @license
     * Copyright 2020 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * Initializes a state object for typeahead. Use the same reference for calls to
     * typeahead functions.
     *
     * @return The current state of the typeahead process. Each state reference
     *     represents a typeahead instance as the reference is typically mutated
     *     in-place.
     */
    function initState() {
        var state = {
            bufferClearTimeout: 0,
            currentFirstChar: '',
            sortedIndexCursor: 0,
            typeaheadBuffer: '',
        };
        return state;
    }
    /**
     * Initializes typeahead state by indexing the current list items by primary
     * text into the sortedIndexByFirstChar data structure.
     *
     * @param listItemCount numer of items in the list
     * @param getPrimaryTextByItemIndex function that returns the primary text at a
     *     given index
     *
     * @return Map that maps the first character of the primary text to the full
     *     list text and it's index
     */
    function initSortedIndex(listItemCount, getPrimaryTextByItemIndex) {
        var sortedIndexByFirstChar = new Map();
        // Aggregate item text to index mapping
        for (var i = 0; i < listItemCount; i++) {
            var primaryText = getPrimaryTextByItemIndex(i).trim();
            if (!primaryText) {
                continue;
            }
            var firstChar = primaryText[0].toLowerCase();
            if (!sortedIndexByFirstChar.has(firstChar)) {
                sortedIndexByFirstChar.set(firstChar, []);
            }
            sortedIndexByFirstChar.get(firstChar).push({ text: primaryText.toLowerCase(), index: i });
        }
        // Sort the mapping
        // TODO(b/157162694): Investigate replacing forEach with Map.values()
        sortedIndexByFirstChar.forEach(function (values) {
            values.sort(function (first, second) {
                return first.index - second.index;
            });
        });
        return sortedIndexByFirstChar;
    }
    /**
     * Given the next desired character from the user, it attempts to find the next
     * list option matching the buffer. Wraps around if at the end of options.
     *
     * @param opts Options and accessors
     *   - nextChar - the next character to match against items
     *   - sortedIndexByFirstChar - output of `initSortedIndex(...)`
     *   - focusedItemIndex - the index of the currently focused item
     *   - focusItemAtIndex - function that focuses a list item at given index
     *   - skipFocus - whether or not to focus the matched item
     *   - isItemAtIndexDisabled - function that determines whether an item at a
     *        given index is disabled
     * @param state The typeahead state instance. See `initState`.
     *
     * @return The index of the matched item, or -1 if no match.
     */
    function matchItem(opts, state) {
        var nextChar = opts.nextChar, focusItemAtIndex = opts.focusItemAtIndex, sortedIndexByFirstChar = opts.sortedIndexByFirstChar, focusedItemIndex = opts.focusedItemIndex, skipFocus = opts.skipFocus, isItemAtIndexDisabled = opts.isItemAtIndexDisabled;
        clearTimeout(state.bufferClearTimeout);
        state.bufferClearTimeout = setTimeout(function () {
            clearBuffer(state);
        }, numbers$1.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS);
        state.typeaheadBuffer = state.typeaheadBuffer + nextChar;
        var index;
        if (state.typeaheadBuffer.length === 1) {
            index = matchFirstChar(sortedIndexByFirstChar, focusedItemIndex, isItemAtIndexDisabled, state);
        }
        else {
            index = matchAllChars(sortedIndexByFirstChar, isItemAtIndexDisabled, state);
        }
        if (index !== -1 && !skipFocus) {
            focusItemAtIndex(index);
        }
        return index;
    }
    /**
     * Matches the user's single input character in the buffer to the
     * next option that begins with such character. Wraps around if at
     * end of options. Returns -1 if no match is found.
     */
    function matchFirstChar(sortedIndexByFirstChar, focusedItemIndex, isItemAtIndexDisabled, state) {
        var firstChar = state.typeaheadBuffer[0];
        var itemsMatchingFirstChar = sortedIndexByFirstChar.get(firstChar);
        if (!itemsMatchingFirstChar) {
            return -1;
        }
        // Has the same firstChar been recently matched?
        // Also, did starting index remain the same between key presses?
        // If both hold true, simply increment index.
        if (firstChar === state.currentFirstChar &&
            itemsMatchingFirstChar[state.sortedIndexCursor].index ===
                focusedItemIndex) {
            state.sortedIndexCursor =
                (state.sortedIndexCursor + 1) % itemsMatchingFirstChar.length;
            var newIndex = itemsMatchingFirstChar[state.sortedIndexCursor].index;
            if (!isItemAtIndexDisabled(newIndex)) {
                return newIndex;
            }
        }
        // If we're here, it means one of the following happened:
        // - either firstChar or startingIndex has changed, invalidating the
        // cursor.
        // - The next item of typeahead is disabled, so we have to look further.
        state.currentFirstChar = firstChar;
        var newCursorPosition = -1;
        var cursorPosition;
        // Find the first non-disabled item as a fallback.
        for (cursorPosition = 0; cursorPosition < itemsMatchingFirstChar.length; cursorPosition++) {
            if (!isItemAtIndexDisabled(itemsMatchingFirstChar[cursorPosition].index)) {
                newCursorPosition = cursorPosition;
                break;
            }
        }
        // Advance cursor to first item matching the firstChar that is positioned
        // after starting item. Cursor is unchanged from fallback if there's no
        // such item.
        for (; cursorPosition < itemsMatchingFirstChar.length; cursorPosition++) {
            if (itemsMatchingFirstChar[cursorPosition].index > focusedItemIndex &&
                !isItemAtIndexDisabled(itemsMatchingFirstChar[cursorPosition].index)) {
                newCursorPosition = cursorPosition;
                break;
            }
        }
        if (newCursorPosition !== -1) {
            state.sortedIndexCursor = newCursorPosition;
            return itemsMatchingFirstChar[state.sortedIndexCursor].index;
        }
        return -1;
    }
    /**
     * Attempts to find the next item that matches all of the typeahead buffer.
     * Wraps around if at end of options. Returns -1 if no match is found.
     */
    function matchAllChars(sortedIndexByFirstChar, isItemAtIndexDisabled, state) {
        var firstChar = state.typeaheadBuffer[0];
        var itemsMatchingFirstChar = sortedIndexByFirstChar.get(firstChar);
        if (!itemsMatchingFirstChar) {
            return -1;
        }
        // Do nothing if text already matches
        var startingItem = itemsMatchingFirstChar[state.sortedIndexCursor];
        if (startingItem.text.lastIndexOf(state.typeaheadBuffer, 0) === 0 &&
            !isItemAtIndexDisabled(startingItem.index)) {
            return startingItem.index;
        }
        // Find next item that matches completely; if no match, we'll eventually
        // loop around to same position
        var cursorPosition = (state.sortedIndexCursor + 1) % itemsMatchingFirstChar.length;
        var nextCursorPosition = -1;
        while (cursorPosition !== state.sortedIndexCursor) {
            var currentItem = itemsMatchingFirstChar[cursorPosition];
            var matches = currentItem.text.lastIndexOf(state.typeaheadBuffer, 0) === 0;
            var isEnabled = !isItemAtIndexDisabled(currentItem.index);
            if (matches && isEnabled) {
                nextCursorPosition = cursorPosition;
                break;
            }
            cursorPosition = (cursorPosition + 1) % itemsMatchingFirstChar.length;
        }
        if (nextCursorPosition !== -1) {
            state.sortedIndexCursor = nextCursorPosition;
            return itemsMatchingFirstChar[state.sortedIndexCursor].index;
        }
        return -1;
    }
    /**
     * Whether or not the given typeahead instaance state is currently typing.
     *
     * @param state The typeahead state instance. See `initState`.
     */
    function isTypingInProgress(state) {
        return state.typeaheadBuffer.length > 0;
    }
    /**
     * Clears the typeahaed buffer so that it resets item matching to the first
     * character.
     *
     * @param state The typeahead state instance. See `initState`.
     */
    function clearBuffer(state) {
        state.typeaheadBuffer = '';
    }
    /**
     * Given a keydown event, it calculates whether or not to automatically focus a
     * list item depending on what was typed mimicing the typeahead functionality of
     * a standard <select> element that is open.
     *
     * @param opts Options and accessors
     *   - event - the KeyboardEvent to handle and parse
     *   - sortedIndexByFirstChar - output of `initSortedIndex(...)`
     *   - focusedItemIndex - the index of the currently focused item
     *   - focusItemAtIndex - function that focuses a list item at given index
     *   - isItemAtFocusedIndexDisabled - whether or not the currently focused item
     *      is disabled
     *   - isTargetListItem - whether or not the event target is a list item
     * @param state The typeahead state instance. See `initState`.
     *
     * @returns index of the item matched by the keydown. -1 if not matched.
     */
    function handleKeydown(opts, state) {
        var event = opts.event, isTargetListItem = opts.isTargetListItem, focusedItemIndex = opts.focusedItemIndex, focusItemAtIndex = opts.focusItemAtIndex, sortedIndexByFirstChar = opts.sortedIndexByFirstChar, isItemAtIndexDisabled = opts.isItemAtIndexDisabled;
        var isArrowLeft = normalizeKey(event) === 'ArrowLeft';
        var isArrowUp = normalizeKey(event) === 'ArrowUp';
        var isArrowRight = normalizeKey(event) === 'ArrowRight';
        var isArrowDown = normalizeKey(event) === 'ArrowDown';
        var isHome = normalizeKey(event) === 'Home';
        var isEnd = normalizeKey(event) === 'End';
        var isEnter = normalizeKey(event) === 'Enter';
        var isSpace = normalizeKey(event) === 'Spacebar';
        if (event.altKey || event.ctrlKey || event.metaKey || isArrowLeft ||
            isArrowUp || isArrowRight || isArrowDown || isHome || isEnd || isEnter) {
            return -1;
        }
        var isCharacterKey = !isSpace && event.key.length === 1;
        if (isCharacterKey) {
            preventDefaultEvent(event);
            var matchItemOpts = {
                focusItemAtIndex: focusItemAtIndex,
                focusedItemIndex: focusedItemIndex,
                nextChar: event.key.toLowerCase(),
                sortedIndexByFirstChar: sortedIndexByFirstChar,
                skipFocus: false,
                isItemAtIndexDisabled: isItemAtIndexDisabled,
            };
            return matchItem(matchItemOpts, state);
        }
        if (!isSpace) {
            return -1;
        }
        if (isTargetListItem) {
            preventDefaultEvent(event);
        }
        var typeaheadOnListItem = isTargetListItem && isTypingInProgress(state);
        if (typeaheadOnListItem) {
            var matchItemOpts = {
                focusItemAtIndex: focusItemAtIndex,
                focusedItemIndex: focusedItemIndex,
                nextChar: ' ',
                sortedIndexByFirstChar: sortedIndexByFirstChar,
                skipFocus: false,
                isItemAtIndexDisabled: isItemAtIndexDisabled,
            };
            // space participates in typeahead matching if in rapid typing mode
            return matchItem(matchItemOpts, state);
        }
        return -1;
    }

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    function isNumberArray(selectedIndex) {
        return selectedIndex instanceof Array;
    }
    /** List of modifier keys to consider while handling keyboard events. */
    var handledModifierKeys = ['Alt', 'Control', 'Meta', 'Shift'];
    /** Checks if the event has the given modifier keys. */
    function createModifierChecker(event) {
        var eventModifiers = new Set(event ? handledModifierKeys.filter(function (m) { return event.getModifierState(m); }) : []);
        return function (modifiers) {
            return modifiers.every(function (m) { return eventModifiers.has(m); }) &&
                modifiers.length === eventModifiers.size;
        };
    }
    var MDCListFoundation = /** @class */ (function (_super) {
        __extends(MDCListFoundation, _super);
        function MDCListFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCListFoundation.defaultAdapter), adapter)) || this;
            _this.wrapFocus = false;
            _this.isVertical = true;
            _this.isSingleSelectionList = false;
            _this.areDisabledItemsFocusable = true;
            _this.selectedIndex = numbers$1.UNSET_INDEX;
            _this.focusedItemIndex = numbers$1.UNSET_INDEX;
            _this.useActivatedClass = false;
            _this.useSelectedAttr = false;
            _this.ariaCurrentAttrValue = null;
            _this.isCheckboxList = false;
            _this.isRadioList = false;
            _this.lastSelectedIndex = null;
            _this.hasTypeahead = false;
            // Transiently holds current typeahead prefix from user.
            _this.typeaheadState = initState();
            _this.sortedIndexByFirstChar = new Map();
            return _this;
        }
        Object.defineProperty(MDCListFoundation, "strings", {
            get: function () {
                return strings$2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCListFoundation, "cssClasses", {
            get: function () {
                return cssClasses$2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCListFoundation, "numbers", {
            get: function () {
                return numbers$1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCListFoundation, "defaultAdapter", {
            get: function () {
                return {
                    addClassForElementIndex: function () { return undefined; },
                    focusItemAtIndex: function () { return undefined; },
                    getAttributeForElementIndex: function () { return null; },
                    getFocusedElementIndex: function () { return 0; },
                    getListItemCount: function () { return 0; },
                    hasCheckboxAtIndex: function () { return false; },
                    hasRadioAtIndex: function () { return false; },
                    isCheckboxCheckedAtIndex: function () { return false; },
                    isFocusInsideList: function () { return false; },
                    isRootFocused: function () { return false; },
                    listItemAtIndexHasClass: function () { return false; },
                    notifyAction: function () { return undefined; },
                    notifySelectionChange: function () { },
                    removeClassForElementIndex: function () { return undefined; },
                    setAttributeForElementIndex: function () { return undefined; },
                    setCheckedCheckboxOrRadioAtIndex: function () { return undefined; },
                    setTabIndexForListItemChildren: function () { return undefined; },
                    getPrimaryTextAtIndex: function () { return ''; },
                };
            },
            enumerable: false,
            configurable: true
        });
        MDCListFoundation.prototype.layout = function () {
            if (this.adapter.getListItemCount() === 0) {
                return;
            }
            // TODO(b/172274142): consider all items when determining the list's type.
            if (this.adapter.hasCheckboxAtIndex(0)) {
                this.isCheckboxList = true;
            }
            else if (this.adapter.hasRadioAtIndex(0)) {
                this.isRadioList = true;
            }
            else {
                this.maybeInitializeSingleSelection();
            }
            if (this.hasTypeahead) {
                this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex();
            }
        };
        /** Returns the index of the item that was last focused. */
        MDCListFoundation.prototype.getFocusedItemIndex = function () {
            return this.focusedItemIndex;
        };
        /** Toggles focus wrapping with keyboard navigation. */
        MDCListFoundation.prototype.setWrapFocus = function (value) {
            this.wrapFocus = value;
        };
        /**
         * Toggles orientation direction for keyboard navigation (true for vertical,
         * false for horizontal).
         */
        MDCListFoundation.prototype.setVerticalOrientation = function (value) {
            this.isVertical = value;
        };
        /** Toggles single-selection behavior. */
        MDCListFoundation.prototype.setSingleSelection = function (value) {
            this.isSingleSelectionList = value;
            if (value) {
                this.maybeInitializeSingleSelection();
                this.selectedIndex = this.getSelectedIndexFromDOM();
            }
        };
        MDCListFoundation.prototype.setDisabledItemsFocusable = function (value) {
            this.areDisabledItemsFocusable = value;
        };
        /**
         * Automatically determines whether the list is single selection list. If so,
         * initializes the internal state to match the selected item.
         */
        MDCListFoundation.prototype.maybeInitializeSingleSelection = function () {
            var selectedItemIndex = this.getSelectedIndexFromDOM();
            if (selectedItemIndex === numbers$1.UNSET_INDEX)
                return;
            var hasActivatedClass = this.adapter.listItemAtIndexHasClass(selectedItemIndex, cssClasses$2.LIST_ITEM_ACTIVATED_CLASS);
            if (hasActivatedClass) {
                this.setUseActivatedClass(true);
            }
            this.isSingleSelectionList = true;
            this.selectedIndex = selectedItemIndex;
        };
        /** @return Index of the first selected item based on the DOM state. */
        MDCListFoundation.prototype.getSelectedIndexFromDOM = function () {
            var selectedIndex = numbers$1.UNSET_INDEX;
            var listItemsCount = this.adapter.getListItemCount();
            for (var i = 0; i < listItemsCount; i++) {
                var hasSelectedClass = this.adapter.listItemAtIndexHasClass(i, cssClasses$2.LIST_ITEM_SELECTED_CLASS);
                var hasActivatedClass = this.adapter.listItemAtIndexHasClass(i, cssClasses$2.LIST_ITEM_ACTIVATED_CLASS);
                if (!(hasSelectedClass || hasActivatedClass)) {
                    continue;
                }
                selectedIndex = i;
                break;
            }
            return selectedIndex;
        };
        /**
         * Sets whether typeahead is enabled on the list.
         * @param hasTypeahead Whether typeahead is enabled.
         */
        MDCListFoundation.prototype.setHasTypeahead = function (hasTypeahead) {
            this.hasTypeahead = hasTypeahead;
            if (hasTypeahead) {
                this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex();
            }
        };
        /**
         * @return Whether typeahead is currently matching a user-specified prefix.
         */
        MDCListFoundation.prototype.isTypeaheadInProgress = function () {
            return this.hasTypeahead &&
                isTypingInProgress(this.typeaheadState);
        };
        /** Toggle use of the "activated" CSS class. */
        MDCListFoundation.prototype.setUseActivatedClass = function (useActivated) {
            this.useActivatedClass = useActivated;
        };
        /**
         * Toggles use of the selected attribute (true for aria-selected, false for
         * aria-checked).
         */
        MDCListFoundation.prototype.setUseSelectedAttribute = function (useSelected) {
            this.useSelectedAttr = useSelected;
        };
        MDCListFoundation.prototype.getSelectedIndex = function () {
            return this.selectedIndex;
        };
        MDCListFoundation.prototype.setSelectedIndex = function (index, options) {
            if (options === void 0) { options = {}; }
            if (!this.isIndexValid(index)) {
                return;
            }
            if (this.isCheckboxList) {
                this.setCheckboxAtIndex(index, options);
            }
            else if (this.isRadioList) {
                this.setRadioAtIndex(index, options);
            }
            else {
                this.setSingleSelectionAtIndex(index, options);
            }
        };
        /**
         * Focus in handler for the list items.
         */
        MDCListFoundation.prototype.handleFocusIn = function (listItemIndex) {
            if (listItemIndex >= 0) {
                this.focusedItemIndex = listItemIndex;
                this.adapter.setAttributeForElementIndex(listItemIndex, 'tabindex', '0');
                this.adapter.setTabIndexForListItemChildren(listItemIndex, '0');
            }
        };
        /**
         * Focus out handler for the list items.
         */
        MDCListFoundation.prototype.handleFocusOut = function (listItemIndex) {
            var _this = this;
            if (listItemIndex >= 0) {
                this.adapter.setAttributeForElementIndex(listItemIndex, 'tabindex', '-1');
                this.adapter.setTabIndexForListItemChildren(listItemIndex, '-1');
            }
            /**
             * Between Focusout & Focusin some browsers do not have focus on any
             * element. Setting a delay to wait till the focus is moved to next element.
             */
            setTimeout(function () {
                if (!_this.adapter.isFocusInsideList()) {
                    _this.setTabindexToFirstSelectedOrFocusedItem();
                }
            }, 0);
        };
        MDCListFoundation.prototype.isIndexDisabled = function (index) {
            return this.adapter.listItemAtIndexHasClass(index, cssClasses$2.LIST_ITEM_DISABLED_CLASS);
        };
        /**
         * Key handler for the list.
         */
        MDCListFoundation.prototype.handleKeydown = function (event, isRootListItem, listItemIndex) {
            var _this = this;
            var _a;
            var isArrowLeft = normalizeKey(event) === 'ArrowLeft';
            var isArrowUp = normalizeKey(event) === 'ArrowUp';
            var isArrowRight = normalizeKey(event) === 'ArrowRight';
            var isArrowDown = normalizeKey(event) === 'ArrowDown';
            var isHome = normalizeKey(event) === 'Home';
            var isEnd = normalizeKey(event) === 'End';
            var isEnter = normalizeKey(event) === 'Enter';
            var isSpace = normalizeKey(event) === 'Spacebar';
            // The keys for forward and back differ based on list orientation.
            var isForward = (this.isVertical && isArrowDown) || (!this.isVertical && isArrowRight);
            var isBack = (this.isVertical && isArrowUp) || (!this.isVertical && isArrowLeft);
            // Have to check both upper and lower case, because having caps lock on
            // affects the value.
            var isLetterA = event.key === 'A' || event.key === 'a';
            var eventHasModifiers = createModifierChecker(event);
            if (this.adapter.isRootFocused()) {
                if ((isBack || isEnd) && eventHasModifiers([])) {
                    event.preventDefault();
                    this.focusLastElement();
                }
                else if ((isForward || isHome) && eventHasModifiers([])) {
                    event.preventDefault();
                    this.focusFirstElement();
                }
                else if (isBack && eventHasModifiers(['Shift']) && this.isCheckboxList) {
                    event.preventDefault();
                    var focusedIndex = this.focusLastElement();
                    if (focusedIndex !== -1) {
                        this.setSelectedIndexOnAction(focusedIndex, false);
                    }
                }
                else if (isForward && eventHasModifiers(['Shift']) && this.isCheckboxList) {
                    event.preventDefault();
                    var focusedIndex = this.focusFirstElement();
                    if (focusedIndex !== -1) {
                        this.setSelectedIndexOnAction(focusedIndex, false);
                    }
                }
                if (this.hasTypeahead) {
                    var handleKeydownOpts = {
                        event: event,
                        focusItemAtIndex: function (index) {
                            _this.focusItemAtIndex(index);
                        },
                        focusedItemIndex: -1,
                        isTargetListItem: isRootListItem,
                        sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                        isItemAtIndexDisabled: function (index) { return _this.isIndexDisabled(index); },
                    };
                    handleKeydown(handleKeydownOpts, this.typeaheadState);
                }
                return;
            }
            var currentIndex = this.adapter.getFocusedElementIndex();
            if (currentIndex === -1) {
                currentIndex = listItemIndex;
                if (currentIndex < 0) {
                    // If this event doesn't have a mdc-list-item ancestor from the
                    // current list (not from a sublist), return early.
                    return;
                }
            }
            if (isForward && eventHasModifiers([])) {
                preventDefaultEvent(event);
                this.focusNextElement(currentIndex);
            }
            else if (isBack && eventHasModifiers([])) {
                preventDefaultEvent(event);
                this.focusPrevElement(currentIndex);
            }
            else if (isForward && eventHasModifiers(['Shift']) && this.isCheckboxList) {
                preventDefaultEvent(event);
                var focusedIndex = this.focusNextElement(currentIndex);
                if (focusedIndex !== -1) {
                    this.setSelectedIndexOnAction(focusedIndex, false);
                }
            }
            else if (isBack && eventHasModifiers(['Shift']) && this.isCheckboxList) {
                preventDefaultEvent(event);
                var focusedIndex = this.focusPrevElement(currentIndex);
                if (focusedIndex !== -1) {
                    this.setSelectedIndexOnAction(focusedIndex, false);
                }
            }
            else if (isHome && eventHasModifiers([])) {
                preventDefaultEvent(event);
                this.focusFirstElement();
            }
            else if (isEnd && eventHasModifiers([])) {
                preventDefaultEvent(event);
                this.focusLastElement();
            }
            else if (isHome && eventHasModifiers(['Control', 'Shift']) &&
                this.isCheckboxList) {
                preventDefaultEvent(event);
                if (this.isIndexDisabled(currentIndex)) {
                    return;
                }
                this.focusFirstElement();
                this.toggleCheckboxRange(0, currentIndex, currentIndex);
            }
            else if (isEnd && eventHasModifiers(['Control', 'Shift']) &&
                this.isCheckboxList) {
                preventDefaultEvent(event);
                if (this.isIndexDisabled(currentIndex)) {
                    return;
                }
                this.focusLastElement();
                this.toggleCheckboxRange(currentIndex, this.adapter.getListItemCount() - 1, currentIndex);
            }
            else if (isLetterA && eventHasModifiers(['Control']) && this.isCheckboxList) {
                event.preventDefault();
                this.checkboxListToggleAll(this.selectedIndex === numbers$1.UNSET_INDEX ?
                    [] :
                    this.selectedIndex, true);
            }
            else if ((isEnter || isSpace) && eventHasModifiers([])) {
                if (isRootListItem) {
                    // Return early if enter key is pressed on anchor element which triggers
                    // synthetic MouseEvent event.
                    var target = event.target;
                    if (target && target.tagName === 'A' && isEnter) {
                        return;
                    }
                    preventDefaultEvent(event);
                    if (this.isIndexDisabled(currentIndex)) {
                        return;
                    }
                    if (!this.isTypeaheadInProgress()) {
                        if (this.isSelectableList()) {
                            this.setSelectedIndexOnAction(currentIndex, false);
                        }
                        this.adapter.notifyAction(currentIndex);
                    }
                }
            }
            else if ((isEnter || isSpace) && eventHasModifiers(['Shift']) &&
                this.isCheckboxList) {
                // Return early if enter key is pressed on anchor element which triggers
                // synthetic MouseEvent event.
                var target = event.target;
                if (target && target.tagName === 'A' && isEnter) {
                    return;
                }
                preventDefaultEvent(event);
                if (this.isIndexDisabled(currentIndex)) {
                    return;
                }
                if (!this.isTypeaheadInProgress()) {
                    this.toggleCheckboxRange((_a = this.lastSelectedIndex) !== null && _a !== void 0 ? _a : currentIndex, currentIndex, currentIndex);
                    this.adapter.notifyAction(currentIndex);
                }
            }
            if (this.hasTypeahead) {
                var handleKeydownOpts = {
                    event: event,
                    focusItemAtIndex: function (index) { _this.focusItemAtIndex(index); },
                    focusedItemIndex: this.focusedItemIndex,
                    isTargetListItem: isRootListItem,
                    sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                    isItemAtIndexDisabled: function (index) { return _this.isIndexDisabled(index); },
                };
                handleKeydown(handleKeydownOpts, this.typeaheadState);
            }
        };
        /**
         * Click handler for the list.
         *
         * @param index Index for the item that has been clicked.
         * @param isCheckboxAlreadyUpdatedInAdapter Whether the checkbox for
         *   the list item has already been updated in the adapter. This attribute
         *   should be set to `true` when e.g. the click event directly landed on
         *   the underlying native checkbox element which would cause the checked
         *   state to be already toggled within `adapter.isCheckboxCheckedAtIndex`.
         */
        MDCListFoundation.prototype.handleClick = function (index, isCheckboxAlreadyUpdatedInAdapter, event) {
            var _a;
            var eventHasModifiers = createModifierChecker(event);
            if (index === numbers$1.UNSET_INDEX) {
                return;
            }
            if (this.isIndexDisabled(index)) {
                return;
            }
            if (eventHasModifiers([])) {
                if (this.isSelectableList()) {
                    this.setSelectedIndexOnAction(index, isCheckboxAlreadyUpdatedInAdapter);
                }
                this.adapter.notifyAction(index);
            }
            else if (this.isCheckboxList && eventHasModifiers(['Shift'])) {
                this.toggleCheckboxRange((_a = this.lastSelectedIndex) !== null && _a !== void 0 ? _a : index, index, index);
                this.adapter.notifyAction(index);
            }
        };
        /**
         * Focuses the next element on the list.
         */
        MDCListFoundation.prototype.focusNextElement = function (index) {
            var count = this.adapter.getListItemCount();
            var nextIndex = index;
            var firstChecked = null;
            do {
                nextIndex++;
                if (nextIndex >= count) {
                    if (this.wrapFocus) {
                        nextIndex = 0;
                    }
                    else {
                        // Return early because last item is already focused.
                        return index;
                    }
                }
                if (nextIndex === firstChecked) {
                    return -1;
                }
                firstChecked = firstChecked !== null && firstChecked !== void 0 ? firstChecked : nextIndex;
            } while (!this.areDisabledItemsFocusable && this.isIndexDisabled(nextIndex));
            this.focusItemAtIndex(nextIndex);
            return nextIndex;
        };
        /**
         * Focuses the previous element on the list.
         */
        MDCListFoundation.prototype.focusPrevElement = function (index) {
            var count = this.adapter.getListItemCount();
            var prevIndex = index;
            var firstChecked = null;
            do {
                prevIndex--;
                if (prevIndex < 0) {
                    if (this.wrapFocus) {
                        prevIndex = count - 1;
                    }
                    else {
                        // Return early because first item is already focused.
                        return index;
                    }
                }
                if (prevIndex === firstChecked) {
                    return -1;
                }
                firstChecked = firstChecked !== null && firstChecked !== void 0 ? firstChecked : prevIndex;
            } while (!this.areDisabledItemsFocusable && this.isIndexDisabled(prevIndex));
            this.focusItemAtIndex(prevIndex);
            return prevIndex;
        };
        MDCListFoundation.prototype.focusFirstElement = function () {
            // Pass -1 to `focusNextElement`, since it will incremement to 0 and focus
            // the first element.
            return this.focusNextElement(-1);
        };
        MDCListFoundation.prototype.focusLastElement = function () {
            // Pass the length of the list to `focusNextElement` since it will decrement
            // to length - 1 and focus the last element.
            return this.focusPrevElement(this.adapter.getListItemCount());
        };
        MDCListFoundation.prototype.focusInitialElement = function () {
            var initialIndex = this.getFirstSelectedOrFocusedItemIndex();
            this.focusItemAtIndex(initialIndex);
            return initialIndex;
        };
        /**
         * @param itemIndex Index of the list item
         * @param isEnabled Sets the list item to enabled or disabled.
         */
        MDCListFoundation.prototype.setEnabled = function (itemIndex, isEnabled) {
            if (!this.isIndexValid(itemIndex, false)) {
                return;
            }
            if (isEnabled) {
                this.adapter.removeClassForElementIndex(itemIndex, cssClasses$2.LIST_ITEM_DISABLED_CLASS);
                this.adapter.setAttributeForElementIndex(itemIndex, strings$2.ARIA_DISABLED, 'false');
            }
            else {
                this.adapter.addClassForElementIndex(itemIndex, cssClasses$2.LIST_ITEM_DISABLED_CLASS);
                this.adapter.setAttributeForElementIndex(itemIndex, strings$2.ARIA_DISABLED, 'true');
            }
        };
        MDCListFoundation.prototype.setSingleSelectionAtIndex = function (index, options) {
            if (options === void 0) { options = {}; }
            if (this.selectedIndex === index && !options.forceUpdate) {
                return;
            }
            var selectedClassName = cssClasses$2.LIST_ITEM_SELECTED_CLASS;
            if (this.useActivatedClass) {
                selectedClassName = cssClasses$2.LIST_ITEM_ACTIVATED_CLASS;
            }
            if (this.selectedIndex !== numbers$1.UNSET_INDEX) {
                this.adapter.removeClassForElementIndex(this.selectedIndex, selectedClassName);
            }
            this.setAriaForSingleSelectionAtIndex(index);
            this.setTabindexAtIndex(index);
            if (index !== numbers$1.UNSET_INDEX) {
                this.adapter.addClassForElementIndex(index, selectedClassName);
            }
            this.selectedIndex = index;
            // If the selected value has changed through user interaction,
            // we want to notify the selection change to the adapter.
            if (options.isUserInteraction && !options.forceUpdate) {
                this.adapter.notifySelectionChange([index]);
            }
        };
        /**
         * Sets aria attribute for single selection at given index.
         */
        MDCListFoundation.prototype.setAriaForSingleSelectionAtIndex = function (index) {
            // Detect the presence of aria-current and get the value only during list
            // initialization when it is in unset state.
            if (this.selectedIndex === numbers$1.UNSET_INDEX) {
                this.ariaCurrentAttrValue =
                    this.adapter.getAttributeForElementIndex(index, strings$2.ARIA_CURRENT);
            }
            var isAriaCurrent = this.ariaCurrentAttrValue !== null;
            var ariaAttribute = isAriaCurrent ? strings$2.ARIA_CURRENT : strings$2.ARIA_SELECTED;
            if (this.selectedIndex !== numbers$1.UNSET_INDEX) {
                this.adapter.setAttributeForElementIndex(this.selectedIndex, ariaAttribute, 'false');
            }
            if (index !== numbers$1.UNSET_INDEX) {
                var ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue : 'true';
                this.adapter.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
            }
        };
        /**
         * Returns the attribute to use for indicating selection status.
         */
        MDCListFoundation.prototype.getSelectionAttribute = function () {
            return this.useSelectedAttr ? strings$2.ARIA_SELECTED : strings$2.ARIA_CHECKED;
        };
        /**
         * Toggles radio at give index. Radio doesn't change the checked state if it
         * is already checked.
         */
        MDCListFoundation.prototype.setRadioAtIndex = function (index, options) {
            if (options === void 0) { options = {}; }
            var selectionAttribute = this.getSelectionAttribute();
            this.adapter.setCheckedCheckboxOrRadioAtIndex(index, true);
            if (this.selectedIndex === index && !options.forceUpdate) {
                return;
            }
            if (this.selectedIndex !== numbers$1.UNSET_INDEX) {
                this.adapter.setAttributeForElementIndex(this.selectedIndex, selectionAttribute, 'false');
            }
            this.adapter.setAttributeForElementIndex(index, selectionAttribute, 'true');
            this.selectedIndex = index;
            // If the selected value has changed through user interaction,
            // we want to notify the selection change to the adapter.
            if (options.isUserInteraction && !options.forceUpdate) {
                this.adapter.notifySelectionChange([index]);
            }
        };
        MDCListFoundation.prototype.setCheckboxAtIndex = function (index, options) {
            if (options === void 0) { options = {}; }
            var currentIndex = this.selectedIndex;
            // If this update is not triggered by a user interaction, we do not
            // need to know about the currently selected indices and can avoid
            // constructing the `Set` for performance reasons.
            var currentlySelected = options.isUserInteraction ?
                new Set(currentIndex === numbers$1.UNSET_INDEX ? [] :
                    currentIndex) :
                null;
            var selectionAttribute = this.getSelectionAttribute();
            var changedIndices = [];
            for (var i = 0; i < this.adapter.getListItemCount(); i++) {
                var previousIsChecked = currentlySelected === null || currentlySelected === void 0 ? void 0 : currentlySelected.has(i);
                var newIsChecked = index.indexOf(i) >= 0;
                // If the selection has changed for this item, we keep track of it
                // so that we can notify the adapter.
                if (newIsChecked !== previousIsChecked) {
                    changedIndices.push(i);
                }
                this.adapter.setCheckedCheckboxOrRadioAtIndex(i, newIsChecked);
                this.adapter.setAttributeForElementIndex(i, selectionAttribute, newIsChecked ? 'true' : 'false');
            }
            this.selectedIndex = index;
            // If the selected value has changed through user interaction,
            // we want to notify the selection change to the adapter.
            if (options.isUserInteraction && changedIndices.length) {
                this.adapter.notifySelectionChange(changedIndices);
            }
        };
        /**
         * Toggles the state of all checkboxes in the given range (inclusive) based on
         * the state of the checkbox at the `toggleIndex`. To determine whether to set
         * the given range to checked or unchecked, read the value of the checkbox at
         * the `toggleIndex` and negate it. Then apply that new checked state to all
         * checkboxes in the range.
         * @param fromIndex The start of the range of checkboxes to toggle
         * @param toIndex The end of the range of checkboxes to toggle
         * @param toggleIndex The index that will be used to determine the new state
         *     of the given checkbox range.
         */
        MDCListFoundation.prototype.toggleCheckboxRange = function (fromIndex, toIndex, toggleIndex) {
            this.lastSelectedIndex = toggleIndex;
            var currentlySelected = new Set(this.selectedIndex === numbers$1.UNSET_INDEX ?
                [] :
                this.selectedIndex);
            var newIsChecked = !(currentlySelected === null || currentlySelected === void 0 ? void 0 : currentlySelected.has(toggleIndex));
            var _a = __read([fromIndex, toIndex].sort(), 2), startIndex = _a[0], endIndex = _a[1];
            var selectionAttribute = this.getSelectionAttribute();
            var changedIndices = [];
            for (var i = startIndex; i <= endIndex; i++) {
                if (this.isIndexDisabled(i)) {
                    continue;
                }
                var previousIsChecked = currentlySelected.has(i);
                // If the selection has changed for this item, we keep track of it
                // so that we can notify the adapter.
                if (newIsChecked !== previousIsChecked) {
                    changedIndices.push(i);
                    this.adapter.setCheckedCheckboxOrRadioAtIndex(i, newIsChecked);
                    this.adapter.setAttributeForElementIndex(i, selectionAttribute, "" + newIsChecked);
                    if (newIsChecked) {
                        currentlySelected.add(i);
                    }
                    else {
                        currentlySelected.delete(i);
                    }
                }
            }
            // If the selected value has changed, update and notify the selection change
            // to the adapter.
            if (changedIndices.length) {
                this.selectedIndex = __spreadArray([], __read(currentlySelected));
                this.adapter.notifySelectionChange(changedIndices);
            }
        };
        MDCListFoundation.prototype.setTabindexAtIndex = function (index) {
            if (this.focusedItemIndex === numbers$1.UNSET_INDEX && index !== 0) {
                // If some list item was selected set first list item's tabindex to -1.
                // Generally, tabindex is set to 0 on first list item of list that has no
                // preselected items.
                this.adapter.setAttributeForElementIndex(0, 'tabindex', '-1');
            }
            else if (this.focusedItemIndex >= 0 && this.focusedItemIndex !== index) {
                this.adapter.setAttributeForElementIndex(this.focusedItemIndex, 'tabindex', '-1');
            }
            // Set the previous selection's tabindex to -1. We need this because
            // in selection menus that are not visible, programmatically setting an
            // option will not change focus but will change where tabindex should be 0.
            if (!(this.selectedIndex instanceof Array) &&
                this.selectedIndex !== index) {
                this.adapter.setAttributeForElementIndex(this.selectedIndex, 'tabindex', '-1');
            }
            if (index !== numbers$1.UNSET_INDEX) {
                this.adapter.setAttributeForElementIndex(index, 'tabindex', '0');
            }
        };
        /**
         * @return Return true if it is single selectin list, checkbox list or radio
         *     list.
         */
        MDCListFoundation.prototype.isSelectableList = function () {
            return this.isSingleSelectionList || this.isCheckboxList ||
                this.isRadioList;
        };
        MDCListFoundation.prototype.setTabindexToFirstSelectedOrFocusedItem = function () {
            var targetIndex = this.getFirstSelectedOrFocusedItemIndex();
            this.setTabindexAtIndex(targetIndex);
        };
        MDCListFoundation.prototype.getFirstSelectedOrFocusedItemIndex = function () {
            // Action lists retain focus on the most recently focused item.
            if (!this.isSelectableList()) {
                return Math.max(this.focusedItemIndex, 0);
            }
            // Single-selection lists focus the selected item.
            if (typeof this.selectedIndex === 'number' &&
                this.selectedIndex !== numbers$1.UNSET_INDEX) {
                return this.selectedIndex;
            }
            // Multiple-selection lists focus the first selected item.
            if (isNumberArray(this.selectedIndex) && this.selectedIndex.length > 0) {
                return this.selectedIndex.reduce(function (minIndex, currentIndex) { return Math.min(minIndex, currentIndex); });
            }
            // Selection lists without a selection focus the first item.
            return 0;
        };
        MDCListFoundation.prototype.isIndexValid = function (index, validateListType) {
            var _this = this;
            if (validateListType === void 0) { validateListType = true; }
            if (index instanceof Array) {
                if (!this.isCheckboxList && validateListType) {
                    throw new Error('MDCListFoundation: Array of index is only supported for checkbox based list');
                }
                if (index.length === 0) {
                    return true;
                }
                else {
                    return index.some(function (i) { return _this.isIndexInRange(i); });
                }
            }
            else if (typeof index === 'number') {
                if (this.isCheckboxList && validateListType) {
                    throw new Error("MDCListFoundation: Expected array of index for checkbox based list but got number: " + index);
                }
                return this.isIndexInRange(index) ||
                    this.isSingleSelectionList && index === numbers$1.UNSET_INDEX;
            }
            else {
                return false;
            }
        };
        MDCListFoundation.prototype.isIndexInRange = function (index) {
            var listSize = this.adapter.getListItemCount();
            return index >= 0 && index < listSize;
        };
        /**
         * Sets selected index on user action, toggles checkboxes in checkbox lists
         * by default, unless `isCheckboxAlreadyUpdatedInAdapter` is set to `true`.
         *
         * In cases where `isCheckboxAlreadyUpdatedInAdapter` is set to `true`, the
         * UI is just updated to reflect the value returned by the adapter.
         *
         * When calling this, make sure user interaction does not toggle disabled
         * list items.
         */
        MDCListFoundation.prototype.setSelectedIndexOnAction = function (index, isCheckboxAlreadyUpdatedInAdapter) {
            this.lastSelectedIndex = index;
            if (this.isCheckboxList) {
                this.toggleCheckboxAtIndex(index, isCheckboxAlreadyUpdatedInAdapter);
                this.adapter.notifySelectionChange([index]);
            }
            else {
                this.setSelectedIndex(index, { isUserInteraction: true });
            }
        };
        MDCListFoundation.prototype.toggleCheckboxAtIndex = function (index, isCheckboxAlreadyUpdatedInAdapter) {
            var selectionAttribute = this.getSelectionAttribute();
            var adapterIsChecked = this.adapter.isCheckboxCheckedAtIndex(index);
            // By default the checked value from the adapter is toggled unless the
            // checked state in the adapter has already been updated beforehand.
            // This can be happen when the underlying native checkbox has already
            // been updated through the native click event.
            var newCheckedValue;
            if (isCheckboxAlreadyUpdatedInAdapter) {
                newCheckedValue = adapterIsChecked;
            }
            else {
                newCheckedValue = !adapterIsChecked;
                this.adapter.setCheckedCheckboxOrRadioAtIndex(index, newCheckedValue);
            }
            this.adapter.setAttributeForElementIndex(index, selectionAttribute, newCheckedValue ? 'true' : 'false');
            // If none of the checkbox items are selected and selectedIndex is not
            // initialized then provide a default value.
            var selectedIndexes = this.selectedIndex === numbers$1.UNSET_INDEX ?
                [] :
                this.selectedIndex.slice();
            if (newCheckedValue) {
                selectedIndexes.push(index);
            }
            else {
                selectedIndexes = selectedIndexes.filter(function (i) { return i !== index; });
            }
            this.selectedIndex = selectedIndexes;
        };
        MDCListFoundation.prototype.focusItemAtIndex = function (index) {
            this.adapter.focusItemAtIndex(index);
            this.focusedItemIndex = index;
        };
        MDCListFoundation.prototype.checkboxListToggleAll = function (currentlySelectedIndexes, isUserInteraction) {
            var count = this.adapter.getListItemCount();
            // If all items are selected, deselect everything.
            if (currentlySelectedIndexes.length === count) {
                this.setCheckboxAtIndex([], { isUserInteraction: isUserInteraction });
            }
            else {
                // Otherwise select all enabled options.
                var allIndexes = [];
                for (var i = 0; i < count; i++) {
                    if (!this.isIndexDisabled(i) ||
                        currentlySelectedIndexes.indexOf(i) > -1) {
                        allIndexes.push(i);
                    }
                }
                this.setCheckboxAtIndex(allIndexes, { isUserInteraction: isUserInteraction });
            }
        };
        /**
         * Given the next desired character from the user, adds it to the typeahead
         * buffer. Then, attempts to find the next option matching the buffer. Wraps
         * around if at the end of options.
         *
         * @param nextChar The next character to add to the prefix buffer.
         * @param startingIndex The index from which to start matching. Only relevant
         *     when starting a new match sequence. To start a new match sequence,
         *     clear the buffer using `clearTypeaheadBuffer`, or wait for the buffer
         *     to clear after a set interval defined in list foundation. Defaults to
         *     the currently focused index.
         * @return The index of the matched item, or -1 if no match.
         */
        MDCListFoundation.prototype.typeaheadMatchItem = function (nextChar, startingIndex, skipFocus) {
            var _this = this;
            if (skipFocus === void 0) { skipFocus = false; }
            var opts = {
                focusItemAtIndex: function (index) {
                    _this.focusItemAtIndex(index);
                },
                focusedItemIndex: startingIndex ? startingIndex : this.focusedItemIndex,
                nextChar: nextChar,
                sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                skipFocus: skipFocus,
                isItemAtIndexDisabled: function (index) { return _this.isIndexDisabled(index); }
            };
            return matchItem(opts, this.typeaheadState);
        };
        /**
         * Initializes the MDCListTextAndIndex data structure by indexing the current
         * list items by primary text.
         *
         * @return The primary texts of all the list items sorted by first character.
         */
        MDCListFoundation.prototype.typeaheadInitSortedIndex = function () {
            return initSortedIndex(this.adapter.getListItemCount(), this.adapter.getPrimaryTextAtIndex);
        };
        /**
         * Clears the typeahead buffer.
         */
        MDCListFoundation.prototype.clearTypeaheadBuffer = function () {
            clearBuffer(this.typeaheadState);
        };
        return MDCListFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses$1 = {
        ANIMATE: 'mdc-drawer--animate',
        CLOSING: 'mdc-drawer--closing',
        DISMISSIBLE: 'mdc-drawer--dismissible',
        MODAL: 'mdc-drawer--modal',
        OPEN: 'mdc-drawer--open',
        OPENING: 'mdc-drawer--opening',
        ROOT: 'mdc-drawer',
    };
    var strings$1 = {
        APP_CONTENT_SELECTOR: '.mdc-drawer-app-content',
        CLOSE_EVENT: 'MDCDrawer:closed',
        OPEN_EVENT: 'MDCDrawer:opened',
        SCRIM_SELECTOR: '.mdc-drawer-scrim',
        LIST_SELECTOR: '.mdc-list,.mdc-deprecated-list',
        LIST_ITEM_ACTIVATED_SELECTOR: '.mdc-list-item--activated,.mdc-deprecated-list-item--activated',
    };

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var MDCDismissibleDrawerFoundation = /** @class */ (function (_super) {
        __extends(MDCDismissibleDrawerFoundation, _super);
        function MDCDismissibleDrawerFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCDismissibleDrawerFoundation.defaultAdapter), adapter)) || this;
            _this.animationFrame = 0;
            _this.animationTimer = 0;
            return _this;
        }
        Object.defineProperty(MDCDismissibleDrawerFoundation, "strings", {
            get: function () {
                return strings$1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCDismissibleDrawerFoundation, "cssClasses", {
            get: function () {
                return cssClasses$1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCDismissibleDrawerFoundation, "defaultAdapter", {
            get: function () {
                // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                return {
                    addClass: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    hasClass: function () { return false; },
                    elementHasClass: function () { return false; },
                    notifyClose: function () { return undefined; },
                    notifyOpen: function () { return undefined; },
                    saveFocus: function () { return undefined; },
                    restoreFocus: function () { return undefined; },
                    focusActiveNavigationItem: function () { return undefined; },
                    trapFocus: function () { return undefined; },
                    releaseFocus: function () { return undefined; },
                };
                // tslint:enable:object-literal-sort-keys
            },
            enumerable: false,
            configurable: true
        });
        MDCDismissibleDrawerFoundation.prototype.destroy = function () {
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            if (this.animationTimer) {
                clearTimeout(this.animationTimer);
            }
        };
        /**
         * Opens the drawer from the closed state.
         */
        MDCDismissibleDrawerFoundation.prototype.open = function () {
            var _this = this;
            if (this.isOpen() || this.isOpening() || this.isClosing()) {
                return;
            }
            this.adapter.addClass(cssClasses$1.OPEN);
            this.adapter.addClass(cssClasses$1.ANIMATE);
            // Wait a frame once display is no longer "none", to establish basis for animation
            this.runNextAnimationFrame(function () {
                _this.adapter.addClass(cssClasses$1.OPENING);
            });
            this.adapter.saveFocus();
        };
        /**
         * Closes the drawer from the open state.
         */
        MDCDismissibleDrawerFoundation.prototype.close = function () {
            if (!this.isOpen() || this.isOpening() || this.isClosing()) {
                return;
            }
            this.adapter.addClass(cssClasses$1.CLOSING);
        };
        /**
         * Returns true if the drawer is in the open position.
         * @return true if drawer is in open state.
         */
        MDCDismissibleDrawerFoundation.prototype.isOpen = function () {
            return this.adapter.hasClass(cssClasses$1.OPEN);
        };
        /**
         * Returns true if the drawer is animating open.
         * @return true if drawer is animating open.
         */
        MDCDismissibleDrawerFoundation.prototype.isOpening = function () {
            return this.adapter.hasClass(cssClasses$1.OPENING) ||
                this.adapter.hasClass(cssClasses$1.ANIMATE);
        };
        /**
         * Returns true if the drawer is animating closed.
         * @return true if drawer is animating closed.
         */
        MDCDismissibleDrawerFoundation.prototype.isClosing = function () {
            return this.adapter.hasClass(cssClasses$1.CLOSING);
        };
        /**
         * Keydown handler to close drawer when key is escape.
         */
        MDCDismissibleDrawerFoundation.prototype.handleKeydown = function (evt) {
            var keyCode = evt.keyCode, key = evt.key;
            var isEscape = key === 'Escape' || keyCode === 27;
            if (isEscape) {
                this.close();
            }
        };
        /**
         * Handles the `transitionend` event when the drawer finishes opening/closing.
         */
        MDCDismissibleDrawerFoundation.prototype.handleTransitionEnd = function (evt) {
            var OPENING = cssClasses$1.OPENING, CLOSING = cssClasses$1.CLOSING, OPEN = cssClasses$1.OPEN, ANIMATE = cssClasses$1.ANIMATE, ROOT = cssClasses$1.ROOT;
            // In Edge, transitionend on ripple pseudo-elements yields a target without classList, so check for Element first.
            var isRootElement = this.isElement(evt.target) &&
                this.adapter.elementHasClass(evt.target, ROOT);
            if (!isRootElement) {
                return;
            }
            if (this.isClosing()) {
                this.adapter.removeClass(OPEN);
                this.closed();
                this.adapter.restoreFocus();
                this.adapter.notifyClose();
            }
            else {
                this.adapter.focusActiveNavigationItem();
                this.opened();
                this.adapter.notifyOpen();
            }
            this.adapter.removeClass(ANIMATE);
            this.adapter.removeClass(OPENING);
            this.adapter.removeClass(CLOSING);
        };
        /**
         * Extension point for when drawer finishes open animation.
         */
        MDCDismissibleDrawerFoundation.prototype.opened = function () { }; // tslint:disable-line:no-empty
        /**
         * Extension point for when drawer finishes close animation.
         */
        MDCDismissibleDrawerFoundation.prototype.closed = function () { }; // tslint:disable-line:no-empty
        /**
         * Runs the given logic on the next animation frame, using setTimeout to factor in Firefox reflow behavior.
         */
        MDCDismissibleDrawerFoundation.prototype.runNextAnimationFrame = function (callback) {
            var _this = this;
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = requestAnimationFrame(function () {
                _this.animationFrame = 0;
                clearTimeout(_this.animationTimer);
                _this.animationTimer = setTimeout(callback, 0);
            });
        };
        MDCDismissibleDrawerFoundation.prototype.isElement = function (element) {
            // In Edge, transitionend on ripple pseudo-elements yields a target without classList.
            return Boolean(element.classList);
        };
        return MDCDismissibleDrawerFoundation;
    }(MDCFoundation));

    /**
     * @license
     * Copyright 2018 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /* istanbul ignore next: subclass is not a branch statement */
    var MDCModalDrawerFoundation = /** @class */ (function (_super) {
        __extends(MDCModalDrawerFoundation, _super);
        function MDCModalDrawerFoundation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Handles click event on scrim.
         */
        MDCModalDrawerFoundation.prototype.handleScrimClick = function () {
            this.close();
        };
        /**
         * Called when drawer finishes open animation.
         */
        MDCModalDrawerFoundation.prototype.opened = function () {
            this.adapter.trapFocus();
        };
        /**
         * Called when drawer finishes close animation.
         */
        MDCModalDrawerFoundation.prototype.closed = function () {
            this.adapter.releaseFocus();
        };
        return MDCModalDrawerFoundation;
    }(MDCDismissibleDrawerFoundation));

    /**
     * @license
     * Copyright 2019 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * Determine whether the current browser supports passive event listeners, and
     * if so, use them.
     */
    function applyPassive$1(globalObj) {
        if (globalObj === void 0) { globalObj = window; }
        return supportsPassiveOption(globalObj) ?
            { passive: true } :
            false;
    }
    function supportsPassiveOption(globalObj) {
        if (globalObj === void 0) { globalObj = window; }
        // See
        // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
        var passiveSupported = false;
        try {
            var options = {
                // This function will be called when the browser
                // attempts to access the passive property.
                get passive() {
                    passiveSupported = true;
                    return false;
                }
            };
            var handler = function () { };
            globalObj.document.addEventListener('test', handler, options);
            globalObj.document.removeEventListener('test', handler, options);
        }
        catch (err) {
            passiveSupported = false;
        }
        return passiveSupported;
    }

    var events = /*#__PURE__*/Object.freeze({
        __proto__: null,
        applyPassive: applyPassive$1
    });

    function classMap(classObj) {
        return Object.entries(classObj)
            .filter(([name, value]) => name !== '' && value)
            .map(([name]) => name)
            .join(' ');
    }

    function dispatch(element, eventType, detail, eventInit = { bubbles: true }, 
    /** This is an internal thing used by SMUI to duplicate some SMUI events as MDC events. */
    duplicateEventForMDC = false) {
        if (typeof Event !== 'undefined' && element) {
            const event = new CustomEvent(eventType, Object.assign(Object.assign({}, eventInit), { detail }));
            element === null || element === void 0 ? void 0 : element.dispatchEvent(event);
            if (duplicateEventForMDC && eventType.startsWith('SMUI')) {
                const duplicateEvent = new CustomEvent(eventType.replace(/^SMUI/g, () => 'MDC'), Object.assign(Object.assign({}, eventInit), { detail }));
                element === null || element === void 0 ? void 0 : element.dispatchEvent(duplicateEvent);
                if (duplicateEvent.defaultPrevented) {
                    event.preventDefault();
                }
            }
            return event;
        }
    }

    // Match old modifiers. (only works on DOM events)
    const oldModifierRegex = /^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
    // Match new modifiers.
    const newModifierRegex = /^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
    function forwardEventsBuilder(component) {
        // This is our pseudo $on function. It is defined on component mount.
        let $on;
        // This is a list of events bound before mount.
        let events = [];
        // And we override the $on function to forward all bound events.
        component.$on = (fullEventType, callback) => {
            let eventType = fullEventType;
            let destructor = () => { };
            if ($on) {
                // The event was bound programmatically.
                destructor = $on(eventType, callback);
            }
            else {
                // The event was bound before mount by Svelte.
                events.push([eventType, callback]);
            }
            const oldModifierMatch = eventType.match(oldModifierRegex);
            if (oldModifierMatch && console) {
                console.warn('Event modifiers in SMUI now use "$" instead of ":", so that ' +
                    'all events can be bound with modifiers. Please update your ' +
                    'event binding: ', eventType);
            }
            return () => {
                destructor();
            };
        };
        function forward(e) {
            // Internally bubble the event up from Svelte components.
            bubble(component, e);
        }
        return (node) => {
            const destructors = [];
            const forwardDestructors = {};
            // This function is responsible for listening and forwarding
            // all bound events.
            $on = (fullEventType, callback) => {
                let eventType = fullEventType;
                let handler = callback;
                // DOM addEventListener options argument.
                let options = false;
                const oldModifierMatch = eventType.match(oldModifierRegex);
                const newModifierMatch = eventType.match(newModifierRegex);
                const modifierMatch = oldModifierMatch || newModifierMatch;
                if (eventType.match(/^SMUI:\w+:/)) {
                    const newEventTypeParts = eventType.split(':');
                    let newEventType = '';
                    for (let i = 0; i < newEventTypeParts.length; i++) {
                        newEventType +=
                            i === newEventTypeParts.length - 1
                                ? ':' + newEventTypeParts[i]
                                : newEventTypeParts[i]
                                    .split('-')
                                    .map((value) => value.slice(0, 1).toUpperCase() + value.slice(1))
                                    .join('');
                    }
                    console.warn(`The event ${eventType.split('$')[0]} has been renamed to ${newEventType.split('$')[0]}.`);
                    eventType = newEventType;
                }
                if (modifierMatch) {
                    // Parse the event modifiers.
                    // Supported modifiers:
                    // - preventDefault
                    // - stopPropagation
                    // - passive
                    // - nonpassive
                    // - capture
                    // - once
                    const parts = eventType.split(oldModifierMatch ? ':' : '$');
                    eventType = parts[0];
                    const eventOptions = parts.slice(1).reduce((obj, mod) => {
                        obj[mod] = true;
                        return obj;
                    }, {});
                    if (eventOptions.passive) {
                        options = options || {};
                        options.passive = true;
                    }
                    if (eventOptions.nonpassive) {
                        options = options || {};
                        options.passive = false;
                    }
                    if (eventOptions.capture) {
                        options = options || {};
                        options.capture = true;
                    }
                    if (eventOptions.once) {
                        options = options || {};
                        options.once = true;
                    }
                    if (eventOptions.preventDefault) {
                        handler = prevent_default(handler);
                    }
                    if (eventOptions.stopPropagation) {
                        handler = stop_propagation(handler);
                    }
                }
                // Listen for the event directly, with the given options.
                const off = listen(node, eventType, handler, options);
                const destructor = () => {
                    off();
                    const idx = destructors.indexOf(destructor);
                    if (idx > -1) {
                        destructors.splice(idx, 1);
                    }
                };
                destructors.push(destructor);
                // Forward the event from Svelte.
                if (!(eventType in forwardDestructors)) {
                    forwardDestructors[eventType] = listen(node, eventType, forward);
                }
                return destructor;
            };
            for (let i = 0; i < events.length; i++) {
                // Listen to all the events added before mount.
                $on(events[i][0], events[i][1]);
            }
            return {
                destroy: () => {
                    // Remove all event listeners.
                    for (let i = 0; i < destructors.length; i++) {
                        destructors[i]();
                    }
                    // Remove all event forwarders.
                    for (let entry of Object.entries(forwardDestructors)) {
                        entry[1]();
                    }
                },
            };
        };
    }

    function useActions(node, actions) {
        let actionReturns = [];
        if (actions) {
            for (let i = 0; i < actions.length; i++) {
                const actionEntry = actions[i];
                const action = Array.isArray(actionEntry) ? actionEntry[0] : actionEntry;
                if (Array.isArray(actionEntry) && actionEntry.length > 1) {
                    actionReturns.push(action(node, actionEntry[1]));
                }
                else {
                    actionReturns.push(action(node));
                }
            }
        }
        return {
            update(actions) {
                if (((actions && actions.length) || 0) != actionReturns.length) {
                    throw new Error('You must not change the length of an actions array.');
                }
                if (actions) {
                    for (let i = 0; i < actions.length; i++) {
                        const returnEntry = actionReturns[i];
                        if (returnEntry && returnEntry.update) {
                            const actionEntry = actions[i];
                            if (Array.isArray(actionEntry) && actionEntry.length > 1) {
                                returnEntry.update(actionEntry[1]);
                            }
                            else {
                                returnEntry.update();
                            }
                        }
                    }
                }
            },
            destroy() {
                for (let i = 0; i < actionReturns.length; i++) {
                    const returnEntry = actionReturns[i];
                    if (returnEntry && returnEntry.destroy) {
                        returnEntry.destroy();
                    }
                }
            },
        };
    }

    /* node_modules\@smui\drawer\dist\Drawer.svelte generated by Svelte v3.55.1 */

    const file$4 = "node_modules\\@smui\\drawer\\dist\\Drawer.svelte";

    function create_fragment$6(ctx) {
    	let aside;
    	let aside_class_value;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[15].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], null);

    	let aside_levels = [
    		{
    			class: aside_class_value = classMap({
    				[/*className*/ ctx[1]]: true,
    				'mdc-drawer': true,
    				'mdc-drawer--dismissible': /*variant*/ ctx[2] === 'dismissible',
    				'mdc-drawer--modal': /*variant*/ ctx[2] === 'modal',
    				'smui-drawer__absolute': /*variant*/ ctx[2] === 'modal' && !/*fixed*/ ctx[3],
    				.../*internalClasses*/ ctx[6]
    			})
    		},
    		/*$$restProps*/ ctx[8]
    	];

    	let aside_data = {};

    	for (let i = 0; i < aside_levels.length; i += 1) {
    		aside_data = assign(aside_data, aside_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			aside = element("aside");
    			if (default_slot) default_slot.c();
    			set_attributes(aside, aside_data);
    			add_location(aside, file$4, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, aside, anchor);

    			if (default_slot) {
    				default_slot.m(aside, null);
    			}

    			/*aside_binding*/ ctx[16](aside);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, aside, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[7].call(null, aside)),
    					listen_dev(
    						aside,
    						"keydown",
    						function () {
    							if (is_function(/*instance*/ ctx[4] && /*instance*/ ctx[4].handleKeydown.bind(/*instance*/ ctx[4]))) (/*instance*/ ctx[4] && /*instance*/ ctx[4].handleKeydown.bind(/*instance*/ ctx[4])).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						aside,
    						"transitionend",
    						function () {
    							if (is_function(/*instance*/ ctx[4] && /*instance*/ ctx[4].handleTransitionEnd.bind(/*instance*/ ctx[4]))) (/*instance*/ ctx[4] && /*instance*/ ctx[4].handleTransitionEnd.bind(/*instance*/ ctx[4])).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16384)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[14],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[14])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[14], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(aside, aside_data = get_spread_update(aside_levels, [
    				(!current || dirty & /*className, variant, fixed, internalClasses*/ 78 && aside_class_value !== (aside_class_value = classMap({
    					[/*className*/ ctx[1]]: true,
    					'mdc-drawer': true,
    					'mdc-drawer--dismissible': /*variant*/ ctx[2] === 'dismissible',
    					'mdc-drawer--modal': /*variant*/ ctx[2] === 'modal',
    					'smui-drawer__absolute': /*variant*/ ctx[2] === 'modal' && !/*fixed*/ ctx[3],
    					.../*internalClasses*/ ctx[6]
    				}))) && { class: aside_class_value },
    				dirty & /*$$restProps*/ 256 && /*$$restProps*/ ctx[8]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(aside);
    			if (default_slot) default_slot.d(detaching);
    			/*aside_binding*/ ctx[16](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance_1$1($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","class","variant","open","fixed","setOpen","isOpen","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Drawer', slots, ['default']);
    	const { FocusTrap } = domFocusTrap;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { variant = undefined } = $$props;
    	let { open = false } = $$props;
    	let { fixed = true } = $$props;
    	let element;
    	let instance = undefined;
    	let internalClasses = {};
    	let previousFocus = null;
    	let focusTrap;
    	let scrim = false;
    	setContext('SMUI:list:nav', true);
    	setContext('SMUI:list:item:nav', true);
    	setContext('SMUI:list:wrapFocus', true);
    	let oldVariant = variant;

    	onMount(() => {
    		focusTrap = new FocusTrap(element,
    		{
    				// Component handles focusing on active nav item.
    				skipInitialFocus: true
    			});

    		$$invalidate(4, instance = getInstance());
    		instance && instance.init();
    	});

    	onDestroy(() => {
    		instance && instance.destroy();
    		scrim && scrim.removeEventListener('SMUIDrawerScrim:click', handleScrimClick);
    	});

    	function getInstance() {
    		var _a, _b;

    		if (scrim) {
    			scrim.removeEventListener('SMUIDrawerScrim:click', handleScrimClick);
    		}

    		if (variant === 'modal') {
    			scrim = (_b = (_a = element.parentNode) === null || _a === void 0
    			? void 0
    			: _a.querySelector('.mdc-drawer-scrim')) !== null && _b !== void 0
    			? _b
    			: false;

    			if (scrim) {
    				scrim.addEventListener('SMUIDrawerScrim:click', handleScrimClick);
    			}
    		}

    		const Foundation = variant === 'dismissible'
    		? MDCDismissibleDrawerFoundation
    		: variant === 'modal'
    			? MDCModalDrawerFoundation
    			: undefined;

    		return Foundation
    		? new Foundation({
    					addClass,
    					removeClass,
    					hasClass,
    					elementHasClass: (element, className) => element.classList.contains(className),
    					saveFocus: () => previousFocus = document.activeElement,
    					restoreFocus: () => {
    						if (previousFocus && 'focus' in previousFocus && element.contains(document.activeElement)) {
    							previousFocus.focus();
    						}
    					},
    					focusActiveNavigationItem: () => {
    						const activeNavItemEl = element.querySelector('.mdc-list-item--activated,.mdc-deprecated-list-item--activated');

    						if (activeNavItemEl) {
    							activeNavItemEl.focus();
    						}
    					},
    					notifyClose: () => {
    						$$invalidate(9, open = false);
    						dispatch(element, 'SMUIDrawer:closed', undefined, undefined, true);
    					},
    					notifyOpen: () => {
    						$$invalidate(9, open = true);
    						dispatch(element, 'SMUIDrawer:opened', undefined, undefined, true);
    					},
    					trapFocus: () => focusTrap.trapFocus(),
    					releaseFocus: () => focusTrap.releaseFocus()
    				})
    		: undefined;
    	}

    	function hasClass(className) {
    		return className in internalClasses
    		? internalClasses[className]
    		: getElement().classList.contains(className);
    	}

    	function addClass(className) {
    		if (!internalClasses[className]) {
    			$$invalidate(6, internalClasses[className] = true, internalClasses);
    		}
    	}

    	function removeClass(className) {
    		if (!(className in internalClasses) || internalClasses[className]) {
    			$$invalidate(6, internalClasses[className] = false, internalClasses);
    		}
    	}

    	function handleScrimClick() {
    		instance && 'handleScrimClick' in instance && instance.handleScrimClick();
    	}

    	function setOpen(value) {
    		$$invalidate(9, open = value);
    	}

    	function isOpen() {
    		return open;
    	}

    	function getElement() {
    		return element;
    	}

    	function aside_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(5, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ('variant' in $$new_props) $$invalidate(2, variant = $$new_props.variant);
    		if ('open' in $$new_props) $$invalidate(9, open = $$new_props.open);
    		if ('fixed' in $$new_props) $$invalidate(3, fixed = $$new_props.fixed);
    		if ('$$scope' in $$new_props) $$invalidate(14, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		MDCDismissibleDrawerFoundation,
    		MDCModalDrawerFoundation,
    		domFocusTrap,
    		onMount,
    		onDestroy,
    		setContext,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		useActions,
    		dispatch,
    		FocusTrap,
    		forwardEvents,
    		use,
    		className,
    		variant,
    		open,
    		fixed,
    		element,
    		instance,
    		internalClasses,
    		previousFocus,
    		focusTrap,
    		scrim,
    		oldVariant,
    		getInstance,
    		hasClass,
    		addClass,
    		removeClass,
    		handleScrimClick,
    		setOpen,
    		isOpen,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
    		if ('variant' in $$props) $$invalidate(2, variant = $$new_props.variant);
    		if ('open' in $$props) $$invalidate(9, open = $$new_props.open);
    		if ('fixed' in $$props) $$invalidate(3, fixed = $$new_props.fixed);
    		if ('element' in $$props) $$invalidate(5, element = $$new_props.element);
    		if ('instance' in $$props) $$invalidate(4, instance = $$new_props.instance);
    		if ('internalClasses' in $$props) $$invalidate(6, internalClasses = $$new_props.internalClasses);
    		if ('previousFocus' in $$props) previousFocus = $$new_props.previousFocus;
    		if ('focusTrap' in $$props) focusTrap = $$new_props.focusTrap;
    		if ('scrim' in $$props) scrim = $$new_props.scrim;
    		if ('oldVariant' in $$props) $$invalidate(13, oldVariant = $$new_props.oldVariant);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*oldVariant, variant, instance*/ 8212) {
    			if (oldVariant !== variant) {
    				$$invalidate(13, oldVariant = variant);
    				instance && instance.destroy();
    				$$invalidate(6, internalClasses = {});
    				$$invalidate(4, instance = getInstance());
    				instance && instance.init();
    			}
    		}

    		if ($$self.$$.dirty & /*instance, open*/ 528) {
    			if (instance && instance.isOpen() !== open) {
    				if (open) {
    					instance.open();
    				} else {
    					instance.close();
    				}
    			}
    		}
    	};

    	return [
    		use,
    		className,
    		variant,
    		fixed,
    		instance,
    		element,
    		internalClasses,
    		forwardEvents,
    		$$restProps,
    		open,
    		setOpen,
    		isOpen,
    		getElement,
    		oldVariant,
    		$$scope,
    		slots,
    		aside_binding
    	];
    }

    class Drawer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance_1$1, create_fragment$6, safe_not_equal, {
    			use: 0,
    			class: 1,
    			variant: 2,
    			open: 9,
    			fixed: 3,
    			setOpen: 10,
    			isOpen: 11,
    			getElement: 12
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Drawer",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get use() {
    		throw new Error("<Drawer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Drawer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get variant() {
    		throw new Error("<Drawer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set variant(value) {
    		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get open() {
    		throw new Error("<Drawer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fixed() {
    		throw new Error("<Drawer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fixed(value) {
    		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get setOpen() {
    		return this.$$.ctx[10];
    	}

    	set setOpen(value) {
    		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isOpen() {
    		return this.$$.ctx[11];
    	}

    	set isOpen(value) {
    		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[12];
    	}

    	set getElement(value) {
    		throw new Error("<Drawer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\@smui\common\dist\SmuiElement.svelte generated by Svelte v3.55.1 */
    const file$3 = "node_modules\\@smui\\common\\dist\\SmuiElement.svelte";

    // (9:0) {:else}
    function create_else_block(ctx) {
    	let previous_tag = /*tag*/ ctx[1];
    	let svelte_element_anchor;
    	let current;
    	validate_dynamic_element(/*tag*/ ctx[1]);
    	validate_void_dynamic_element(/*tag*/ ctx[1]);
    	let svelte_element = /*tag*/ ctx[1] && create_dynamic_element_1(ctx);

    	const block = {
    		c: function create() {
    			if (svelte_element) svelte_element.c();
    			svelte_element_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (svelte_element) svelte_element.m(target, anchor);
    			insert_dev(target, svelte_element_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*tag*/ ctx[1]) {
    				if (!previous_tag) {
    					svelte_element = create_dynamic_element_1(ctx);
    					svelte_element.c();
    					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
    				} else if (safe_not_equal(previous_tag, /*tag*/ ctx[1])) {
    					svelte_element.d(1);
    					validate_dynamic_element(/*tag*/ ctx[1]);
    					validate_void_dynamic_element(/*tag*/ ctx[1]);
    					svelte_element = create_dynamic_element_1(ctx);
    					svelte_element.c();
    					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
    				} else {
    					svelte_element.p(ctx, dirty);
    				}
    			} else if (previous_tag) {
    				svelte_element.d(1);
    				svelte_element = null;
    			}

    			previous_tag = /*tag*/ ctx[1];
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(svelte_element);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(svelte_element);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svelte_element_anchor);
    			if (svelte_element) svelte_element.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(9:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (1:0) {#if selfClosing}
    function create_if_block$1(ctx) {
    	let previous_tag = /*tag*/ ctx[1];
    	let svelte_element_anchor;
    	validate_dynamic_element(/*tag*/ ctx[1]);
    	let svelte_element = /*tag*/ ctx[1] && create_dynamic_element(ctx);

    	const block = {
    		c: function create() {
    			if (svelte_element) svelte_element.c();
    			svelte_element_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (svelte_element) svelte_element.m(target, anchor);
    			insert_dev(target, svelte_element_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*tag*/ ctx[1]) {
    				if (!previous_tag) {
    					svelte_element = create_dynamic_element(ctx);
    					svelte_element.c();
    					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
    				} else if (safe_not_equal(previous_tag, /*tag*/ ctx[1])) {
    					svelte_element.d(1);
    					validate_dynamic_element(/*tag*/ ctx[1]);
    					svelte_element = create_dynamic_element(ctx);
    					svelte_element.c();
    					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
    				} else {
    					svelte_element.p(ctx, dirty);
    				}
    			} else if (previous_tag) {
    				svelte_element.d(1);
    				svelte_element = null;
    			}

    			previous_tag = /*tag*/ ctx[1];
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svelte_element_anchor);
    			if (svelte_element) svelte_element.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(1:0) {#if selfClosing}",
    		ctx
    	});

    	return block;
    }

    // (10:2) <svelte:element     this={tag}     bind:this={element}     use:useActions={use}     use:forwardEvents     {...$$restProps}>
    function create_dynamic_element_1(ctx) {
    	let svelte_element;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);
    	let svelte_element_levels = [/*$$restProps*/ ctx[5]];
    	let svelte_element_data = {};

    	for (let i = 0; i < svelte_element_levels.length; i += 1) {
    		svelte_element_data = assign(svelte_element_data, svelte_element_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svelte_element = element(/*tag*/ ctx[1]);
    			if (default_slot) default_slot.c();

    			if ((/-/).test(/*tag*/ ctx[1])) {
    				set_custom_element_data_map(svelte_element, svelte_element_data);
    			} else {
    				set_attributes(svelte_element, svelte_element_data);
    			}

    			add_location(svelte_element, file$3, 9, 2, 158);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svelte_element, anchor);

    			if (default_slot) {
    				default_slot.m(svelte_element, null);
    			}

    			/*svelte_element_binding_1*/ ctx[10](svelte_element);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, svelte_element, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[4].call(null, svelte_element))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 128)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[7],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, null),
    						null
    					);
    				}
    			}

    			svelte_element_data = get_spread_update(svelte_element_levels, [dirty & /*$$restProps*/ 32 && /*$$restProps*/ ctx[5]]);

    			if ((/-/).test(/*tag*/ ctx[1])) {
    				set_custom_element_data_map(svelte_element, svelte_element_data);
    			} else {
    				set_attributes(svelte_element, svelte_element_data);
    			}

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svelte_element);
    			if (default_slot) default_slot.d(detaching);
    			/*svelte_element_binding_1*/ ctx[10](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_dynamic_element_1.name,
    		type: "child_dynamic_element",
    		source: "(10:2) <svelte:element     this={tag}     bind:this={element}     use:useActions={use}     use:forwardEvents     {...$$restProps}>",
    		ctx
    	});

    	return block;
    }

    // (2:2) <svelte:element     this={tag}     bind:this={element}     use:useActions={use}     use:forwardEvents     {...$$restProps}   />
    function create_dynamic_element(ctx) {
    	let svelte_element;
    	let useActions_action;
    	let mounted;
    	let dispose;
    	let svelte_element_levels = [/*$$restProps*/ ctx[5]];
    	let svelte_element_data = {};

    	for (let i = 0; i < svelte_element_levels.length; i += 1) {
    		svelte_element_data = assign(svelte_element_data, svelte_element_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svelte_element = element(/*tag*/ ctx[1]);

    			if ((/-/).test(/*tag*/ ctx[1])) {
    				set_custom_element_data_map(svelte_element, svelte_element_data);
    			} else {
    				set_attributes(svelte_element, svelte_element_data);
    			}

    			add_location(svelte_element, file$3, 1, 2, 20);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svelte_element, anchor);
    			/*svelte_element_binding*/ ctx[9](svelte_element);

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, svelte_element, /*use*/ ctx[0])),
    					action_destroyer(/*forwardEvents*/ ctx[4].call(null, svelte_element))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			svelte_element_data = get_spread_update(svelte_element_levels, [dirty & /*$$restProps*/ 32 && /*$$restProps*/ ctx[5]]);

    			if ((/-/).test(/*tag*/ ctx[1])) {
    				set_custom_element_data_map(svelte_element, svelte_element_data);
    			} else {
    				set_attributes(svelte_element, svelte_element_data);
    			}

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svelte_element);
    			/*svelte_element_binding*/ ctx[9](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_dynamic_element.name,
    		type: "child_dynamic_element",
    		source: "(2:2) <svelte:element     this={tag}     bind:this={element}     use:useActions={use}     use:forwardEvents     {...$$restProps}   />",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*selfClosing*/ ctx[3]) return 0;
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
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
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

    function instance$4($$self, $$props, $$invalidate) {
    	let selfClosing;
    	const omit_props_names = ["use","tag","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SmuiElement', slots, ['default']);
    	let { use = [] } = $$props;
    	let { tag } = $$props;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let element;

    	function getElement() {
    		return element;
    	}

    	$$self.$$.on_mount.push(function () {
    		if (tag === undefined && !('tag' in $$props || $$self.$$.bound[$$self.$$.props['tag']])) {
    			console.warn("<SmuiElement> was created without expected prop 'tag'");
    		}
    	});

    	function svelte_element_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(2, element);
    		});
    	}

    	function svelte_element_binding_1($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(2, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('tag' in $$new_props) $$invalidate(1, tag = $$new_props.tag);
    		if ('$$scope' in $$new_props) $$invalidate(7, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		forwardEventsBuilder,
    		useActions,
    		use,
    		tag,
    		forwardEvents,
    		element,
    		getElement,
    		selfClosing
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('tag' in $$props) $$invalidate(1, tag = $$new_props.tag);
    		if ('element' in $$props) $$invalidate(2, element = $$new_props.element);
    		if ('selfClosing' in $$props) $$invalidate(3, selfClosing = $$new_props.selfClosing);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*tag*/ 2) {
    			$$invalidate(3, selfClosing = [
    				'area',
    				'base',
    				'br',
    				'col',
    				'embed',
    				'hr',
    				'img',
    				'input',
    				'link',
    				'meta',
    				'param',
    				'source',
    				'track',
    				'wbr'
    			].indexOf(tag) > -1);
    		}
    	};

    	return [
    		use,
    		tag,
    		element,
    		selfClosing,
    		forwardEvents,
    		$$restProps,
    		getElement,
    		$$scope,
    		slots,
    		svelte_element_binding,
    		svelte_element_binding_1
    	];
    }

    class SmuiElement extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$5, safe_not_equal, { use: 0, tag: 1, getElement: 6 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SmuiElement",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get use() {
    		throw new Error("<SmuiElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<SmuiElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tag() {
    		throw new Error("<SmuiElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tag(value) {
    		throw new Error("<SmuiElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[6];
    	}

    	set getElement(value) {
    		throw new Error("<SmuiElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\@smui\common\dist\classadder\ClassAdder.svelte generated by Svelte v3.55.1 */

    // (1:0) <svelte:component   this={component}   {tag}   bind:this={element}   use={[forwardEvents, ...use]}   class={classMap({     [className]: true,     [smuiClass]: true,     ...smuiClassMap,   })}   {...props}   {...$$restProps}>
    function create_default_slot$3(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[11].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[13], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8192)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[13],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[13])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[13], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(1:0) <svelte:component   this={component}   {tag}   bind:this={element}   use={[forwardEvents, ...use]}   class={classMap({     [className]: true,     [smuiClass]: true,     ...smuiClassMap,   })}   {...props}   {...$$restProps}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ tag: /*tag*/ ctx[3] },
    		{
    			use: [/*forwardEvents*/ ctx[8], .../*use*/ ctx[0]]
    		},
    		{
    			class: classMap({
    				[/*className*/ ctx[1]]: true,
    				[/*smuiClass*/ ctx[6]]: true,
    				.../*smuiClassMap*/ ctx[5]
    			})
    		},
    		/*props*/ ctx[7],
    		/*$$restProps*/ ctx[9]
    	];

    	var switch_value = /*component*/ ctx[2];

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot$3] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    		/*switch_instance_binding*/ ctx[12](switch_instance);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const switch_instance_changes = (dirty & /*tag, forwardEvents, use, classMap, className, smuiClass, smuiClassMap, props, $$restProps*/ 1003)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*tag*/ 8 && { tag: /*tag*/ ctx[3] },
    					dirty & /*forwardEvents, use*/ 257 && {
    						use: [/*forwardEvents*/ ctx[8], .../*use*/ ctx[0]]
    					},
    					dirty & /*classMap, className, smuiClass, smuiClassMap*/ 98 && {
    						class: classMap({
    							[/*className*/ ctx[1]]: true,
    							[/*smuiClass*/ ctx[6]]: true,
    							.../*smuiClassMap*/ ctx[5]
    						})
    					},
    					dirty & /*props*/ 128 && get_spread_object(/*props*/ ctx[7]),
    					dirty & /*$$restProps*/ 512 && get_spread_object(/*$$restProps*/ ctx[9])
    				])
    			: {};

    			if (dirty & /*$$scope*/ 8192) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*component*/ ctx[2])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    					/*switch_instance_binding*/ ctx[12](switch_instance);
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
    			/*switch_instance_binding*/ ctx[12](null);
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
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

    const internals = {
    	component: SmuiElement,
    	tag: 'div',
    	class: '',
    	classMap: {},
    	contexts: {},
    	props: {}
    };

    function instance$3($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","class","component","tag","getElement"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ClassAdder', slots, ['default']);
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let element;
    	const smuiClass = internals.class;
    	const smuiClassMap = {};
    	const smuiClassUnsubscribes = [];
    	const contexts = internals.contexts;
    	const props = internals.props;
    	let { component = internals.component } = $$props;
    	let { tag = component === SmuiElement ? internals.tag : undefined } = $$props;

    	Object.entries(internals.classMap).forEach(([name, context]) => {
    		const store = getContext(context);

    		if (store && 'subscribe' in store) {
    			smuiClassUnsubscribes.push(store.subscribe(value => {
    				$$invalidate(5, smuiClassMap[name] = value, smuiClassMap);
    			}));
    		}
    	});

    	const forwardEvents = forwardEventsBuilder(get_current_component());

    	for (let context in contexts) {
    		if (contexts.hasOwnProperty(context)) {
    			setContext(context, contexts[context]);
    		}
    	}

    	onDestroy(() => {
    		for (const unsubscribe of smuiClassUnsubscribes) {
    			unsubscribe();
    		}
    	});

    	function getElement() {
    		return element.getElement();
    	}

    	function switch_instance_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(4, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ('component' in $$new_props) $$invalidate(2, component = $$new_props.component);
    		if ('tag' in $$new_props) $$invalidate(3, tag = $$new_props.tag);
    		if ('$$scope' in $$new_props) $$invalidate(13, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		SmuiElement,
    		internals,
    		onDestroy,
    		getContext,
    		setContext,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		use,
    		className,
    		element,
    		smuiClass,
    		smuiClassMap,
    		smuiClassUnsubscribes,
    		contexts,
    		props,
    		component,
    		tag,
    		forwardEvents,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
    		if ('element' in $$props) $$invalidate(4, element = $$new_props.element);
    		if ('component' in $$props) $$invalidate(2, component = $$new_props.component);
    		if ('tag' in $$props) $$invalidate(3, tag = $$new_props.tag);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		use,
    		className,
    		component,
    		tag,
    		element,
    		smuiClassMap,
    		smuiClass,
    		props,
    		forwardEvents,
    		$$restProps,
    		getElement,
    		slots,
    		switch_instance_binding,
    		$$scope
    	];
    }

    class ClassAdder extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$3, create_fragment$4, safe_not_equal, {
    			use: 0,
    			class: 1,
    			component: 2,
    			tag: 3,
    			getElement: 10
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ClassAdder",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get use() {
    		throw new Error("<ClassAdder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<ClassAdder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<ClassAdder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tag() {
    		throw new Error("<ClassAdder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tag(value) {
    		throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[10];
    	}

    	set getElement(value) {
    		throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    // @ts-ignore: Internals is exported... argh.
    const defaults = Object.assign({}, internals);
    function classAdderBuilder(props) {
        return new Proxy(ClassAdder, {
            construct: function (target, args) {
                Object.assign(internals, defaults, props);
                // @ts-ignore: Need spread arg.
                return new target(...args);
            },
            get: function (target, prop) {
                Object.assign(internals, defaults, props);
                return target[prop];
            },
        });
    }

    var AppContent = classAdderBuilder({
        class: 'mdc-drawer-app-content',
        tag: 'div',
    });

    var Content = classAdderBuilder({
        class: 'mdc-drawer__content',
        tag: 'div',
    });

    classAdderBuilder({
        class: 'mdc-drawer__header',
        tag: 'div',
    });

    classAdderBuilder({
        class: 'mdc-drawer__title',
        tag: 'h1',
    });

    classAdderBuilder({
        class: 'mdc-drawer__subtitle',
        tag: 'h2',
    });

    /* node_modules\@smui\list\dist\List.svelte generated by Svelte v3.55.1 */

    // (1:0) <svelte:component   this={component}   {tag}   bind:this={element}   use={[forwardEvents, ...use]}   class={classMap({     [className]: true,     'mdc-deprecated-list': true,     'mdc-deprecated-list--non-interactive': nonInteractive,     'mdc-deprecated-list--dense': dense,     'mdc-deprecated-list--textual-list': textualList,     'mdc-deprecated-list--avatar-list': avatarList || selectionDialog,     'mdc-deprecated-list--icon-list': iconList,     'mdc-deprecated-list--image-list': imageList,     'mdc-deprecated-list--thumbnail-list': thumbnailList,     'mdc-deprecated-list--video-list': videoList,     'mdc-deprecated-list--two-line': twoLine,     'smui-list--three-line': threeLine && !twoLine,   })}   {role}   on:keydown={handleKeydown}   on:focusin={handleFocusin}   on:focusout={handleFocusout}   on:click={handleClick}   on:SMUIListItem:mount={handleItemMount}   on:SMUIListItem:unmount={handleItemUnmount}   on:SMUI:action={handleAction}   {...$$restProps} >
    function create_default_slot$2(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[41].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[43], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 4096)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[43],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[43])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[43], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(1:0) <svelte:component   this={component}   {tag}   bind:this={element}   use={[forwardEvents, ...use]}   class={classMap({     [className]: true,     'mdc-deprecated-list': true,     'mdc-deprecated-list--non-interactive': nonInteractive,     'mdc-deprecated-list--dense': dense,     'mdc-deprecated-list--textual-list': textualList,     'mdc-deprecated-list--avatar-list': avatarList || selectionDialog,     'mdc-deprecated-list--icon-list': iconList,     'mdc-deprecated-list--image-list': imageList,     'mdc-deprecated-list--thumbnail-list': thumbnailList,     'mdc-deprecated-list--video-list': videoList,     'mdc-deprecated-list--two-line': twoLine,     'smui-list--three-line': threeLine && !twoLine,   })}   {role}   on:keydown={handleKeydown}   on:focusin={handleFocusin}   on:focusout={handleFocusout}   on:click={handleClick}   on:SMUIListItem:mount={handleItemMount}   on:SMUIListItem:unmount={handleItemUnmount}   on:SMUI:action={handleAction}   {...$$restProps} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ tag: /*tag*/ ctx[13] },
    		{
    			use: [/*forwardEvents*/ ctx[16], .../*use*/ ctx[0]]
    		},
    		{
    			class: classMap({
    				[/*className*/ ctx[1]]: true,
    				'mdc-deprecated-list': true,
    				'mdc-deprecated-list--non-interactive': /*nonInteractive*/ ctx[2],
    				'mdc-deprecated-list--dense': /*dense*/ ctx[3],
    				'mdc-deprecated-list--textual-list': /*textualList*/ ctx[4],
    				'mdc-deprecated-list--avatar-list': /*avatarList*/ ctx[5] || /*selectionDialog*/ ctx[17],
    				'mdc-deprecated-list--icon-list': /*iconList*/ ctx[6],
    				'mdc-deprecated-list--image-list': /*imageList*/ ctx[7],
    				'mdc-deprecated-list--thumbnail-list': /*thumbnailList*/ ctx[8],
    				'mdc-deprecated-list--video-list': /*videoList*/ ctx[9],
    				'mdc-deprecated-list--two-line': /*twoLine*/ ctx[10],
    				'smui-list--three-line': /*threeLine*/ ctx[11] && !/*twoLine*/ ctx[10]
    			})
    		},
    		{ role: /*role*/ ctx[15] },
    		/*$$restProps*/ ctx[25]
    	];

    	var switch_value = /*component*/ ctx[12];

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot$2] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    		/*switch_instance_binding*/ ctx[42](switch_instance);
    		switch_instance.$on("keydown", /*handleKeydown*/ ctx[20]);
    		switch_instance.$on("focusin", /*handleFocusin*/ ctx[21]);
    		switch_instance.$on("focusout", /*handleFocusout*/ ctx[22]);
    		switch_instance.$on("click", /*handleClick*/ ctx[23]);
    		switch_instance.$on("SMUIListItem:mount", /*handleItemMount*/ ctx[18]);
    		switch_instance.$on("SMUIListItem:unmount", /*handleItemUnmount*/ ctx[19]);
    		switch_instance.$on("SMUI:action", /*handleAction*/ ctx[24]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty[0] & /*tag, forwardEvents, use, className, nonInteractive, dense, textualList, avatarList, selectionDialog, iconList, imageList, thumbnailList, videoList, twoLine, threeLine, role, $$restProps*/ 33796095)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty[0] & /*tag*/ 8192 && { tag: /*tag*/ ctx[13] },
    					dirty[0] & /*forwardEvents, use*/ 65537 && {
    						use: [/*forwardEvents*/ ctx[16], .../*use*/ ctx[0]]
    					},
    					dirty[0] & /*className, nonInteractive, dense, textualList, avatarList, selectionDialog, iconList, imageList, thumbnailList, videoList, twoLine, threeLine*/ 135166 && {
    						class: classMap({
    							[/*className*/ ctx[1]]: true,
    							'mdc-deprecated-list': true,
    							'mdc-deprecated-list--non-interactive': /*nonInteractive*/ ctx[2],
    							'mdc-deprecated-list--dense': /*dense*/ ctx[3],
    							'mdc-deprecated-list--textual-list': /*textualList*/ ctx[4],
    							'mdc-deprecated-list--avatar-list': /*avatarList*/ ctx[5] || /*selectionDialog*/ ctx[17],
    							'mdc-deprecated-list--icon-list': /*iconList*/ ctx[6],
    							'mdc-deprecated-list--image-list': /*imageList*/ ctx[7],
    							'mdc-deprecated-list--thumbnail-list': /*thumbnailList*/ ctx[8],
    							'mdc-deprecated-list--video-list': /*videoList*/ ctx[9],
    							'mdc-deprecated-list--two-line': /*twoLine*/ ctx[10],
    							'smui-list--three-line': /*threeLine*/ ctx[11] && !/*twoLine*/ ctx[10]
    						})
    					},
    					dirty[0] & /*role*/ 32768 && { role: /*role*/ ctx[15] },
    					dirty[0] & /*$$restProps*/ 33554432 && get_spread_object(/*$$restProps*/ ctx[25])
    				])
    			: {};

    			if (dirty[1] & /*$$scope*/ 4096) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*component*/ ctx[12])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    					/*switch_instance_binding*/ ctx[42](switch_instance);
    					switch_instance.$on("keydown", /*handleKeydown*/ ctx[20]);
    					switch_instance.$on("focusin", /*handleFocusin*/ ctx[21]);
    					switch_instance.$on("focusout", /*handleFocusout*/ ctx[22]);
    					switch_instance.$on("click", /*handleClick*/ ctx[23]);
    					switch_instance.$on("SMUIListItem:mount", /*handleItemMount*/ ctx[18]);
    					switch_instance.$on("SMUIListItem:unmount", /*handleItemUnmount*/ ctx[19]);
    					switch_instance.$on("SMUI:action", /*handleAction*/ ctx[24]);
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
    			/*switch_instance_binding*/ ctx[42](null);
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
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

    function instance_1($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"use","class","nonInteractive","dense","textualList","avatarList","iconList","imageList","thumbnailList","videoList","twoLine","threeLine","vertical","wrapFocus","singleSelection","disabledItemsFocusable","selectedIndex","radioList","checkList","hasTypeahead","component","tag","layout","setEnabled","getTypeaheadInProgress","getSelectedIndex","getFocusedItemIndex","getElement"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('List', slots, ['default']);
    	var _a;
    	const { closest, matches } = ponyfill;
    	const forwardEvents = forwardEventsBuilder(get_current_component());
    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { nonInteractive = false } = $$props;
    	let { dense = false } = $$props;
    	let { textualList = false } = $$props;
    	let { avatarList = false } = $$props;
    	let { iconList = false } = $$props;
    	let { imageList = false } = $$props;
    	let { thumbnailList = false } = $$props;
    	let { videoList = false } = $$props;
    	let { twoLine = false } = $$props;
    	let { threeLine = false } = $$props;
    	let { vertical = true } = $$props;

    	let { wrapFocus = (_a = getContext('SMUI:list:wrapFocus')) !== null && _a !== void 0
    	? _a
    	: false } = $$props;

    	let { singleSelection = false } = $$props;
    	let { disabledItemsFocusable = false } = $$props;
    	let { selectedIndex = -1 } = $$props;
    	let { radioList = false } = $$props;
    	let { checkList = false } = $$props;
    	let { hasTypeahead = false } = $$props;
    	let element;
    	let instance;
    	let items = [];
    	let role = getContext('SMUI:list:role');
    	let nav = getContext('SMUI:list:nav');
    	const itemAccessorMap = new WeakMap();
    	let selectionDialog = getContext('SMUI:dialog:selection');
    	let addLayoutListener = getContext('SMUI:addLayoutListener');
    	let removeLayoutListener;
    	let { component = SmuiElement } = $$props;

    	let { tag = component === SmuiElement
    	? nav ? 'nav' : 'ul'
    	: undefined } = $$props;

    	setContext('SMUI:list:nonInteractive', nonInteractive);
    	setContext('SMUI:separator:context', 'list');

    	if (!role) {
    		if (singleSelection) {
    			role = 'listbox';
    			setContext('SMUI:list:item:role', 'option');
    		} else if (radioList) {
    			role = 'radiogroup';
    			setContext('SMUI:list:item:role', 'radio');
    		} else if (checkList) {
    			role = 'group';
    			setContext('SMUI:list:item:role', 'checkbox');
    		} else {
    			role = 'list';
    			setContext('SMUI:list:item:role', undefined);
    		}
    	}

    	if (addLayoutListener) {
    		removeLayoutListener = addLayoutListener(layout);
    	}

    	onMount(() => {
    		$$invalidate(40, instance = new MDCListFoundation({
    				addClassForElementIndex,
    				focusItemAtIndex,
    				getAttributeForElementIndex: (index, name) => {
    					var _a, _b;

    					return (_b = (_a = getOrderedList()[index]) === null || _a === void 0
    					? void 0
    					: _a.getAttr(name)) !== null && _b !== void 0
    					? _b
    					: null;
    				},
    				getFocusedElementIndex: () => document.activeElement
    				? getOrderedList().map(accessor => accessor.element).indexOf(document.activeElement)
    				: -1,
    				getListItemCount: () => items.length,
    				getPrimaryTextAtIndex,
    				hasCheckboxAtIndex: index => {
    					var _a, _b;

    					return (_b = (_a = getOrderedList()[index]) === null || _a === void 0
    					? void 0
    					: _a.hasCheckbox) !== null && _b !== void 0
    					? _b
    					: false;
    				},
    				hasRadioAtIndex: index => {
    					var _a, _b;

    					return (_b = (_a = getOrderedList()[index]) === null || _a === void 0
    					? void 0
    					: _a.hasRadio) !== null && _b !== void 0
    					? _b
    					: false;
    				},
    				isCheckboxCheckedAtIndex: index => {
    					var _a;
    					const listItem = getOrderedList()[index];

    					return (_a = (listItem === null || listItem === void 0
    					? void 0
    					: listItem.hasCheckbox) && listItem.checked) !== null && _a !== void 0
    					? _a
    					: false;
    				},
    				isFocusInsideList: () => element != null && getElement() !== document.activeElement && getElement().contains(document.activeElement),
    				isRootFocused: () => element != null && document.activeElement === getElement(),
    				listItemAtIndexHasClass,
    				notifyAction: index => {
    					$$invalidate(26, selectedIndex = index);

    					if (element != null) {
    						dispatch(getElement(), 'SMUIList:action', { index }, undefined, true);
    					}
    				},
    				notifySelectionChange: changedIndices => {
    					if (element != null) {
    						dispatch(getElement(), 'SMUIList:selectionChange', { changedIndices });
    					}
    				},
    				removeClassForElementIndex,
    				setAttributeForElementIndex,
    				setCheckedCheckboxOrRadioAtIndex: (index, isChecked) => {
    					getOrderedList()[index].checked = isChecked;
    				},
    				setTabIndexForListItemChildren: (listItemIndex, tabIndexValue) => {
    					const listItem = getOrderedList()[listItemIndex];
    					const selector = 'button:not(:disabled), a';

    					Array.prototype.forEach.call(listItem.element.querySelectorAll(selector), el => {
    						el.setAttribute('tabindex', tabIndexValue);
    					});
    				}
    			}));

    		const accessor = {
    			get element() {
    				return getElement();
    			},
    			get items() {
    				return items;
    			},
    			get typeaheadInProgress() {
    				return instance.isTypeaheadInProgress();
    			},
    			typeaheadMatchItem(nextChar, startingIndex) {
    				return instance.typeaheadMatchItem(nextChar, startingIndex, /** skipFocus */
    				true);
    			},
    			getOrderedList,
    			focusItemAtIndex,
    			addClassForElementIndex,
    			removeClassForElementIndex,
    			setAttributeForElementIndex,
    			removeAttributeForElementIndex,
    			getAttributeFromElementIndex,
    			getPrimaryTextAtIndex
    		};

    		dispatch(getElement(), 'SMUIList:mount', accessor);
    		instance.init();
    		instance.layout();

    		return () => {
    			instance.destroy();
    		};
    	});

    	onDestroy(() => {
    		if (removeLayoutListener) {
    			removeLayoutListener();
    		}
    	});

    	function handleItemMount(event) {
    		items.push(event.detail);
    		itemAccessorMap.set(event.detail.element, event.detail);

    		if (singleSelection && event.detail.selected) {
    			$$invalidate(26, selectedIndex = getListItemIndex(event.detail.element));
    		}

    		event.stopPropagation();
    	}

    	function handleItemUnmount(event) {
    		var _a;

    		const idx = (_a = event.detail && items.indexOf(event.detail)) !== null && _a !== void 0
    		? _a
    		: -1;

    		if (idx !== -1) {
    			items.splice(idx, 1);
    			items = items;
    			itemAccessorMap.delete(event.detail.element);
    		}

    		event.stopPropagation();
    	}

    	function handleKeydown(event) {
    		if (instance && event.target) {
    			instance.handleKeydown(event, event.target.classList.contains('mdc-deprecated-list-item'), getListItemIndex(event.target));
    		}
    	}

    	function handleFocusin(event) {
    		if (instance && event.target) {
    			instance.handleFocusIn(getListItemIndex(event.target));
    		}
    	}

    	function handleFocusout(event) {
    		if (instance && event.target) {
    			instance.handleFocusOut(getListItemIndex(event.target));
    		}
    	}

    	function handleClick(event) {
    		if (instance && event.target) {
    			instance.handleClick(getListItemIndex(event.target), !matches(event.target, 'input[type="checkbox"], input[type="radio"]'), event);
    		}
    	}

    	function handleAction(event) {
    		if (radioList || checkList) {
    			const index = getListItemIndex(event.target);

    			if (index !== -1) {
    				const item = getOrderedList()[index];

    				if (item && (radioList && !item.checked || checkList)) {
    					if (!matches(event.detail.target, 'input[type="checkbox"], input[type="radio"]')) {
    						item.checked = !item.checked;
    					}

    					item.activateRipple();

    					window.requestAnimationFrame(() => {
    						item.deactivateRipple();
    					});
    				}
    			}
    		}
    	}

    	function getOrderedList() {
    		if (element == null) {
    			return [];
    		}

    		return [...getElement().children].map(element => itemAccessorMap.get(element)).filter(accessor => accessor && accessor._smui_list_item_accessor);
    	}

    	function focusItemAtIndex(index) {
    		const accessor = getOrderedList()[index];
    		accessor && 'focus' in accessor.element && accessor.element.focus();
    	}

    	function listItemAtIndexHasClass(index, className) {
    		var _a;
    		const accessor = getOrderedList()[index];

    		return (_a = accessor && accessor.hasClass(className)) !== null && _a !== void 0
    		? _a
    		: false;
    	}

    	function addClassForElementIndex(index, className) {
    		const accessor = getOrderedList()[index];
    		accessor && accessor.addClass(className);
    	}

    	function removeClassForElementIndex(index, className) {
    		const accessor = getOrderedList()[index];
    		accessor && accessor.removeClass(className);
    	}

    	function setAttributeForElementIndex(index, name, value) {
    		const accessor = getOrderedList()[index];
    		accessor && accessor.addAttr(name, value);
    	}

    	function removeAttributeForElementIndex(index, name) {
    		const accessor = getOrderedList()[index];
    		accessor && accessor.removeAttr(name);
    	}

    	function getAttributeFromElementIndex(index, name) {
    		const accessor = getOrderedList()[index];

    		if (accessor) {
    			return accessor.getAttr(name);
    		} else {
    			return null;
    		}
    	}

    	function getPrimaryTextAtIndex(index) {
    		var _a;
    		const accessor = getOrderedList()[index];

    		return (_a = accessor && accessor.getPrimaryText()) !== null && _a !== void 0
    		? _a
    		: '';
    	}

    	function getListItemIndex(element) {
    		const nearestParent = closest(element, '.mdc-deprecated-list-item, .mdc-deprecated-list');

    		// Get the index of the element if it is a list item.
    		if (nearestParent && matches(nearestParent, '.mdc-deprecated-list-item')) {
    			return getOrderedList().map(item => item === null || item === void 0 ? void 0 : item.element).indexOf(nearestParent);
    		}

    		return -1;
    	}

    	function layout() {
    		return instance.layout();
    	}

    	function setEnabled(itemIndex, isEnabled) {
    		return instance.setEnabled(itemIndex, isEnabled);
    	}

    	function getTypeaheadInProgress() {
    		return instance.isTypeaheadInProgress();
    	}

    	function getSelectedIndex() {
    		return instance.getSelectedIndex();
    	}

    	function getFocusedItemIndex() {
    		return instance.getFocusedItemIndex();
    	}

    	function getElement() {
    		return element.getElement();
    	}

    	function switch_instance_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(14, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(25, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(0, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ('nonInteractive' in $$new_props) $$invalidate(2, nonInteractive = $$new_props.nonInteractive);
    		if ('dense' in $$new_props) $$invalidate(3, dense = $$new_props.dense);
    		if ('textualList' in $$new_props) $$invalidate(4, textualList = $$new_props.textualList);
    		if ('avatarList' in $$new_props) $$invalidate(5, avatarList = $$new_props.avatarList);
    		if ('iconList' in $$new_props) $$invalidate(6, iconList = $$new_props.iconList);
    		if ('imageList' in $$new_props) $$invalidate(7, imageList = $$new_props.imageList);
    		if ('thumbnailList' in $$new_props) $$invalidate(8, thumbnailList = $$new_props.thumbnailList);
    		if ('videoList' in $$new_props) $$invalidate(9, videoList = $$new_props.videoList);
    		if ('twoLine' in $$new_props) $$invalidate(10, twoLine = $$new_props.twoLine);
    		if ('threeLine' in $$new_props) $$invalidate(11, threeLine = $$new_props.threeLine);
    		if ('vertical' in $$new_props) $$invalidate(27, vertical = $$new_props.vertical);
    		if ('wrapFocus' in $$new_props) $$invalidate(28, wrapFocus = $$new_props.wrapFocus);
    		if ('singleSelection' in $$new_props) $$invalidate(29, singleSelection = $$new_props.singleSelection);
    		if ('disabledItemsFocusable' in $$new_props) $$invalidate(30, disabledItemsFocusable = $$new_props.disabledItemsFocusable);
    		if ('selectedIndex' in $$new_props) $$invalidate(26, selectedIndex = $$new_props.selectedIndex);
    		if ('radioList' in $$new_props) $$invalidate(31, radioList = $$new_props.radioList);
    		if ('checkList' in $$new_props) $$invalidate(32, checkList = $$new_props.checkList);
    		if ('hasTypeahead' in $$new_props) $$invalidate(33, hasTypeahead = $$new_props.hasTypeahead);
    		if ('component' in $$new_props) $$invalidate(12, component = $$new_props.component);
    		if ('tag' in $$new_props) $$invalidate(13, tag = $$new_props.tag);
    		if ('$$scope' in $$new_props) $$invalidate(43, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		_a,
    		MDCListFoundation,
    		ponyfill,
    		onMount,
    		onDestroy,
    		getContext,
    		setContext,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		dispatch,
    		SmuiElement,
    		closest,
    		matches,
    		forwardEvents,
    		use,
    		className,
    		nonInteractive,
    		dense,
    		textualList,
    		avatarList,
    		iconList,
    		imageList,
    		thumbnailList,
    		videoList,
    		twoLine,
    		threeLine,
    		vertical,
    		wrapFocus,
    		singleSelection,
    		disabledItemsFocusable,
    		selectedIndex,
    		radioList,
    		checkList,
    		hasTypeahead,
    		element,
    		instance,
    		items,
    		role,
    		nav,
    		itemAccessorMap,
    		selectionDialog,
    		addLayoutListener,
    		removeLayoutListener,
    		component,
    		tag,
    		handleItemMount,
    		handleItemUnmount,
    		handleKeydown,
    		handleFocusin,
    		handleFocusout,
    		handleClick,
    		handleAction,
    		getOrderedList,
    		focusItemAtIndex,
    		listItemAtIndexHasClass,
    		addClassForElementIndex,
    		removeClassForElementIndex,
    		setAttributeForElementIndex,
    		removeAttributeForElementIndex,
    		getAttributeFromElementIndex,
    		getPrimaryTextAtIndex,
    		getListItemIndex,
    		layout,
    		setEnabled,
    		getTypeaheadInProgress,
    		getSelectedIndex,
    		getFocusedItemIndex,
    		getElement
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('_a' in $$props) _a = $$new_props._a;
    		if ('use' in $$props) $$invalidate(0, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
    		if ('nonInteractive' in $$props) $$invalidate(2, nonInteractive = $$new_props.nonInteractive);
    		if ('dense' in $$props) $$invalidate(3, dense = $$new_props.dense);
    		if ('textualList' in $$props) $$invalidate(4, textualList = $$new_props.textualList);
    		if ('avatarList' in $$props) $$invalidate(5, avatarList = $$new_props.avatarList);
    		if ('iconList' in $$props) $$invalidate(6, iconList = $$new_props.iconList);
    		if ('imageList' in $$props) $$invalidate(7, imageList = $$new_props.imageList);
    		if ('thumbnailList' in $$props) $$invalidate(8, thumbnailList = $$new_props.thumbnailList);
    		if ('videoList' in $$props) $$invalidate(9, videoList = $$new_props.videoList);
    		if ('twoLine' in $$props) $$invalidate(10, twoLine = $$new_props.twoLine);
    		if ('threeLine' in $$props) $$invalidate(11, threeLine = $$new_props.threeLine);
    		if ('vertical' in $$props) $$invalidate(27, vertical = $$new_props.vertical);
    		if ('wrapFocus' in $$props) $$invalidate(28, wrapFocus = $$new_props.wrapFocus);
    		if ('singleSelection' in $$props) $$invalidate(29, singleSelection = $$new_props.singleSelection);
    		if ('disabledItemsFocusable' in $$props) $$invalidate(30, disabledItemsFocusable = $$new_props.disabledItemsFocusable);
    		if ('selectedIndex' in $$props) $$invalidate(26, selectedIndex = $$new_props.selectedIndex);
    		if ('radioList' in $$props) $$invalidate(31, radioList = $$new_props.radioList);
    		if ('checkList' in $$props) $$invalidate(32, checkList = $$new_props.checkList);
    		if ('hasTypeahead' in $$props) $$invalidate(33, hasTypeahead = $$new_props.hasTypeahead);
    		if ('element' in $$props) $$invalidate(14, element = $$new_props.element);
    		if ('instance' in $$props) $$invalidate(40, instance = $$new_props.instance);
    		if ('items' in $$props) items = $$new_props.items;
    		if ('role' in $$props) $$invalidate(15, role = $$new_props.role);
    		if ('nav' in $$props) nav = $$new_props.nav;
    		if ('selectionDialog' in $$props) $$invalidate(17, selectionDialog = $$new_props.selectionDialog);
    		if ('addLayoutListener' in $$props) addLayoutListener = $$new_props.addLayoutListener;
    		if ('removeLayoutListener' in $$props) removeLayoutListener = $$new_props.removeLayoutListener;
    		if ('component' in $$props) $$invalidate(12, component = $$new_props.component);
    		if ('tag' in $$props) $$invalidate(13, tag = $$new_props.tag);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*vertical*/ 134217728 | $$self.$$.dirty[1] & /*instance*/ 512) {
    			if (instance) {
    				instance.setVerticalOrientation(vertical);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*wrapFocus*/ 268435456 | $$self.$$.dirty[1] & /*instance*/ 512) {
    			if (instance) {
    				instance.setWrapFocus(wrapFocus);
    			}
    		}

    		if ($$self.$$.dirty[1] & /*instance, hasTypeahead*/ 516) {
    			if (instance) {
    				instance.setHasTypeahead(hasTypeahead);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*singleSelection*/ 536870912 | $$self.$$.dirty[1] & /*instance*/ 512) {
    			if (instance) {
    				instance.setSingleSelection(singleSelection);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*disabledItemsFocusable*/ 1073741824 | $$self.$$.dirty[1] & /*instance*/ 512) {
    			if (instance) {
    				instance.setDisabledItemsFocusable(disabledItemsFocusable);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*singleSelection, selectedIndex*/ 603979776 | $$self.$$.dirty[1] & /*instance*/ 512) {
    			if (instance && singleSelection && getSelectedIndex() !== selectedIndex) {
    				instance.setSelectedIndex(selectedIndex);
    			}
    		}
    	};

    	return [
    		use,
    		className,
    		nonInteractive,
    		dense,
    		textualList,
    		avatarList,
    		iconList,
    		imageList,
    		thumbnailList,
    		videoList,
    		twoLine,
    		threeLine,
    		component,
    		tag,
    		element,
    		role,
    		forwardEvents,
    		selectionDialog,
    		handleItemMount,
    		handleItemUnmount,
    		handleKeydown,
    		handleFocusin,
    		handleFocusout,
    		handleClick,
    		handleAction,
    		$$restProps,
    		selectedIndex,
    		vertical,
    		wrapFocus,
    		singleSelection,
    		disabledItemsFocusable,
    		radioList,
    		checkList,
    		hasTypeahead,
    		layout,
    		setEnabled,
    		getTypeaheadInProgress,
    		getSelectedIndex,
    		getFocusedItemIndex,
    		getElement,
    		instance,
    		slots,
    		switch_instance_binding,
    		$$scope
    	];
    }

    class List extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance_1,
    			create_fragment$3,
    			safe_not_equal,
    			{
    				use: 0,
    				class: 1,
    				nonInteractive: 2,
    				dense: 3,
    				textualList: 4,
    				avatarList: 5,
    				iconList: 6,
    				imageList: 7,
    				thumbnailList: 8,
    				videoList: 9,
    				twoLine: 10,
    				threeLine: 11,
    				vertical: 27,
    				wrapFocus: 28,
    				singleSelection: 29,
    				disabledItemsFocusable: 30,
    				selectedIndex: 26,
    				radioList: 31,
    				checkList: 32,
    				hasTypeahead: 33,
    				component: 12,
    				tag: 13,
    				layout: 34,
    				setEnabled: 35,
    				getTypeaheadInProgress: 36,
    				getSelectedIndex: 37,
    				getFocusedItemIndex: 38,
    				getElement: 39
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "List",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get use() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get nonInteractive() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nonInteractive(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dense() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dense(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get textualList() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set textualList(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get avatarList() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set avatarList(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get iconList() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set iconList(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get imageList() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imageList(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get thumbnailList() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set thumbnailList(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get videoList() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set videoList(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get twoLine() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set twoLine(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get threeLine() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set threeLine(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get vertical() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set vertical(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get wrapFocus() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set wrapFocus(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get singleSelection() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set singleSelection(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabledItemsFocusable() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabledItemsFocusable(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selectedIndex() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selectedIndex(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get radioList() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set radioList(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checkList() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checkList(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hasTypeahead() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hasTypeahead(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tag() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tag(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get layout() {
    		return this.$$.ctx[34];
    	}

    	set layout(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get setEnabled() {
    		return this.$$.ctx[35];
    	}

    	set setEnabled(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getTypeaheadInProgress() {
    		return this.$$.ctx[36];
    	}

    	set getTypeaheadInProgress(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getSelectedIndex() {
    		return this.$$.ctx[37];
    	}

    	set getSelectedIndex(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getFocusedItemIndex() {
    		return this.$$.ctx[38];
    	}

    	set getFocusedItemIndex(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[39];
    	}

    	set getElement(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /**
     * Stores result from supportsCssVariables to avoid redundant processing to
     * detect CSS custom variable support.
     */
    var supportsCssVariables_;
    function supportsCssVariables(windowObj, forceRefresh) {
        if (forceRefresh === void 0) { forceRefresh = false; }
        var CSS = windowObj.CSS;
        var supportsCssVars = supportsCssVariables_;
        if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
            return supportsCssVariables_;
        }
        var supportsFunctionPresent = CSS && typeof CSS.supports === 'function';
        if (!supportsFunctionPresent) {
            return false;
        }
        var explicitlySupportsCssVars = CSS.supports('--css-vars', 'yes');
        // See: https://bugs.webkit.org/show_bug.cgi?id=154669
        // See: README section on Safari
        var weAreFeatureDetectingSafari10plus = (CSS.supports('(--css-vars: yes)') &&
            CSS.supports('color', '#00000000'));
        supportsCssVars =
            explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus;
        if (!forceRefresh) {
            supportsCssVariables_ = supportsCssVars;
        }
        return supportsCssVars;
    }
    function getNormalizedEventCoords(evt, pageOffset, clientRect) {
        if (!evt) {
            return { x: 0, y: 0 };
        }
        var x = pageOffset.x, y = pageOffset.y;
        var documentX = x + clientRect.left;
        var documentY = y + clientRect.top;
        var normalizedX;
        var normalizedY;
        // Determine touch point relative to the ripple container.
        if (evt.type === 'touchstart') {
            var touchEvent = evt;
            normalizedX = touchEvent.changedTouches[0].pageX - documentX;
            normalizedY = touchEvent.changedTouches[0].pageY - documentY;
        }
        else {
            var mouseEvent = evt;
            normalizedX = mouseEvent.pageX - documentX;
            normalizedY = mouseEvent.pageY - documentY;
        }
        return { x: normalizedX, y: normalizedY };
    }

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    var cssClasses = {
        // Ripple is a special case where the "root" component is really a "mixin" of sorts,
        // given that it's an 'upgrade' to an existing component. That being said it is the root
        // CSS class that all other CSS classes derive from.
        BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
        FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
        FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
        ROOT: 'mdc-ripple-upgraded',
        UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
    };
    var strings = {
        VAR_FG_SCALE: '--mdc-ripple-fg-scale',
        VAR_FG_SIZE: '--mdc-ripple-fg-size',
        VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
        VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
        VAR_LEFT: '--mdc-ripple-left',
        VAR_TOP: '--mdc-ripple-top',
    };
    var numbers = {
        DEACTIVATION_TIMEOUT_MS: 225,
        FG_DEACTIVATION_MS: 150,
        INITIAL_ORIGIN_SCALE: 0.6,
        PADDING: 10,
        TAP_DELAY_MS: 300, // Delay between touch and simulated mouse events on touch devices
    };

    /**
     * @license
     * Copyright 2016 Google Inc.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    // Activation events registered on the root element of each instance for activation
    var ACTIVATION_EVENT_TYPES = [
        'touchstart', 'pointerdown', 'mousedown', 'keydown',
    ];
    // Deactivation events registered on documentElement when a pointer-related down event occurs
    var POINTER_DEACTIVATION_EVENT_TYPES = [
        'touchend', 'pointerup', 'mouseup', 'contextmenu',
    ];
    // simultaneous nested activations
    var activatedTargets = [];
    var MDCRippleFoundation = /** @class */ (function (_super) {
        __extends(MDCRippleFoundation, _super);
        function MDCRippleFoundation(adapter) {
            var _this = _super.call(this, __assign(__assign({}, MDCRippleFoundation.defaultAdapter), adapter)) || this;
            _this.activationAnimationHasEnded = false;
            _this.activationTimer = 0;
            _this.fgDeactivationRemovalTimer = 0;
            _this.fgScale = '0';
            _this.frame = { width: 0, height: 0 };
            _this.initialSize = 0;
            _this.layoutFrame = 0;
            _this.maxRadius = 0;
            _this.unboundedCoords = { left: 0, top: 0 };
            _this.activationState = _this.defaultActivationState();
            _this.activationTimerCallback = function () {
                _this.activationAnimationHasEnded = true;
                _this.runDeactivationUXLogicIfReady();
            };
            _this.activateHandler = function (e) {
                _this.activateImpl(e);
            };
            _this.deactivateHandler = function () {
                _this.deactivateImpl();
            };
            _this.focusHandler = function () {
                _this.handleFocus();
            };
            _this.blurHandler = function () {
                _this.handleBlur();
            };
            _this.resizeHandler = function () {
                _this.layout();
            };
            return _this;
        }
        Object.defineProperty(MDCRippleFoundation, "cssClasses", {
            get: function () {
                return cssClasses;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCRippleFoundation, "strings", {
            get: function () {
                return strings;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCRippleFoundation, "numbers", {
            get: function () {
                return numbers;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
            get: function () {
                return {
                    addClass: function () { return undefined; },
                    browserSupportsCssVars: function () { return true; },
                    computeBoundingRect: function () {
                        return ({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 });
                    },
                    containsEventTarget: function () { return true; },
                    deregisterDocumentInteractionHandler: function () { return undefined; },
                    deregisterInteractionHandler: function () { return undefined; },
                    deregisterResizeHandler: function () { return undefined; },
                    getWindowPageOffset: function () { return ({ x: 0, y: 0 }); },
                    isSurfaceActive: function () { return true; },
                    isSurfaceDisabled: function () { return true; },
                    isUnbounded: function () { return true; },
                    registerDocumentInteractionHandler: function () { return undefined; },
                    registerInteractionHandler: function () { return undefined; },
                    registerResizeHandler: function () { return undefined; },
                    removeClass: function () { return undefined; },
                    updateCssVariable: function () { return undefined; },
                };
            },
            enumerable: false,
            configurable: true
        });
        MDCRippleFoundation.prototype.init = function () {
            var _this = this;
            var supportsPressRipple = this.supportsPressRipple();
            this.registerRootHandlers(supportsPressRipple);
            if (supportsPressRipple) {
                var _a = MDCRippleFoundation.cssClasses, ROOT_1 = _a.ROOT, UNBOUNDED_1 = _a.UNBOUNDED;
                requestAnimationFrame(function () {
                    _this.adapter.addClass(ROOT_1);
                    if (_this.adapter.isUnbounded()) {
                        _this.adapter.addClass(UNBOUNDED_1);
                        // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
                        _this.layoutInternal();
                    }
                });
            }
        };
        MDCRippleFoundation.prototype.destroy = function () {
            var _this = this;
            if (this.supportsPressRipple()) {
                if (this.activationTimer) {
                    clearTimeout(this.activationTimer);
                    this.activationTimer = 0;
                    this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
                }
                if (this.fgDeactivationRemovalTimer) {
                    clearTimeout(this.fgDeactivationRemovalTimer);
                    this.fgDeactivationRemovalTimer = 0;
                    this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
                }
                var _a = MDCRippleFoundation.cssClasses, ROOT_2 = _a.ROOT, UNBOUNDED_2 = _a.UNBOUNDED;
                requestAnimationFrame(function () {
                    _this.adapter.removeClass(ROOT_2);
                    _this.adapter.removeClass(UNBOUNDED_2);
                    _this.removeCssVars();
                });
            }
            this.deregisterRootHandlers();
            this.deregisterDeactivationHandlers();
        };
        /**
         * @param evt Optional event containing position information.
         */
        MDCRippleFoundation.prototype.activate = function (evt) {
            this.activateImpl(evt);
        };
        MDCRippleFoundation.prototype.deactivate = function () {
            this.deactivateImpl();
        };
        MDCRippleFoundation.prototype.layout = function () {
            var _this = this;
            if (this.layoutFrame) {
                cancelAnimationFrame(this.layoutFrame);
            }
            this.layoutFrame = requestAnimationFrame(function () {
                _this.layoutInternal();
                _this.layoutFrame = 0;
            });
        };
        MDCRippleFoundation.prototype.setUnbounded = function (unbounded) {
            var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;
            if (unbounded) {
                this.adapter.addClass(UNBOUNDED);
            }
            else {
                this.adapter.removeClass(UNBOUNDED);
            }
        };
        MDCRippleFoundation.prototype.handleFocus = function () {
            var _this = this;
            requestAnimationFrame(function () { return _this.adapter.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED); });
        };
        MDCRippleFoundation.prototype.handleBlur = function () {
            var _this = this;
            requestAnimationFrame(function () { return _this.adapter.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED); });
        };
        /**
         * We compute this property so that we are not querying information about the client
         * until the point in time where the foundation requests it. This prevents scenarios where
         * client-side feature-detection may happen too early, such as when components are rendered on the server
         * and then initialized at mount time on the client.
         */
        MDCRippleFoundation.prototype.supportsPressRipple = function () {
            return this.adapter.browserSupportsCssVars();
        };
        MDCRippleFoundation.prototype.defaultActivationState = function () {
            return {
                activationEvent: undefined,
                hasDeactivationUXRun: false,
                isActivated: false,
                isProgrammatic: false,
                wasActivatedByPointer: false,
                wasElementMadeActive: false,
            };
        };
        /**
         * supportsPressRipple Passed from init to save a redundant function call
         */
        MDCRippleFoundation.prototype.registerRootHandlers = function (supportsPressRipple) {
            var e_1, _a;
            if (supportsPressRipple) {
                try {
                    for (var ACTIVATION_EVENT_TYPES_1 = __values(ACTIVATION_EVENT_TYPES), ACTIVATION_EVENT_TYPES_1_1 = ACTIVATION_EVENT_TYPES_1.next(); !ACTIVATION_EVENT_TYPES_1_1.done; ACTIVATION_EVENT_TYPES_1_1 = ACTIVATION_EVENT_TYPES_1.next()) {
                        var evtType = ACTIVATION_EVENT_TYPES_1_1.value;
                        this.adapter.registerInteractionHandler(evtType, this.activateHandler);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (ACTIVATION_EVENT_TYPES_1_1 && !ACTIVATION_EVENT_TYPES_1_1.done && (_a = ACTIVATION_EVENT_TYPES_1.return)) _a.call(ACTIVATION_EVENT_TYPES_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (this.adapter.isUnbounded()) {
                    this.adapter.registerResizeHandler(this.resizeHandler);
                }
            }
            this.adapter.registerInteractionHandler('focus', this.focusHandler);
            this.adapter.registerInteractionHandler('blur', this.blurHandler);
        };
        MDCRippleFoundation.prototype.registerDeactivationHandlers = function (evt) {
            var e_2, _a;
            if (evt.type === 'keydown') {
                this.adapter.registerInteractionHandler('keyup', this.deactivateHandler);
            }
            else {
                try {
                    for (var POINTER_DEACTIVATION_EVENT_TYPES_1 = __values(POINTER_DEACTIVATION_EVENT_TYPES), POINTER_DEACTIVATION_EVENT_TYPES_1_1 = POINTER_DEACTIVATION_EVENT_TYPES_1.next(); !POINTER_DEACTIVATION_EVENT_TYPES_1_1.done; POINTER_DEACTIVATION_EVENT_TYPES_1_1 = POINTER_DEACTIVATION_EVENT_TYPES_1.next()) {
                        var evtType = POINTER_DEACTIVATION_EVENT_TYPES_1_1.value;
                        this.adapter.registerDocumentInteractionHandler(evtType, this.deactivateHandler);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (POINTER_DEACTIVATION_EVENT_TYPES_1_1 && !POINTER_DEACTIVATION_EVENT_TYPES_1_1.done && (_a = POINTER_DEACTIVATION_EVENT_TYPES_1.return)) _a.call(POINTER_DEACTIVATION_EVENT_TYPES_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        };
        MDCRippleFoundation.prototype.deregisterRootHandlers = function () {
            var e_3, _a;
            try {
                for (var ACTIVATION_EVENT_TYPES_2 = __values(ACTIVATION_EVENT_TYPES), ACTIVATION_EVENT_TYPES_2_1 = ACTIVATION_EVENT_TYPES_2.next(); !ACTIVATION_EVENT_TYPES_2_1.done; ACTIVATION_EVENT_TYPES_2_1 = ACTIVATION_EVENT_TYPES_2.next()) {
                    var evtType = ACTIVATION_EVENT_TYPES_2_1.value;
                    this.adapter.deregisterInteractionHandler(evtType, this.activateHandler);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (ACTIVATION_EVENT_TYPES_2_1 && !ACTIVATION_EVENT_TYPES_2_1.done && (_a = ACTIVATION_EVENT_TYPES_2.return)) _a.call(ACTIVATION_EVENT_TYPES_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
            this.adapter.deregisterInteractionHandler('focus', this.focusHandler);
            this.adapter.deregisterInteractionHandler('blur', this.blurHandler);
            if (this.adapter.isUnbounded()) {
                this.adapter.deregisterResizeHandler(this.resizeHandler);
            }
        };
        MDCRippleFoundation.prototype.deregisterDeactivationHandlers = function () {
            var e_4, _a;
            this.adapter.deregisterInteractionHandler('keyup', this.deactivateHandler);
            try {
                for (var POINTER_DEACTIVATION_EVENT_TYPES_2 = __values(POINTER_DEACTIVATION_EVENT_TYPES), POINTER_DEACTIVATION_EVENT_TYPES_2_1 = POINTER_DEACTIVATION_EVENT_TYPES_2.next(); !POINTER_DEACTIVATION_EVENT_TYPES_2_1.done; POINTER_DEACTIVATION_EVENT_TYPES_2_1 = POINTER_DEACTIVATION_EVENT_TYPES_2.next()) {
                    var evtType = POINTER_DEACTIVATION_EVENT_TYPES_2_1.value;
                    this.adapter.deregisterDocumentInteractionHandler(evtType, this.deactivateHandler);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (POINTER_DEACTIVATION_EVENT_TYPES_2_1 && !POINTER_DEACTIVATION_EVENT_TYPES_2_1.done && (_a = POINTER_DEACTIVATION_EVENT_TYPES_2.return)) _a.call(POINTER_DEACTIVATION_EVENT_TYPES_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
        };
        MDCRippleFoundation.prototype.removeCssVars = function () {
            var _this = this;
            var rippleStrings = MDCRippleFoundation.strings;
            var keys = Object.keys(rippleStrings);
            keys.forEach(function (key) {
                if (key.indexOf('VAR_') === 0) {
                    _this.adapter.updateCssVariable(rippleStrings[key], null);
                }
            });
        };
        MDCRippleFoundation.prototype.activateImpl = function (evt) {
            var _this = this;
            if (this.adapter.isSurfaceDisabled()) {
                return;
            }
            var activationState = this.activationState;
            if (activationState.isActivated) {
                return;
            }
            // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
            var previousActivationEvent = this.previousActivationEvent;
            var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;
            if (isSameInteraction) {
                return;
            }
            activationState.isActivated = true;
            activationState.isProgrammatic = evt === undefined;
            activationState.activationEvent = evt;
            activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown');
            var hasActivatedChild = evt !== undefined &&
                activatedTargets.length > 0 &&
                activatedTargets.some(function (target) { return _this.adapter.containsEventTarget(target); });
            if (hasActivatedChild) {
                // Immediately reset activation state, while preserving logic that prevents touch follow-on events
                this.resetActivationState();
                return;
            }
            if (evt !== undefined) {
                activatedTargets.push(evt.target);
                this.registerDeactivationHandlers(evt);
            }
            activationState.wasElementMadeActive = this.checkElementMadeActive(evt);
            if (activationState.wasElementMadeActive) {
                this.animateActivation();
            }
            requestAnimationFrame(function () {
                // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
                activatedTargets = [];
                if (!activationState.wasElementMadeActive
                    && evt !== undefined
                    && (evt.key === ' ' || evt.keyCode === 32)) {
                    // If space was pressed, try again within an rAF call to detect :active, because different UAs report
                    // active states inconsistently when they're called within event handling code:
                    // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
                    // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
                    // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
                    // variable is set within a rAF callback for a submit button interaction (#2241).
                    activationState.wasElementMadeActive = _this.checkElementMadeActive(evt);
                    if (activationState.wasElementMadeActive) {
                        _this.animateActivation();
                    }
                }
                if (!activationState.wasElementMadeActive) {
                    // Reset activation state immediately if element was not made active.
                    _this.activationState = _this.defaultActivationState();
                }
            });
        };
        MDCRippleFoundation.prototype.checkElementMadeActive = function (evt) {
            return (evt !== undefined && evt.type === 'keydown') ?
                this.adapter.isSurfaceActive() :
                true;
        };
        MDCRippleFoundation.prototype.animateActivation = function () {
            var _this = this;
            var _a = MDCRippleFoundation.strings, VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
            var _b = MDCRippleFoundation.cssClasses, FG_DEACTIVATION = _b.FG_DEACTIVATION, FG_ACTIVATION = _b.FG_ACTIVATION;
            var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
            this.layoutInternal();
            var translateStart = '';
            var translateEnd = '';
            if (!this.adapter.isUnbounded()) {
                var _c = this.getFgTranslationCoordinates(), startPoint = _c.startPoint, endPoint = _c.endPoint;
                translateStart = startPoint.x + "px, " + startPoint.y + "px";
                translateEnd = endPoint.x + "px, " + endPoint.y + "px";
            }
            this.adapter.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
            this.adapter.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
            // Cancel any ongoing activation/deactivation animations
            clearTimeout(this.activationTimer);
            clearTimeout(this.fgDeactivationRemovalTimer);
            this.rmBoundedActivationClasses();
            this.adapter.removeClass(FG_DEACTIVATION);
            // Force layout in order to re-trigger the animation.
            this.adapter.computeBoundingRect();
            this.adapter.addClass(FG_ACTIVATION);
            this.activationTimer = setTimeout(function () {
                _this.activationTimerCallback();
            }, DEACTIVATION_TIMEOUT_MS);
        };
        MDCRippleFoundation.prototype.getFgTranslationCoordinates = function () {
            var _a = this.activationState, activationEvent = _a.activationEvent, wasActivatedByPointer = _a.wasActivatedByPointer;
            var startPoint;
            if (wasActivatedByPointer) {
                startPoint = getNormalizedEventCoords(activationEvent, this.adapter.getWindowPageOffset(), this.adapter.computeBoundingRect());
            }
            else {
                startPoint = {
                    x: this.frame.width / 2,
                    y: this.frame.height / 2,
                };
            }
            // Center the element around the start point.
            startPoint = {
                x: startPoint.x - (this.initialSize / 2),
                y: startPoint.y - (this.initialSize / 2),
            };
            var endPoint = {
                x: (this.frame.width / 2) - (this.initialSize / 2),
                y: (this.frame.height / 2) - (this.initialSize / 2),
            };
            return { startPoint: startPoint, endPoint: endPoint };
        };
        MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady = function () {
            var _this = this;
            // This method is called both when a pointing device is released, and when the activation animation ends.
            // The deactivation animation should only run after both of those occur.
            var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
            var _a = this.activationState, hasDeactivationUXRun = _a.hasDeactivationUXRun, isActivated = _a.isActivated;
            var activationHasEnded = hasDeactivationUXRun || !isActivated;
            if (activationHasEnded && this.activationAnimationHasEnded) {
                this.rmBoundedActivationClasses();
                this.adapter.addClass(FG_DEACTIVATION);
                this.fgDeactivationRemovalTimer = setTimeout(function () {
                    _this.adapter.removeClass(FG_DEACTIVATION);
                }, numbers.FG_DEACTIVATION_MS);
            }
        };
        MDCRippleFoundation.prototype.rmBoundedActivationClasses = function () {
            var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
            this.adapter.removeClass(FG_ACTIVATION);
            this.activationAnimationHasEnded = false;
            this.adapter.computeBoundingRect();
        };
        MDCRippleFoundation.prototype.resetActivationState = function () {
            var _this = this;
            this.previousActivationEvent = this.activationState.activationEvent;
            this.activationState = this.defaultActivationState();
            // Touch devices may fire additional events for the same interaction within a short time.
            // Store the previous event until it's safe to assume that subsequent events are for new interactions.
            setTimeout(function () { return _this.previousActivationEvent = undefined; }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
        };
        MDCRippleFoundation.prototype.deactivateImpl = function () {
            var _this = this;
            var activationState = this.activationState;
            // This can happen in scenarios such as when you have a keyup event that blurs the element.
            if (!activationState.isActivated) {
                return;
            }
            var state = __assign({}, activationState);
            if (activationState.isProgrammatic) {
                requestAnimationFrame(function () {
                    _this.animateDeactivation(state);
                });
                this.resetActivationState();
            }
            else {
                this.deregisterDeactivationHandlers();
                requestAnimationFrame(function () {
                    _this.activationState.hasDeactivationUXRun = true;
                    _this.animateDeactivation(state);
                    _this.resetActivationState();
                });
            }
        };
        MDCRippleFoundation.prototype.animateDeactivation = function (_a) {
            var wasActivatedByPointer = _a.wasActivatedByPointer, wasElementMadeActive = _a.wasElementMadeActive;
            if (wasActivatedByPointer || wasElementMadeActive) {
                this.runDeactivationUXLogicIfReady();
            }
        };
        MDCRippleFoundation.prototype.layoutInternal = function () {
            var _this = this;
            this.frame = this.adapter.computeBoundingRect();
            var maxDim = Math.max(this.frame.height, this.frame.width);
            // Surface diameter is treated differently for unbounded vs. bounded ripples.
            // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
            // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
            // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
            // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
            // `overflow: hidden`.
            var getBoundedRadius = function () {
                var hypotenuse = Math.sqrt(Math.pow(_this.frame.width, 2) + Math.pow(_this.frame.height, 2));
                return hypotenuse + MDCRippleFoundation.numbers.PADDING;
            };
            this.maxRadius = this.adapter.isUnbounded() ? maxDim : getBoundedRadius();
            // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
            var initialSize = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
            // Unbounded ripple size should always be even number to equally center align.
            if (this.adapter.isUnbounded() && initialSize % 2 !== 0) {
                this.initialSize = initialSize - 1;
            }
            else {
                this.initialSize = initialSize;
            }
            this.fgScale = "" + this.maxRadius / this.initialSize;
            this.updateLayoutCssVars();
        };
        MDCRippleFoundation.prototype.updateLayoutCssVars = function () {
            var _a = MDCRippleFoundation.strings, VAR_FG_SIZE = _a.VAR_FG_SIZE, VAR_LEFT = _a.VAR_LEFT, VAR_TOP = _a.VAR_TOP, VAR_FG_SCALE = _a.VAR_FG_SCALE;
            this.adapter.updateCssVariable(VAR_FG_SIZE, this.initialSize + "px");
            this.adapter.updateCssVariable(VAR_FG_SCALE, this.fgScale);
            if (this.adapter.isUnbounded()) {
                this.unboundedCoords = {
                    left: Math.round((this.frame.width / 2) - (this.initialSize / 2)),
                    top: Math.round((this.frame.height / 2) - (this.initialSize / 2)),
                };
                this.adapter.updateCssVariable(VAR_LEFT, this.unboundedCoords.left + "px");
                this.adapter.updateCssVariable(VAR_TOP, this.unboundedCoords.top + "px");
            }
        };
        return MDCRippleFoundation;
    }(MDCFoundation));

    const { applyPassive } = events;
    const { matches } = ponyfill;
    function Ripple(node, { ripple = true, surface = false, unbounded = false, disabled = false, color, active, rippleElement, eventTarget, activeTarget, addClass = (className) => node.classList.add(className), removeClass = (className) => node.classList.remove(className), addStyle = (name, value) => node.style.setProperty(name, value), initPromise = Promise.resolve(), } = {}) {
        let instance;
        let addLayoutListener = getContext('SMUI:addLayoutListener');
        let removeLayoutListener;
        let oldActive = active;
        let oldEventTarget = eventTarget;
        let oldActiveTarget = activeTarget;
        function handleProps() {
            if (surface) {
                addClass('mdc-ripple-surface');
                if (color === 'primary') {
                    addClass('smui-ripple-surface--primary');
                    removeClass('smui-ripple-surface--secondary');
                }
                else if (color === 'secondary') {
                    removeClass('smui-ripple-surface--primary');
                    addClass('smui-ripple-surface--secondary');
                }
                else {
                    removeClass('smui-ripple-surface--primary');
                    removeClass('smui-ripple-surface--secondary');
                }
            }
            else {
                removeClass('mdc-ripple-surface');
                removeClass('smui-ripple-surface--primary');
                removeClass('smui-ripple-surface--secondary');
            }
            // Handle activation first.
            if (instance && oldActive !== active) {
                oldActive = active;
                if (active) {
                    instance.activate();
                }
                else if (active === false) {
                    instance.deactivate();
                }
            }
            // Then create/destroy an instance.
            if (ripple && !instance) {
                instance = new MDCRippleFoundation({
                    addClass,
                    browserSupportsCssVars: () => supportsCssVariables(window),
                    computeBoundingRect: () => (rippleElement || node).getBoundingClientRect(),
                    containsEventTarget: (target) => node.contains(target),
                    deregisterDocumentInteractionHandler: (evtType, handler) => document.documentElement.removeEventListener(evtType, handler, applyPassive()),
                    deregisterInteractionHandler: (evtType, handler) => (eventTarget || node).removeEventListener(evtType, handler, applyPassive()),
                    deregisterResizeHandler: (handler) => window.removeEventListener('resize', handler),
                    getWindowPageOffset: () => ({
                        x: window.pageXOffset,
                        y: window.pageYOffset,
                    }),
                    isSurfaceActive: () => active == null ? matches(activeTarget || node, ':active') : active,
                    isSurfaceDisabled: () => !!disabled,
                    isUnbounded: () => !!unbounded,
                    registerDocumentInteractionHandler: (evtType, handler) => document.documentElement.addEventListener(evtType, handler, applyPassive()),
                    registerInteractionHandler: (evtType, handler) => (eventTarget || node).addEventListener(evtType, handler, applyPassive()),
                    registerResizeHandler: (handler) => window.addEventListener('resize', handler),
                    removeClass,
                    updateCssVariable: addStyle,
                });
                initPromise.then(() => {
                    if (instance) {
                        instance.init();
                        instance.setUnbounded(unbounded);
                    }
                });
            }
            else if (instance && !ripple) {
                initPromise.then(() => {
                    if (instance) {
                        instance.destroy();
                        instance = undefined;
                    }
                });
            }
            // Now handle event/active targets
            if (instance &&
                (oldEventTarget !== eventTarget || oldActiveTarget !== activeTarget)) {
                oldEventTarget = eventTarget;
                oldActiveTarget = activeTarget;
                instance.destroy();
                requestAnimationFrame(() => {
                    if (instance) {
                        instance.init();
                        instance.setUnbounded(unbounded);
                    }
                });
            }
            if (!ripple && unbounded) {
                addClass('mdc-ripple-upgraded--unbounded');
            }
        }
        handleProps();
        if (addLayoutListener) {
            removeLayoutListener = addLayoutListener(layout);
        }
        function layout() {
            if (instance) {
                instance.layout();
            }
        }
        return {
            update(props) {
                ({
                    ripple,
                    surface,
                    unbounded,
                    disabled,
                    color,
                    active,
                    rippleElement,
                    eventTarget,
                    activeTarget,
                    addClass,
                    removeClass,
                    addStyle,
                    initPromise,
                } = Object.assign({ ripple: true, surface: false, unbounded: false, disabled: false, color: undefined, active: undefined, rippleElement: undefined, eventTarget: undefined, activeTarget: undefined, addClass: (className) => node.classList.add(className), removeClass: (className) => node.classList.remove(className), addStyle: (name, value) => node.style.setProperty(name, value), initPromise: Promise.resolve() }, props));
                handleProps();
            },
            destroy() {
                if (instance) {
                    instance.destroy();
                    instance = undefined;
                    removeClass('mdc-ripple-surface');
                    removeClass('smui-ripple-surface--primary');
                    removeClass('smui-ripple-surface--secondary');
                }
                if (removeLayoutListener) {
                    removeLayoutListener();
                }
            },
        };
    }

    /* node_modules\@smui\list\dist\Item.svelte generated by Svelte v3.55.1 */
    const file$2 = "node_modules\\@smui\\list\\dist\\Item.svelte";

    // (59:3) {#if ripple}
    function create_if_block(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", "mdc-deprecated-list-item__ripple");
    			add_location(span, file$2, 58, 15, 1774);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(59:3) {#if ripple}",
    		ctx
    	});

    	return block;
    }

    // (1:0) <svelte:component   this={component}   {tag}   bind:this={element}   use={[     ...(nonInteractive       ? []       : [           [             Ripple,             {               ripple: !input,               unbounded: false,               color:                 (activated || selected) && color == null ? 'primary' : color,               disabled,               addClass,               removeClass,               addStyle,             },           ],         ]),     forwardEvents,     ...use,   ]}   class={classMap({     [className]: true,     'mdc-deprecated-list-item': !wrapper,     'mdc-deprecated-list-item__wrapper': wrapper,     'mdc-deprecated-list-item--activated': activated,     'mdc-deprecated-list-item--selected': selected,     'mdc-deprecated-list-item--disabled': disabled,     'mdc-menu-item--selected': !nav && role === 'menuitem' && selected,     'smui-menu-item--non-interactive': nonInteractive,     ...internalClasses,   })}   style={Object.entries(internalStyles)     .map(([name, value]) => `${name}: ${value};`)     .concat([style])     .join(' ')}   {...nav && activated ? { 'aria-current': 'page' } : {}}   {...!nav || wrapper ? { role } : {}}   {...!nav && role === 'option'     ? { 'aria-selected': selected ? 'true' : 'false' }     : {}}   {...!nav && (role === 'radio' || role === 'checkbox')     ? { 'aria-checked': input && input.checked ? 'true' : 'false' }     : {}}   {...!nav ? { 'aria-disabled': disabled ? 'true' : 'false' } : {}}   data-menu-item-skip-restore-focus={skipRestoreFocus || undefined}   {tabindex}   on:click={action}   on:keydown={handleKeydown}   on:SMUIGenericInput:mount={handleInputMount}   on:SMUIGenericInput:unmount={() => (input = undefined)}   {href}   {...internalAttrs}   {...$$restProps}   >
    function create_default_slot$1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*ripple*/ ctx[7] && create_if_block(ctx);
    	const default_slot_template = /*#slots*/ ctx[34].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[37], null);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);

    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*ripple*/ ctx[7]) {
    				if (if_block) ; else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 64)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[37],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[37])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[37], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(1:0) <svelte:component   this={component}   {tag}   bind:this={element}   use={[     ...(nonInteractive       ? []       : [           [             Ripple,             {               ripple: !input,               unbounded: false,               color:                 (activated || selected) && color == null ? 'primary' : color,               disabled,               addClass,               removeClass,               addStyle,             },           ],         ]),     forwardEvents,     ...use,   ]}   class={classMap({     [className]: true,     'mdc-deprecated-list-item': !wrapper,     'mdc-deprecated-list-item__wrapper': wrapper,     'mdc-deprecated-list-item--activated': activated,     'mdc-deprecated-list-item--selected': selected,     'mdc-deprecated-list-item--disabled': disabled,     'mdc-menu-item--selected': !nav && role === 'menuitem' && selected,     'smui-menu-item--non-interactive': nonInteractive,     ...internalClasses,   })}   style={Object.entries(internalStyles)     .map(([name, value]) => `${name}: ${value};`)     .concat([style])     .join(' ')}   {...nav && activated ? { 'aria-current': 'page' } : {}}   {...!nav || wrapper ? { role } : {}}   {...!nav && role === 'option'     ? { 'aria-selected': selected ? 'true' : 'false' }     : {}}   {...!nav && (role === 'radio' || role === 'checkbox')     ? { 'aria-checked': input && input.checked ? 'true' : 'false' }     : {}}   {...!nav ? { 'aria-disabled': disabled ? 'true' : 'false' } : {}}   data-menu-item-skip-restore-focus={skipRestoreFocus || undefined}   {tabindex}   on:click={action}   on:keydown={handleKeydown}   on:SMUIGenericInput:mount={handleInputMount}   on:SMUIGenericInput:unmount={() => (input = undefined)}   {href}   {...internalAttrs}   {...$$restProps}   >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ tag: /*tag*/ ctx[14] },
    		{
    			use: [
    				.../*nonInteractive*/ ctx[6]
    				? []
    				: [
    						[
    							Ripple,
    							{
    								ripple: !/*input*/ ctx[16],
    								unbounded: false,
    								color: (/*activated*/ ctx[1] || /*selected*/ ctx[0]) && /*color*/ ctx[5] == null
    								? 'primary'
    								: /*color*/ ctx[5],
    								disabled: /*disabled*/ ctx[10],
    								addClass: /*addClass*/ ctx[24],
    								removeClass: /*removeClass*/ ctx[25],
    								addStyle: /*addStyle*/ ctx[26]
    							}
    						]
    					],
    				/*forwardEvents*/ ctx[22],
    				.../*use*/ ctx[2]
    			]
    		},
    		{
    			class: classMap({
    				[/*className*/ ctx[3]]: true,
    				'mdc-deprecated-list-item': !/*wrapper*/ ctx[8],
    				'mdc-deprecated-list-item__wrapper': /*wrapper*/ ctx[8],
    				'mdc-deprecated-list-item--activated': /*activated*/ ctx[1],
    				'mdc-deprecated-list-item--selected': /*selected*/ ctx[0],
    				'mdc-deprecated-list-item--disabled': /*disabled*/ ctx[10],
    				'mdc-menu-item--selected': !/*nav*/ ctx[23] && /*role*/ ctx[9] === 'menuitem' && /*selected*/ ctx[0],
    				'smui-menu-item--non-interactive': /*nonInteractive*/ ctx[6],
    				.../*internalClasses*/ ctx[18]
    			})
    		},
    		{
    			style: Object.entries(/*internalStyles*/ ctx[19]).map(func).concat([/*style*/ ctx[4]]).join(' ')
    		},
    		/*nav*/ ctx[23] && /*activated*/ ctx[1]
    		? { 'aria-current': 'page' }
    		: {},
    		!/*nav*/ ctx[23] || /*wrapper*/ ctx[8]
    		? { role: /*role*/ ctx[9] }
    		: {},
    		!/*nav*/ ctx[23] && /*role*/ ctx[9] === 'option'
    		? {
    				'aria-selected': /*selected*/ ctx[0] ? 'true' : 'false'
    			}
    		: {},
    		!/*nav*/ ctx[23] && (/*role*/ ctx[9] === 'radio' || /*role*/ ctx[9] === 'checkbox')
    		? {
    				'aria-checked': /*input*/ ctx[16] && /*input*/ ctx[16].checked
    				? 'true'
    				: 'false'
    			}
    		: {},
    		!/*nav*/ ctx[23]
    		? {
    				'aria-disabled': /*disabled*/ ctx[10] ? 'true' : 'false'
    			}
    		: {},
    		{
    			"data-menu-item-skip-restore-focus": /*skipRestoreFocus*/ ctx[11] || undefined
    		},
    		{ tabindex: /*tabindex*/ ctx[21] },
    		{ href: /*href*/ ctx[12] },
    		/*internalAttrs*/ ctx[20],
    		/*$$restProps*/ ctx[29]
    	];

    	var switch_value = /*component*/ ctx[13];

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot$1] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    		/*switch_instance_binding*/ ctx[35](switch_instance);
    		switch_instance.$on("click", /*action*/ ctx[15]);
    		switch_instance.$on("keydown", /*handleKeydown*/ ctx[27]);
    		switch_instance.$on("SMUIGenericInput:mount", /*handleInputMount*/ ctx[28]);
    		switch_instance.$on("SMUIGenericInput:unmount", /*SMUIGenericInput_unmount_handler*/ ctx[36]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty[0] & /*tag, nonInteractive, input, activated, selected, color, disabled, addClass, removeClass, addStyle, forwardEvents, use, className, wrapper, nav, role, internalClasses, internalStyles, style, skipRestoreFocus, tabindex, href, internalAttrs, $$restProps*/ 670916479)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty[0] & /*tag*/ 16384 && { tag: /*tag*/ ctx[14] },
    					dirty[0] & /*nonInteractive, input, activated, selected, color, disabled, addClass, removeClass, addStyle, forwardEvents, use*/ 121701479 && {
    						use: [
    							.../*nonInteractive*/ ctx[6]
    							? []
    							: [
    									[
    										Ripple,
    										{
    											ripple: !/*input*/ ctx[16],
    											unbounded: false,
    											color: (/*activated*/ ctx[1] || /*selected*/ ctx[0]) && /*color*/ ctx[5] == null
    											? 'primary'
    											: /*color*/ ctx[5],
    											disabled: /*disabled*/ ctx[10],
    											addClass: /*addClass*/ ctx[24],
    											removeClass: /*removeClass*/ ctx[25],
    											addStyle: /*addStyle*/ ctx[26]
    										}
    									]
    								],
    							/*forwardEvents*/ ctx[22],
    							.../*use*/ ctx[2]
    						]
    					},
    					dirty[0] & /*className, wrapper, activated, selected, disabled, nav, role, nonInteractive, internalClasses*/ 8652619 && {
    						class: classMap({
    							[/*className*/ ctx[3]]: true,
    							'mdc-deprecated-list-item': !/*wrapper*/ ctx[8],
    							'mdc-deprecated-list-item__wrapper': /*wrapper*/ ctx[8],
    							'mdc-deprecated-list-item--activated': /*activated*/ ctx[1],
    							'mdc-deprecated-list-item--selected': /*selected*/ ctx[0],
    							'mdc-deprecated-list-item--disabled': /*disabled*/ ctx[10],
    							'mdc-menu-item--selected': !/*nav*/ ctx[23] && /*role*/ ctx[9] === 'menuitem' && /*selected*/ ctx[0],
    							'smui-menu-item--non-interactive': /*nonInteractive*/ ctx[6],
    							.../*internalClasses*/ ctx[18]
    						})
    					},
    					dirty[0] & /*internalStyles, style*/ 524304 && {
    						style: Object.entries(/*internalStyles*/ ctx[19]).map(func).concat([/*style*/ ctx[4]]).join(' ')
    					},
    					dirty[0] & /*nav, activated*/ 8388610 && get_spread_object(/*nav*/ ctx[23] && /*activated*/ ctx[1]
    					? { 'aria-current': 'page' }
    					: {}),
    					dirty[0] & /*nav, wrapper, role*/ 8389376 && get_spread_object(!/*nav*/ ctx[23] || /*wrapper*/ ctx[8]
    					? { role: /*role*/ ctx[9] }
    					: {}),
    					dirty[0] & /*nav, role, selected*/ 8389121 && get_spread_object(!/*nav*/ ctx[23] && /*role*/ ctx[9] === 'option'
    					? {
    							'aria-selected': /*selected*/ ctx[0] ? 'true' : 'false'
    						}
    					: {}),
    					dirty[0] & /*nav, role, input*/ 8454656 && get_spread_object(!/*nav*/ ctx[23] && (/*role*/ ctx[9] === 'radio' || /*role*/ ctx[9] === 'checkbox')
    					? {
    							'aria-checked': /*input*/ ctx[16] && /*input*/ ctx[16].checked
    							? 'true'
    							: 'false'
    						}
    					: {}),
    					dirty[0] & /*nav, disabled*/ 8389632 && get_spread_object(!/*nav*/ ctx[23]
    					? {
    							'aria-disabled': /*disabled*/ ctx[10] ? 'true' : 'false'
    						}
    					: {}),
    					dirty[0] & /*skipRestoreFocus*/ 2048 && {
    						"data-menu-item-skip-restore-focus": /*skipRestoreFocus*/ ctx[11] || undefined
    					},
    					dirty[0] & /*tabindex*/ 2097152 && { tabindex: /*tabindex*/ ctx[21] },
    					dirty[0] & /*href*/ 4096 && { href: /*href*/ ctx[12] },
    					dirty[0] & /*internalAttrs*/ 1048576 && get_spread_object(/*internalAttrs*/ ctx[20]),
    					dirty[0] & /*$$restProps*/ 536870912 && get_spread_object(/*$$restProps*/ ctx[29])
    				])
    			: {};

    			if (dirty[0] & /*ripple*/ 128 | dirty[1] & /*$$scope*/ 64) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*component*/ ctx[13])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    					/*switch_instance_binding*/ ctx[35](switch_instance);
    					switch_instance.$on("click", /*action*/ ctx[15]);
    					switch_instance.$on("keydown", /*handleKeydown*/ ctx[27]);
    					switch_instance.$on("SMUIGenericInput:mount", /*handleInputMount*/ ctx[28]);
    					switch_instance.$on("SMUIGenericInput:unmount", /*SMUIGenericInput_unmount_handler*/ ctx[36]);
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
    			/*switch_instance_binding*/ ctx[35](null);
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
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
    let counter = 0;
    const func = ([name, value]) => `${name}: ${value};`;

    function instance$2($$self, $$props, $$invalidate) {
    	let tabindex;

    	const omit_props_names = [
    		"use","class","style","color","nonInteractive","ripple","wrapper","activated","role","selected","disabled","skipRestoreFocus","tabindex","inputId","href","component","tag","action","getPrimaryText","getElement"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Item', slots, ['default']);
    	var _a;
    	const forwardEvents = forwardEventsBuilder(get_current_component());

    	let uninitializedValue = () => {
    		
    	};

    	function isUninitializedValue(value) {
    		return value === uninitializedValue;
    	}

    	let { use = [] } = $$props;
    	let { class: className = '' } = $$props;
    	let { style = '' } = $$props;
    	let { color = undefined } = $$props;

    	let { nonInteractive = (_a = getContext('SMUI:list:nonInteractive')) !== null && _a !== void 0
    	? _a
    	: false } = $$props;

    	setContext('SMUI:list:nonInteractive', undefined);
    	let { ripple = !nonInteractive } = $$props;
    	let { wrapper = false } = $$props;
    	let { activated = false } = $$props;

    	let { role = wrapper
    	? 'presentation'
    	: getContext('SMUI:list:item:role') } = $$props;

    	setContext('SMUI:list:item:role', undefined);
    	let { selected = false } = $$props;
    	let { disabled = false } = $$props;
    	let { skipRestoreFocus = false } = $$props;
    	let { tabindex: tabindexProp = uninitializedValue } = $$props;
    	let { inputId = 'SMUI-form-field-list-' + counter++ } = $$props;
    	let { href = undefined } = $$props;
    	let element;
    	let internalClasses = {};
    	let internalStyles = {};
    	let internalAttrs = {};
    	let input;
    	let addTabindexIfNoItemsSelectedRaf;
    	let nav = getContext('SMUI:list:item:nav');
    	let { component = SmuiElement } = $$props;

    	let { tag = component === SmuiElement
    	? nav ? href ? 'a' : 'span' : 'li'
    	: undefined } = $$props;

    	setContext('SMUI:generic:input:props', { id: inputId });

    	// Reset separator context, because we aren't directly under a list anymore.
    	setContext('SMUI:separator:context', undefined);

    	onMount(() => {
    		// Tabindex needs to be '0' if this is the first non-disabled list item, and
    		// no other item is selected.
    		if (!selected && !nonInteractive) {
    			let first = true;
    			let el = element;

    			while (el.previousSibling) {
    				el = el.previousSibling;

    				if (el.nodeType === 1 && el.classList.contains('mdc-deprecated-list-item') && !el.classList.contains('mdc-deprecated-list-item--disabled')) {
    					first = false;
    					break;
    				}
    			}

    			if (first) {
    				// This is first, so now set up a check that no other items are
    				// selected.
    				addTabindexIfNoItemsSelectedRaf = window.requestAnimationFrame(addTabindexIfNoItemsSelected);
    			}
    		}

    		const accessor = {
    			_smui_list_item_accessor: true,
    			get element() {
    				return getElement();
    			},
    			get selected() {
    				return selected;
    			},
    			set selected(value) {
    				$$invalidate(0, selected = value);
    			},
    			hasClass,
    			addClass,
    			removeClass,
    			getAttr,
    			addAttr,
    			removeAttr,
    			getPrimaryText,
    			// For inputs within item.
    			get checked() {
    				var _a;

    				return (_a = input && input.checked) !== null && _a !== void 0
    				? _a
    				: false;
    			},
    			set checked(value) {
    				if (input) {
    					$$invalidate(16, input.checked = !!value, input);
    				}
    			},
    			get hasCheckbox() {
    				return !!(input && '_smui_checkbox_accessor' in input);
    			},
    			get hasRadio() {
    				return !!(input && '_smui_radio_accessor' in input);
    			},
    			activateRipple() {
    				if (input) {
    					input.activateRipple();
    				}
    			},
    			deactivateRipple() {
    				if (input) {
    					input.deactivateRipple();
    				}
    			},
    			// For select options.
    			getValue() {
    				return $$restProps.value;
    			},
    			// For autocomplete
    			action,
    			get tabindex() {
    				return tabindex;
    			},
    			set tabindex(value) {
    				$$invalidate(30, tabindexProp = value);
    			},
    			get disabled() {
    				return disabled;
    			},
    			get activated() {
    				return activated;
    			},
    			set activated(value) {
    				$$invalidate(1, activated = value);
    			}
    		};

    		dispatch(getElement(), 'SMUIListItem:mount', accessor);

    		return () => {
    			dispatch(getElement(), 'SMUIListItem:unmount', accessor);
    		};
    	});

    	onDestroy(() => {
    		if (addTabindexIfNoItemsSelectedRaf) {
    			window.cancelAnimationFrame(addTabindexIfNoItemsSelectedRaf);
    		}
    	});

    	function hasClass(className) {
    		return className in internalClasses
    		? internalClasses[className]
    		: getElement().classList.contains(className);
    	}

    	function addClass(className) {
    		if (!internalClasses[className]) {
    			$$invalidate(18, internalClasses[className] = true, internalClasses);
    		}
    	}

    	function removeClass(className) {
    		if (!(className in internalClasses) || internalClasses[className]) {
    			$$invalidate(18, internalClasses[className] = false, internalClasses);
    		}
    	}

    	function addStyle(name, value) {
    		if (internalStyles[name] != value) {
    			if (value === '' || value == null) {
    				delete internalStyles[name];
    				$$invalidate(19, internalStyles);
    			} else {
    				$$invalidate(19, internalStyles[name] = value, internalStyles);
    			}
    		}
    	}

    	function getAttr(name) {
    		var _a;

    		return name in internalAttrs
    		? (_a = internalAttrs[name]) !== null && _a !== void 0
    			? _a
    			: null
    		: getElement().getAttribute(name);
    	}

    	function addAttr(name, value) {
    		if (internalAttrs[name] !== value) {
    			$$invalidate(20, internalAttrs[name] = value, internalAttrs);
    		}
    	}

    	function removeAttr(name) {
    		if (!(name in internalAttrs) || internalAttrs[name] != null) {
    			$$invalidate(20, internalAttrs[name] = undefined, internalAttrs);
    		}
    	}

    	function addTabindexIfNoItemsSelected() {
    		// Look through next siblings to see if none of them are selected.
    		let noneSelected = true;

    		let el = element.getElement();

    		while (el.nextElementSibling) {
    			el = el.nextElementSibling;

    			if (el.nodeType === 1 && el.classList.contains('mdc-deprecated-list-item')) {
    				const tabindexAttr = el.attributes.getNamedItem('tabindex');

    				if (tabindexAttr && tabindexAttr.value === '0') {
    					noneSelected = false;
    					break;
    				}
    			}
    		}

    		if (noneSelected) {
    			// This is the first element, and no other element is selected, so the
    			// tabindex should be '0'.
    			$$invalidate(21, tabindex = 0);
    		}
    	}

    	function handleKeydown(e) {
    		const isEnter = e.key === 'Enter';
    		const isSpace = e.key === 'Space';

    		if (isEnter || isSpace) {
    			action(e);
    		}
    	}

    	function handleInputMount(e) {
    		if ('_smui_checkbox_accessor' in e.detail || '_smui_radio_accessor' in e.detail) {
    			$$invalidate(16, input = e.detail);
    		}
    	}

    	function action(e) {
    		if (!disabled) {
    			dispatch(getElement(), 'SMUI:action', e);
    		}
    	}

    	function getPrimaryText() {
    		var _a, _b, _c;
    		const element = getElement();
    		const primaryText = element.querySelector('.mdc-deprecated-list-item__primary-text');

    		if (primaryText) {
    			return (_a = primaryText.textContent) !== null && _a !== void 0
    			? _a
    			: '';
    		}

    		const text = element.querySelector('.mdc-deprecated-list-item__text');

    		if (text) {
    			return (_b = text.textContent) !== null && _b !== void 0
    			? _b
    			: '';
    		}

    		return (_c = element.textContent) !== null && _c !== void 0
    		? _c
    		: '';
    	}

    	function getElement() {
    		return element.getElement();
    	}

    	function switch_instance_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(17, element);
    		});
    	}

    	const SMUIGenericInput_unmount_handler = () => $$invalidate(16, input = undefined);

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(29, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(2, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
    		if ('style' in $$new_props) $$invalidate(4, style = $$new_props.style);
    		if ('color' in $$new_props) $$invalidate(5, color = $$new_props.color);
    		if ('nonInteractive' in $$new_props) $$invalidate(6, nonInteractive = $$new_props.nonInteractive);
    		if ('ripple' in $$new_props) $$invalidate(7, ripple = $$new_props.ripple);
    		if ('wrapper' in $$new_props) $$invalidate(8, wrapper = $$new_props.wrapper);
    		if ('activated' in $$new_props) $$invalidate(1, activated = $$new_props.activated);
    		if ('role' in $$new_props) $$invalidate(9, role = $$new_props.role);
    		if ('selected' in $$new_props) $$invalidate(0, selected = $$new_props.selected);
    		if ('disabled' in $$new_props) $$invalidate(10, disabled = $$new_props.disabled);
    		if ('skipRestoreFocus' in $$new_props) $$invalidate(11, skipRestoreFocus = $$new_props.skipRestoreFocus);
    		if ('tabindex' in $$new_props) $$invalidate(30, tabindexProp = $$new_props.tabindex);
    		if ('inputId' in $$new_props) $$invalidate(31, inputId = $$new_props.inputId);
    		if ('href' in $$new_props) $$invalidate(12, href = $$new_props.href);
    		if ('component' in $$new_props) $$invalidate(13, component = $$new_props.component);
    		if ('tag' in $$new_props) $$invalidate(14, tag = $$new_props.tag);
    		if ('$$scope' in $$new_props) $$invalidate(37, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		counter,
    		_a,
    		onMount,
    		onDestroy,
    		getContext,
    		setContext,
    		get_current_component,
    		forwardEventsBuilder,
    		classMap,
    		dispatch,
    		Ripple,
    		SmuiElement,
    		forwardEvents,
    		uninitializedValue,
    		isUninitializedValue,
    		use,
    		className,
    		style,
    		color,
    		nonInteractive,
    		ripple,
    		wrapper,
    		activated,
    		role,
    		selected,
    		disabled,
    		skipRestoreFocus,
    		tabindexProp,
    		inputId,
    		href,
    		element,
    		internalClasses,
    		internalStyles,
    		internalAttrs,
    		input,
    		addTabindexIfNoItemsSelectedRaf,
    		nav,
    		component,
    		tag,
    		hasClass,
    		addClass,
    		removeClass,
    		addStyle,
    		getAttr,
    		addAttr,
    		removeAttr,
    		addTabindexIfNoItemsSelected,
    		handleKeydown,
    		handleInputMount,
    		action,
    		getPrimaryText,
    		getElement,
    		tabindex
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('_a' in $$props) _a = $$new_props._a;
    		if ('uninitializedValue' in $$props) uninitializedValue = $$new_props.uninitializedValue;
    		if ('use' in $$props) $$invalidate(2, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(3, className = $$new_props.className);
    		if ('style' in $$props) $$invalidate(4, style = $$new_props.style);
    		if ('color' in $$props) $$invalidate(5, color = $$new_props.color);
    		if ('nonInteractive' in $$props) $$invalidate(6, nonInteractive = $$new_props.nonInteractive);
    		if ('ripple' in $$props) $$invalidate(7, ripple = $$new_props.ripple);
    		if ('wrapper' in $$props) $$invalidate(8, wrapper = $$new_props.wrapper);
    		if ('activated' in $$props) $$invalidate(1, activated = $$new_props.activated);
    		if ('role' in $$props) $$invalidate(9, role = $$new_props.role);
    		if ('selected' in $$props) $$invalidate(0, selected = $$new_props.selected);
    		if ('disabled' in $$props) $$invalidate(10, disabled = $$new_props.disabled);
    		if ('skipRestoreFocus' in $$props) $$invalidate(11, skipRestoreFocus = $$new_props.skipRestoreFocus);
    		if ('tabindexProp' in $$props) $$invalidate(30, tabindexProp = $$new_props.tabindexProp);
    		if ('inputId' in $$props) $$invalidate(31, inputId = $$new_props.inputId);
    		if ('href' in $$props) $$invalidate(12, href = $$new_props.href);
    		if ('element' in $$props) $$invalidate(17, element = $$new_props.element);
    		if ('internalClasses' in $$props) $$invalidate(18, internalClasses = $$new_props.internalClasses);
    		if ('internalStyles' in $$props) $$invalidate(19, internalStyles = $$new_props.internalStyles);
    		if ('internalAttrs' in $$props) $$invalidate(20, internalAttrs = $$new_props.internalAttrs);
    		if ('input' in $$props) $$invalidate(16, input = $$new_props.input);
    		if ('addTabindexIfNoItemsSelectedRaf' in $$props) addTabindexIfNoItemsSelectedRaf = $$new_props.addTabindexIfNoItemsSelectedRaf;
    		if ('nav' in $$props) $$invalidate(23, nav = $$new_props.nav);
    		if ('component' in $$props) $$invalidate(13, component = $$new_props.component);
    		if ('tag' in $$props) $$invalidate(14, tag = $$new_props.tag);
    		if ('tabindex' in $$props) $$invalidate(21, tabindex = $$new_props.tabindex);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*tabindexProp, nonInteractive, disabled, selected, input*/ 1073808449) {
    			$$invalidate(21, tabindex = isUninitializedValue(tabindexProp)
    			? !nonInteractive && !disabled && (selected || input && input.checked)
    				? 0
    				: -1
    			: tabindexProp);
    		}
    	};

    	return [
    		selected,
    		activated,
    		use,
    		className,
    		style,
    		color,
    		nonInteractive,
    		ripple,
    		wrapper,
    		role,
    		disabled,
    		skipRestoreFocus,
    		href,
    		component,
    		tag,
    		action,
    		input,
    		element,
    		internalClasses,
    		internalStyles,
    		internalAttrs,
    		tabindex,
    		forwardEvents,
    		nav,
    		addClass,
    		removeClass,
    		addStyle,
    		handleKeydown,
    		handleInputMount,
    		$$restProps,
    		tabindexProp,
    		inputId,
    		getPrimaryText,
    		getElement,
    		slots,
    		switch_instance_binding,
    		SMUIGenericInput_unmount_handler,
    		$$scope
    	];
    }

    class Item extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$2,
    			create_fragment$2,
    			safe_not_equal,
    			{
    				use: 2,
    				class: 3,
    				style: 4,
    				color: 5,
    				nonInteractive: 6,
    				ripple: 7,
    				wrapper: 8,
    				activated: 1,
    				role: 9,
    				selected: 0,
    				disabled: 10,
    				skipRestoreFocus: 11,
    				tabindex: 30,
    				inputId: 31,
    				href: 12,
    				component: 13,
    				tag: 14,
    				action: 15,
    				getPrimaryText: 32,
    				getElement: 33
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Item",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get use() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get nonInteractive() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nonInteractive(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ripple() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ripple(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get wrapper() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set wrapper(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activated() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activated(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get role() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set role(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selected() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selected(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get skipRestoreFocus() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set skipRestoreFocus(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tabindex() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tabindex(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inputId() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inputId(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tag() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tag(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get action() {
    		return this.$$.ctx[15];
    	}

    	set action(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getPrimaryText() {
    		return this.$$.ctx[32];
    	}

    	set getPrimaryText(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getElement() {
    		return this.$$.ctx[33];
    	}

    	set getElement(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Text = classAdderBuilder({
        class: 'mdc-deprecated-list-item__text',
        tag: 'span',
    });

    classAdderBuilder({
        class: 'mdc-deprecated-list-item__primary-text',
        tag: 'span',
    });

    classAdderBuilder({
        class: 'mdc-deprecated-list-item__secondary-text',
        tag: 'span',
    });

    classAdderBuilder({
        class: 'mdc-deprecated-list-item__meta',
        tag: 'span',
    });

    classAdderBuilder({
        class: 'mdc-deprecated-list-group',
        tag: 'div',
    });

    classAdderBuilder({
        class: 'mdc-deprecated-list-group__subheader',
        tag: 'h3',
    });

    /* src\Resources.svelte generated by Svelte v3.55.1 */

    const { console: console_1 } = globals;
    const file$1 = "src\\Resources.svelte";

    // (40:10) <Item            >
    function create_default_slot_7(ctx) {
    	let h2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = `${/*resource_items*/ ctx[1][0]}`;
    			attr_dev(h2, "class", "svelte-1t6a007");
    			add_location(h2, file$1, 41, 11, 1263);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(40:10) <Item            >",
    		ctx
    	});

    	return block;
    }

    // (44:9) <Item >
    function create_default_slot_6(ctx) {
    	let h2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = `${/*resource_items*/ ctx[1][1]}`;
    			attr_dev(h2, "class", "svelte-1t6a007");
    			add_location(h2, file$1, 44, 10, 1358);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(44:9) <Item >",
    		ctx
    	});

    	return block;
    }

    // (47:12) <Item            >
    function create_default_slot_5(ctx) {
    	let h2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = `${/*resource_items*/ ctx[1][2]}`;
    			attr_dev(h2, "class", "svelte-1t6a007");
    			add_location(h2, file$1, 49, 14, 1486);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(47:12) <Item            >",
    		ctx
    	});

    	return block;
    }

    // (52:12) <Item            >
    function create_default_slot_4(ctx) {
    	let h2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = `${/*resource_items*/ ctx[1][3]}`;
    			attr_dev(h2, "class", "svelte-1t6a007");
    			add_location(h2, file$1, 54, 14, 1618);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(52:12) <Item            >",
    		ctx
    	});

    	return block;
    }

    // (39:8) <List>
    function create_default_slot_3(ctx) {
    	let item0;
    	let t0;
    	let item1;
    	let t1;
    	let item2;
    	let t2;
    	let item3;
    	let current;

    	item0 = new Item({
    			props: {
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	item1 = new Item({
    			props: {
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	item2 = new Item({
    			props: {
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	item3 = new Item({
    			props: {
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(item0.$$.fragment);
    			t0 = space();
    			create_component(item1.$$.fragment);
    			t1 = space();
    			create_component(item2.$$.fragment);
    			t2 = space();
    			create_component(item3.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(item0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(item1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(item2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(item3, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const item0_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				item0_changes.$$scope = { dirty, ctx };
    			}

    			item0.$set(item0_changes);
    			const item1_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				item1_changes.$$scope = { dirty, ctx };
    			}

    			item1.$set(item1_changes);
    			const item2_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				item2_changes.$$scope = { dirty, ctx };
    			}

    			item2.$set(item2_changes);
    			const item3_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				item3_changes.$$scope = { dirty, ctx };
    			}

    			item3.$set(item3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(item0.$$.fragment, local);
    			transition_in(item1.$$.fragment, local);
    			transition_in(item2.$$.fragment, local);
    			transition_in(item3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(item0.$$.fragment, local);
    			transition_out(item1.$$.fragment, local);
    			transition_out(item2.$$.fragment, local);
    			transition_out(item3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(item0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(item1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(item2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(item3, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(39:8) <List>",
    		ctx
    	});

    	return block;
    }

    // (38:6) <Content>
    function create_default_slot_2(ctx) {
    	let list;
    	let current;

    	list = new List({
    			props: {
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(list.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(list, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const list_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				list_changes.$$scope = { dirty, ctx };
    			}

    			list.$set(list_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(list.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(list.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(list, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(38:6) <Content>",
    		ctx
    	});

    	return block;
    }

    // (37:4) <Drawer>
    function create_default_slot_1(ctx) {
    	let content;
    	let current;

    	content = new Content({
    			props: {
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(content.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(content, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const content_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				content_changes.$$scope = { dirty, ctx };
    			}

    			content.$set(content_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(content.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(content.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(content, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(37:4) <Drawer>",
    		ctx
    	});

    	return block;
    }

    // (61:4) <AppContent class="app-content">
    function create_default_slot(ctx) {
    	let main;
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			main = element("main");
    			div = element("div");
    			t = text(/*items*/ ctx[0]);
    			attr_dev(div, "class", "svelte-1t6a007");
    			add_location(div, file$1, 66, 6, 1926);
    			attr_dev(main, "class", "main-content svelte-1t6a007");
    			add_location(main, file$1, 61, 6, 1767);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*items*/ 1) set_data_dev(t, /*items*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(61:4) <AppContent class=\\\"app-content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div;
    	let drawer;
    	let t;
    	let appcontent;
    	let current;

    	drawer = new Drawer({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	appcontent = new AppContent({
    			props: {
    				class: "app-content",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(drawer.$$.fragment);
    			t = space();
    			create_component(appcontent.$$.fragment);
    			attr_dev(div, "class", "drawer-container svelte-1t6a007");
    			add_location(div, file$1, 35, 0, 1124);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(drawer, div, null);
    			append_dev(div, t);
    			mount_component(appcontent, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const drawer_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				drawer_changes.$$scope = { dirty, ctx };
    			}

    			drawer.$set(drawer_changes);
    			const appcontent_changes = {};

    			if (dirty & /*$$scope, items*/ 129) {
    				appcontent_changes.$$scope = { dirty, ctx };
    			}

    			appcontent.$set(appcontent_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(drawer.$$.fragment, local);
    			transition_in(appcontent.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(drawer.$$.fragment, local);
    			transition_out(appcontent.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(drawer);
    			destroy_component(appcontent);
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

    function instance$1($$self, $$props, $$invalidate) {
    	let items;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Resources', slots, []);
    	let resource_items = ["Websites", "Literature", "Downloads", "Media"];
    	let selected = 0;
    	let resources_index = 0;
    	let name = "";
    	let link = "";

    	function displayItems(rindex) {
    		//this function should use map function to display name properties of each object in the array with that name having an <a> and link to the linkk property of the object
    		let items = resources[rindex].map(resource => {
    			return `<h3><a href="${resource.link}">${resource.name}</a><h3>`;
    		});

    		let selected = rindex;
    		items = items.join("\n");
    		return [selected, items];
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Resources> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Drawer,
    		AppContent,
    		Content,
    		List,
    		Item,
    		Text,
    		resources,
    		resource_items,
    		selected,
    		resources_index,
    		name,
    		link,
    		displayItems,
    		items
    	});

    	$$self.$inject_state = $$props => {
    		if ('resource_items' in $$props) $$invalidate(1, resource_items = $$props.resource_items);
    		if ('selected' in $$props) $$invalidate(2, selected = $$props.selected);
    		if ('resources_index' in $$props) $$invalidate(5, resources_index = $$props.resources_index);
    		if ('name' in $$props) name = $$props.name;
    		if ('link' in $$props) link = $$props.link;
    		if ('items' in $$props) $$invalidate(0, items = $$props.items);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*selected*/ 4) {
    			name = resources[selected][resources_index].name;
    		}

    		if ($$self.$$.dirty & /*selected*/ 4) {
    			link = resources[selected][resources_index].link;
    		}

    		if ($$self.$$.dirty & /*items*/ 1) {
    			// }
    			console.log(items);
    		}

    		if ($$self.$$.dirty & /*selected*/ 4) {
    			console.log(selected);
    		}
    	};

    	$$invalidate(2, [selected, items] = displayItems(0), selected, $$invalidate(0, items));
    	return [items, resource_items, selected];
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
    	let mounted;
    	let dispose;

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
    			if (!src_url_equal(img0.src, img0_src_value = "https://gist.github.com/altwitt/79ee75e012b7ce486221de3affa319ec#file-white-svg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "white-globe");
    			attr_dev(img0, "class", "svelte-1lf5ubu");
    			add_location(img0, file, 17, 3, 307);
    			attr_dev(a0, "href", "https://www.gisci.org/Exam-Info");
    			attr_dev(a0, "class", "svelte-1lf5ubu");
    			add_location(a0, file, 16, 2, 261);
    			attr_dev(div0, "class", "corner svelte-1lf5ubu");
    			add_location(div0, file, 15, 1, 238);
    			attr_dev(a1, "href", "/");
    			attr_dev(a1, "class", "svelte-1lf5ubu");
    			add_location(a1, file, 21, 2, 443);
    			attr_dev(a2, "href", "/flashcards");
    			attr_dev(a2, "class", "svelte-1lf5ubu");
    			add_location(a2, file, 22, 2, 476);
    			attr_dev(a3, "href", "/resources");
    			attr_dev(a3, "class", "svelte-1lf5ubu");
    			add_location(a3, file, 23, 2, 524);
    			attr_dev(nav, "class", "svelte-1lf5ubu");
    			add_location(nav, file, 20, 1, 435);
    			if (!src_url_equal(img1.src, img1_src_value = "https://gist.github.com/altwitt/79ee75e012b7ce486221de3affa319ec#file-white-svg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "white-globe");
    			attr_dev(img1, "class", "svelte-1lf5ubu");
    			add_location(img1, file, 29, 3, 638);
    			attr_dev(a4, "href", "https://www.gisci.org");
    			attr_dev(a4, "class", "svelte-1lf5ubu");
    			add_location(a4, file, 28, 2, 602);
    			attr_dev(div1, "class", "corner svelte-1lf5ubu");
    			add_location(div1, file, 27, 1, 579);
    			attr_dev(header, "class", "svelte-1lf5ubu");
    			add_location(header, file, 14, 0, 228);
    			add_location(h10, file, 34, 0, 776);
    			add_location(p, file, 35, 0, 823);
    			add_location(h11, file, 36, 0, 915);
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

    			if (!mounted) {
    				dispose = [
    					action_destroyer(link.call(null, a1)),
    					action_destroyer(link.call(null, a2)),
    					action_destroyer(link.call(null, a3))
    				];

    				mounted = true;
    			}
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
    			mounted = false;
    			run_all(dispose);
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
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
