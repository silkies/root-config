import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

registerApplication(
  '@local/react-sample',
  () => System.import('@local/react-sample'),
  location => location.pathname.startsWith('/react')
);
registerApplication(
  '@local/vue-navigation',
  () => System.import('@local/vue-navigation'),
  location => location.pathname.startsWith('/')
);
registerApplication(
  'angular-sample',
  () => System.import('angular-sample'),
  location => location.pathname.startsWith('/angular')
);

const routes = constructRoutes(
  document.querySelector("#single-spa-layout")
);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

//applications.forEach(registerApplication);
layoutEngine.activate();

start();
