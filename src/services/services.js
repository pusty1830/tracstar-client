import { client } from "./axiosClient";

export function signUp(payLoad) {
  return client.post("/auth/signup", payLoad);
}

export function Signin(payLoad) {
  return client.post("/auth/signin", payLoad);
}

export function Ai(payLoad) {
  return client.post("/ai/generate-resume", payLoad);
}

export function createOrder(payLoad) {
  return client.post("/pay/orders", payLoad);
}

export function verifyPayment(payLoad) {
  return client.post("/pay/verify", payLoad);
}

export function createPayment(payLoad) {
  return client.post("/Payment/create", payLoad);
}

export function updatePayment(id, payLoad) {
  return client.patch(`/Payment/update-record/${id}`, payLoad);
}

export function getAllPayments(payLoad) {
  return client.post(`/Payment/search-record`, payLoad);
}

export function createResume(payLoad) {
  return client.post("/Resume/create", payLoad);
}

export function getAllResumes(payLoad) {
  return client.post(`/Resume/search-record`, payLoad);
}

export function getResumeById(id) {
  return client.get(`/Resume/get-one-record/${id}`);
}

export function createContact(payload) {
  return client.post("/Contact/create", payload);
}
