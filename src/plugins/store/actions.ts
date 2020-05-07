import { ActionParam } from "@/typing/state";
import { Notification } from "@/typing/notification";
import * as api from "@/plugins/api";

import { mutations } from "./mutations";
import { LoginPayload, ForgotPasswordPayload, RegisterPayload, ResetPayload } from "@/typing/state/actions";
import { User } from "@/typing/user";
import { userMapper } from "@/utils/mappers";

export const actions = {
  NOTIFICATION: "notification",
  CONTACT: "contact",

  LOGIN: "login",
  FORGOT_PASSWORD: "forgot_password",
  REGISTER: "register",
  RESET_PASSWORD: "reset_password"
};

export default {
  [actions.NOTIFICATION]: ({ commit }: ActionParam, notification: Notification | null) => {
    commit(mutations.NOTIFICATION, notification);

    setTimeout(() => {
      commit(mutations.NOTIFICATION, {
        message: null,
        type: null
      });
    }, 3000);
  },

  [actions.CONTACT]: async ({ commit }: ActionParam, {
    email,
    subject,
    message
  }: {
    email: string;
    subject: string;
    message: string;
  }) => {
    try {
      await api.contactUs(email, subject, message);
      commit(mutations.NOTIFICATION, { message: "Thank you for your message", type: "success" });
    } catch (error) {
      commit(mutations.NOTIFICATION, { message: "Unable to send message", type: "error" });
    }
  },

  [actions.LOGIN]: async ({ commit, dispatch }: ActionParam, { email, password }: LoginPayload) => {
    try {
      const { data } = await api.login(email, password);

      const { user, token }: { user?: User; token?: string } = data;

      if (!user || !token) {
        throw new Error("User or token missing");
      }

      api.setToken(token);
      commit(mutations.LOGIN, { user, token });
    } catch (error) {
      dispatch(actions.NOTIFICATION, {
        message: "Incorrect username or password",
        type: "error"
      });
    }
  },

  [actions.FORGOT_PASSWORD]: async ({ dispatch }: ActionParam, { email }: ForgotPasswordPayload) => {
    try {
      await api.forgotPassword(email);

      dispatch(actions.NOTIFICATION, {
        message: "Email with password restore link sent to your email",
        type: "success"
      });
    } catch (error) {
      dispatch(actions.NOTIFICATION, {
        message: "Unable to send reset password instructions to desired email.",
        type: "error"
      });
    }
  },

  [actions.REGISTER]: async ({ dispatch }: ActionParam, {
    email,
    password,
    confirmation
  }: RegisterPayload) => {
    try {
      await api.register(email, password, confirmation);

      dispatch(actions.NOTIFICATION, {
        message: "Your account created successfully. Please check your email for confirmation letter.",
        type: "success"
      });
    } catch (error) {
      dispatch(actions.NOTIFICATION, {
        message: "Unable to create account with such email or password.",
        type: "error"
      });
    }
  },

  async [actions.RESET_PASSWORD] ({ dispatch }: ActionParam, {
    token,
    password,
    confirmation
  }: ResetPayload) {
    try {
      await api.resetPassword(token, password, confirmation);

      dispatch(actions.NOTIFICATION, {
        message: "New password was set. Please login now",
        type: "success"
      }
      );
    } catch (error) {
      dispatch(actions.NOTIFICATION, {
        message: "Unable to set new password.",
        type: "error"
      });
    }
  }

};
