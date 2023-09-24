import groq from 'groq';

export const LINK_INTERNAL = groq`
  _key,
  _type,
  title,
  ...reference-> {
    "documentType": _type,
    (_type == "home") => {
      "slug": "/",
    },
    (_type == "accountPage") => {
      "slug": "/account",
    },
    (_type == "becomeAMember") => {
      "slug": "/become-a-member",
    },
    (_type == "signup") => {
      "slug": "/signup",
    },
    (_type == "signin") => {
      "slug": "/signin",
    },
    (_type == "page") => {
      "slug": "/page/" + slug.current,
    },
  }
`;
