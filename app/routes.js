// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};
export const memoizeComponent = (loadComponent) => {
  let savedComponent;
  return (nextState, cb) => {
    const renderRoute = loadModule(cb);
    if (savedComponent) {
      renderRoute(savedComponent);
    } else {
      loadComponent((loadedComponent) => {
        savedComponent = loadedComponent;
        renderRoute(savedComponent);
      });
    }
  };
};
export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars
  const appHomeRoute = location.pathname;
  return {
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        import('containers/App/sagas'),
        import('containers/App'),
      ]);

      const renderRoute = loadModule(cb);

      importModules.then(([sagas, component]) => {
        injectSagas(sagas.default);
        renderRoute(component);
      });

      importModules.catch(errorLoading);
    },
    childRoutes: [{
      path: appHomeRoute,
      name: 'home',
      getComponent: memoizeComponent((renderRoute) => {
        // const importModules = Promise.all([
        //   import('containers/HomePage'),
        // ]);
        const importModules = Promise.all([
          import('containers/EditQuotePage/reducer'),
          import('containers/EditQuotePage/sagas'),
          import('containers/EditQuotePage'),
        ]);

        // const renderRoute = loadModule(cb);

        // importModules.then(([component]) => {
        //   renderRoute(component);
        // });

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('editQuote', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      }),
    }, {
      path: '/ProductSelection',
      name: 'productSelectionPage',
      getComponent: memoizeComponent((renderRoute) => {
        const importModules = Promise.all([
          import('containers/ProductSelectionPage/reducer'),
          import('containers/ProductSelectionPage/sagas'),
          import('containers/ProductSelectionPage'),
        ]);

        // const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('productSelectionPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      }),
    }, {
      path: '/EditQuote',
      name: 'editQuote',
      getComponent: memoizeComponent((renderRoute) => {
        const importModules = Promise.all([
          import('containers/EditQuotePage/reducer'),
          import('containers/EditQuotePage/sagas'),
          import('containers/EditQuotePage'),
        ]);

       // const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('editQuote', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      }),
    }, {
      path: '/PriceBook',
      name: 'priceBook',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/PriceBook/reducer'),
          import('containers/PriceBook/sagas'),
          import('containers/PriceBook'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('priceBook', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/favourites',
      name: 'favouriteLookup',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/FavouriteLookup/reducer'),
          import('containers/FavouriteLookup/sagas'),
          import('containers/FavouriteLookup'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('favouriteLookup', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/reconfigureproducts',
      name: 'reConfigureProducts',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ReConfigureProducts/reducer'),
          import('containers/ReConfigureProducts/sagas'),
          import('containers/ReConfigureProducts'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('reConfigureProducts', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/addConfigureProducts',
      name: 'addConfigureProducts',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/AddConfigureProducts/reducer'),
          import('containers/AddConfigureProducts/sagas'),
          import('containers/AddConfigureProducts'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('addConfigureProducts', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
      .then(loadModule(cb))
      .catch(errorLoading);
      },
    },
    ],
  };
}
