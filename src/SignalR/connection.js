import * as signalR from "@microsoft/signalr";

const API_URL = process.env.REACT_APP_API_URL;

const apiUrl = API_URL.endsWith("/") ? API_URL.slice(0, -1) : API_URL;

export const buildConnection = async (idBarbearia) => {
  return new signalR.HubConnectionBuilder()
    .withUrl(`${apiUrl}/hub/barbearia?idBarbearia=${idBarbearia}`)
    .withAutomaticReconnect()
    .build();
};