import type { ActivityProps } from "./components/Activity";

export const mockActivity: ActivityProps[] = [
  {
    heading: "Social profile connected to DIDPay",
    body: "July 1, 2023",
    images: [
      {
        iconName: "hash",
        badgeName: "feed-person",
      },
      {
        iconName: "credit-card",
        badgeName: "webhook",
      },
    ],
  },
  {
    heading: "Anonymous profile created",
    body: "June 25, 2023",
    images: [
      {
        source: { uri: "https://reactnative.dev/img/tiny_logo.png" },
        badgeName: "feed-person",
      },
    ],
  },
  {
    heading: "Professional profile disconnected from Dignal",
    body: "June 20, 2023",
    images: [
      {
        iconName: "briefcase",
        badgeName: "feed-person",
      },
    ],
  },
];
