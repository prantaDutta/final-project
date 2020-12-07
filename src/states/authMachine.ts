import axios from "axios";
import { assign, createMachine, interpret } from "xstate";
import { baseURL } from "../utils/constants";

export interface toggleAuth {
  isAuthenticated: boolean;
  token: string | undefined;
}

const fetchToken = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/redis?key=${process.env.AUTH_TOKEN_NAME!}`
      );
      console.log(response);
      resolve(response.data.data);
    } catch (e) {
      console.log("Error Fetching Token: ", e);
      reject();
    }
  });
};

const deleteTokenFromCache = async () => {
  try {
    const response = await axios.delete(
      `${baseURL}/api/redis?key=${process.env.AUTH_TOKEN_NAME!}`
    );
    return response;
  } catch (e) {
    console.log("Error Deleting Token: ", e);
    return e;
  }
};

export const authMachine = createMachine<toggleAuth>({
  id: "auth",
  initial: "loading",
  context: {
    isAuthenticated: false,
    token: undefined,
  },
  states: {
    loading: {
      invoke: {
        id: "fetchToken",
        src: fetchToken,
        onDone: {
          target: "authenticated",
          actions: assign({
            isAuthenticated: (_context, _event) => true,
            token: (_context, event) => event.data,
          }),
        },
        onError: {
          target: "unauthenticated",
          actions: assign({
            isAuthenticated: (_context, _event) => false,
            token: (_context, event) => event.data,
          }),
        },
      },
    },
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
  .onTransition(async (state) => {
    console.log("Current State: ", state.value);
    if (state.value === "unauthenticated") {
      await deleteTokenFromCache();
    }
  })
  .start();
