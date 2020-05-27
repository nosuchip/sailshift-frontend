import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import _get from "lodash.get";

import DefaultLayout from "@/layouts/default.vue";
import AccountLayout from "@/layouts/account.vue";

import Home from "@/pages/home.vue";

import Login from "@/pages/account/login.vue";
import Register from "@/pages/account/register.vue";
import ForgotPassword from "@/pages/account/forgot-password.vue";
import ResetPassword from "@/pages/account/reset-password.vue";

import PreviewDocument from "@/pages/document/preview-document.vue";
import SearchDocument from "@/pages/document/search-document.vue";
import Purchases from "@/pages/document/purchases.vue";

import AdminListUsers from "@/pages/admin/list-users.vue";
import AdminListDocuments from "@/pages/admin/list-documents.vue";

import PageNotFound from "@/pages/page-not-found.vue";

import Contact from "@/pages/contact.vue";
import PrivacyPolicy from "@/pages/privacy-policy.vue";

import { store } from "./store";

Vue.use(VueRouter);

export const routes = {
  home: "home",
  contact: "contact",
  privacyPolicy: "privacy_policy",

  account: {
    login: "account.login",
    register: "account.register",
    forgotPassword: "account.forgot_password",
    resetPassword: "account.reset_password"
  },

  documents: {
    search: "document.search",
    document: "document.document",
    purchases: "document.purchases"
  },

  admin: {
    listUsers: "admin.list_users",
    listDocuments: "admin.list_documents"
  }
};

export const routesDefinition: RouteConfig[] = [
  {
    path: "/",
    redirect: "/home",
    component: DefaultLayout,
    props: true,
    children: [
      {
        path: "home",
        name: routes.home,
        component: Home,
        meta: { title: "Sailshift :: Home" }
      }
    ]
  },

  {
    path: "/contact",
    name: routes.contact,
    component: Contact,
    meta: { title: "Sailshift :: Contact us" }
  },

  {
    path: "/privacy_policy",
    name: routes.privacyPolicy,
    component: PrivacyPolicy,
    meta: { title: "Sailshift :: Privacy Policy" }
  },

  {
    path: "/account",
    component: AccountLayout,
    children: [
      {
        path: "login",
        name: routes.account.login,
        component: Login,
        meta: { title: "Sailshift :: Login" }
      },
      {
        path: "register",
        name: routes.account.register,
        component: Register,
        meta: { title: "Sailshift :: Register" }
      },
      {
        path: "forgot_password",
        name: routes.account.forgotPassword,
        component: ForgotPassword,
        meta: { title: "Sailshift :: Forgot password" }
      },
      {
        path: "reset_password/:token",
        name: routes.account.resetPassword,
        component: ResetPassword,
        props: true,
        meta: { title: "Sailshift :: Reset password" }
      }
    ]
  },

  {
    path: "/document",
    redirect: "/home",
    component: DefaultLayout,
    children: [
      {
        path: "search",
        name: routes.documents.search,
        component: SearchDocument,
        props: true,
        meta: { title: "Sailshift :: Search" }
      },
      {
        path: "purchases",
        name: routes.documents.purchases,
        component: Purchases,
        props: true,
        meta: { title: "Sailshift :: My purchases" }
      },
      {
        path: ":documentId",
        name: routes.documents.document,
        component: PreviewDocument,
        props: true,
        meta: { title: "Sailshift :: Document Preview" }
      }
    ]
  },

  {
    path: "/admin",
    component: DefaultLayout,
    children: [
      {
        path: "list_users",
        name: routes.admin.listUsers,
        component: AdminListUsers,
        props: true,
        meta: { title: "Sailshift :: Users" }
      },
      {
        path: "list_documents",
        name: routes.admin.listDocuments,
        component: AdminListDocuments,
        props: true,
        meta: { title: "Sailshift :: Documents" }
      }
    ]
  },

  { path: "*", component: PageNotFound }
];

export const routesAcl = {
  userRoutes: [
    routes.documents.purchases
  ],

  adminOnlyRoutes: [
    routes.admin.listUsers,
    routes.admin.listDocuments
  ]
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routesDefinition
});

router.beforeEach((to, from, next) => {
  if (routesAcl.adminOnlyRoutes.includes(to.name as string)) {
    if (!store.getters.isLoggedOn || !store.getters.isAdmin) {
      return next({ name: routes.account.login });
    }
  } else if (routesAcl.userRoutes.includes(to.name as string)) {
    if (!store.getters.isLoggedOn && to.name !== routes.account.login) {
      return next({ name: routes.account.login });
    }
  }

  document.title = to.meta.title;
  next();
});

export default router;
