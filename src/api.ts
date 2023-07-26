import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { formatDate } from "./lib/utils";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000/api/v1/"
      : "https://airbnbclone-ghyj.onrender.com/api/v1",
  withCredentials: true,
});

export const getRooms = () =>
  instance.get("rooms/").then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, roomPk] = queryKey;
  return instance.get(`rooms/${roomPk}`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, roomPk] = queryKey;
  return instance
    .get(`rooms/${roomPk}/reviews`)
    .then((response) => response.data);
};

export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

export const logOut = () =>
  instance
    .post(`users/log-out`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const githubLogIn = (code: string) =>
  instance
    .post(
      `users/github`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      },
    )
    .then((response) => response.status);

export const kakaoLogIn = (code: string) =>
  instance
    .post(
      `users/kakao`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      },
    )
    .then((response) => response.status);

export interface IUserDefaultLoginVariables {
  username: string;
  password: string;
}

export interface IUserDefaultLoginSuccess {
  ok: string;
}

export interface IUserDefaultLoginError {
  error: string;
}

export const userDefualtLogin = ({
  username,
  password,
}: IUserDefaultLoginVariables) =>
  instance
    .post(
      `users/log-in`,
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      },
    )
    .then((response) => response.data);

export interface IUserDefaultSignUpVariables {
  name: string;
  email: string;
  username: string;
  password: string;
}

export type signUpErrMsgType = {
  [key: string]: string[];
};
export interface IUserDefaultSignUpError {
  response: {
    data: signUpErrMsgType;
    status: number;
    statusText: string;
  };
}

export const userDefaultSignUp = ({
  name,
  email,
  username,
  password,
}: IUserDefaultSignUpVariables) =>
  instance
    .post(
      `users/sign-up`,
      { name, email, username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      },
    )
    .then((response) => response.data);

export const getAmenities = () =>
  instance.get(`rooms/amenities`).then((response) => response.data);

export const getCategories = () =>
  instance.get(`categories`).then((response) => response.data);

export interface IUploadRoomVariables {
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
  amenities: number[];
  category: number;
}

export const uploadRoom = (variables: IUploadRoomVariables) =>
  instance
    .post(`rooms/`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export interface IUpdateRoomVariables {
  roomPk: string;
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
  amenities: number[];
  category: number;
}

export const updateRoom = (variables: IUpdateRoomVariables) =>
  instance
    .put(`rooms/${variables.roomPk}`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const getUploadImgUrl = () =>
  instance
    .post(`medias/photos/get-url`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export interface IUploadImageVariables {
  file: FileList;
  uploadURL: string;
}

export const uploadImage = ({ file, uploadURL }: IUploadImageVariables) => {
  const form = new FormData();
  form.append("file", file[0]);
  return axios
    .post(uploadURL, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

export interface IRegistPhotoVariables {
  description: string;
  file: string;
  roomPk: string;
}

export const registPhoto = ({
  description,
  file,
  roomPk,
}: IRegistPhotoVariables) =>
  instance
    .post(
      `rooms/${roomPk}/photos`,
      { description, file },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      },
    )
    .then((response) => response.data);

type CheckBookingQueryKey = [string, string?, Date[]?];

export const checkBooking = ({
  queryKey,
}: QueryFunctionContext<CheckBookingQueryKey>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, roomPk, dates] = queryKey;
  if (dates) {
    const [firstDate, secondDate] = dates;
    const checkIn = formatDate(firstDate);
    const checkOut = formatDate(secondDate);
    return instance
      .get(
        `rooms/${roomPk}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`,
      )
      .then((response) => response.data);
  }
};

export interface IRoomBookingVariables {
  check_in: string;
  check_out: string;
  roomPk: string;
  guests: number;
}

export interface IRoomBookingSuccess {
  check_in: string;
  check_out: string;
}

export type roomBookingErrMsgType = {
  [key: string]: string[];
};

export interface IRoomBookingError {
  response: {
    data: roomBookingErrMsgType;
    status: number;
    statusText: string;
  };
}

export const roomBooking = (variables: IRoomBookingVariables) =>
  instance
    .post(`rooms/${variables.roomPk}/bookings`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const getUserBookings = () =>
  instance.get("users/bookings").then((response) => response.data);

export const getRoomBookings = ({ queryKey }: QueryFunctionContext) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, roomPk] = queryKey;
  return instance
    .get(`rooms/${roomPk}/bookings`)
    .then((response) => response.data);
};
