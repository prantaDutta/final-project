import Axios from "axios";
import { createMachine, interpret } from "xstate";

export interface toggleAuth {
  isAuthenticated: boolean;
  token: string | undefined;
}

// console.log(getCachedData());

export const authMachine = createMachine<toggleAuth>({
  id: "auth",
  initial: "unauthenticated",
  context: {
    isAuthenticated: false,
    token: undefined,
  },
  states: {
    authenticated: {
      on: {
        toggle: {
          target: "unauthenticated",
          actions: (ctx) => {
            ctx.isAuthenticated = false;
            ctx.token = undefined;
          },
        },
      },
    },
    unauthenticated: {
      on: {
        toggle: {
          target: "authenticated",
          actions: (ctx, e) => {
            ctx.isAuthenticated = true;
            ctx.token = e.value;
          },
        },
      },
    },
  },
});

export const authService = interpret(authMachine)
  .onTransition((state) => {
    if (state.value === "authenticated") {
      try {
        Axios.post("/api/getRedisData", { key: "authState" }).then((res) => {
          let data = res.data;
          console.log("get:", data);
        });
      } catch (e) {
        console.log(e);
      }
    }
  })
  .start();
