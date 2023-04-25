import { atob, btoa } from "react-native-quick-base64";

global.atob = atob;
global.btoa = btoa;
