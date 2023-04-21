import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const Home = () => import("views/myHome");
const Cart = () => import("views/Cart");
const Category = () => import("views/Category");
const Profile = () => import("views/Profile");
const router = new VueRouter({
  routes: [
    {
      path: "",
      redirect: "/home",
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/cart",
      component: Cart,
    },
    {
      path: "/category",
      component: Category,
    },
    {
      path: "/profile",
      component: Profile,
    },
  ],
  mode: "history",
});
export default router;
