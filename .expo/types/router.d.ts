/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/comparar` | `/comparar`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/juegos` | `/juegos`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/wishlist` | `/wishlist`; params?: Router.UnknownInputParams; } | { pathname: `/juego/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/comparar` | `/comparar`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/juegos` | `/juegos`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/wishlist` | `/wishlist`; params?: Router.UnknownOutputParams; } | { pathname: `/juego/[id]`, params: Router.UnknownOutputParams & { id: string; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/comparar${`?${string}` | `#${string}` | ''}` | `/comparar${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/juegos${`?${string}` | `#${string}` | ''}` | `/juegos${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/wishlist${`?${string}` | `#${string}` | ''}` | `/wishlist${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/comparar` | `/comparar`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/juegos` | `/juegos`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/wishlist` | `/wishlist`; params?: Router.UnknownInputParams; } | `/juego/${Router.SingleRoutePart<T>}${`?${string}` | `#${string}` | ''}` | { pathname: `/juego/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
    }
  }
}
