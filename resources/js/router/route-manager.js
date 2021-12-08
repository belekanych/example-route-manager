class Route {
    _path = '';
    _name = '';
    _component = '';
    _children = [];

    constructor(path, component) {
        this.path(path);
        this._component = component;
    }

    path(path) {
        this._path = path[0] === '/' ? path.substring(1) : path;
    }

    name(name) {
        this._name = name;

        return this;
    }

    children(children) {
        this._children = children;

        return this;
    }

    generate(options = {}) {
        if (!Array.isArray(options.path)) {
            options.path = [''];
        }
        options.path.push(this._path);


        if (!Array.isArray(options.name)) {
            options.name = [];
        }
        options.name.push(this._name);

        return {
            path: options.path.join('/'),
            name: options.name.join('.'),
            component: this._component,
            children: this._children.map(route => route.generate(options)),
        };
    }
}

class RouteManager {
    _routes = [];

    constructor(routes) {
        this.pushRoutes(routes);
    }

    pushRoutes(routes) {
        this._routes.push(...routes);
    }

    generate() {
        return this._routes.map(route => route.generate());
    }
}

export const createRouteManager = (routes) => {
    return new RouteManager(routes);
};

export const createRoute = (path, component) => {
    return new Route(path, component);
};
