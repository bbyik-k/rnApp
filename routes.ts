export const RouteNames = {
  HOME_TAB: 'home-tab',
  HOME: 'home',
  SHOPPING: 'shopping',
  BROWSER: 'browser',
};

export type RootStackParamList = {
  [RouteNames.HOME_TAB]: undefined;
  [RouteNames.BROWSER]: { initialUrl: string };
};
