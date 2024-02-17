import { rest } from "msw";

const baseURL =
  "https://8080-rkillickdev-rewind-op9jkkw7q8n.ws-eu108.gitpod.io/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 1,
        username: "admin",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 1,
        profile_image:
          "https://res.cloudinary.com/rkillickdev/image/upload/v1/media/../default_profile_oeycka",
        genre_preference: 2,
        era_preference: 4,
        category_preference: 2,
      }),
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
